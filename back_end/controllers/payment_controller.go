package controllers

import (
	"back_end/config"
	"back_end/models"
	"back_end/services"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/payOSHQ/payos-lib-golang"
	"go.mongodb.org/mongo-driver/bson"
)

type PayOSRequest struct {
	OrderCode   string `json:"orderCode"`
	Amount      int    `json:"amount"`
	Description string `json:"description"`
	ReturnURL   string `json:"returnUrl"`
	CancelURL   string `json:"cancelUrl"`
	Signature   string `json:"signature"`
}

type PayOSResponse struct {
	CheckoutURL string `json:"checkoutUrl"`
}

func CreatePaymentHandler(w http.ResponseWriter, r *http.Request) {
	domain := "http://localhost:8080/"

	bookingOrder := r.URL.Query().Get("bookingOrder")
	fmt.Println(bookingOrder)

	type BookingOrder struct {
		Courts []struct {
			CourtID   int    `json:"court_id"`
			StartTime string `json:"start_time"`
			EndTime   string `json:"end_time"`
		} `json:"courts"`
		AdditionalServices []struct {
			ServiceID string `json:"service_id"`
			Quantity  int    `json:"quantity"`
		} `json:"additional_services"`
		TotalPrice int `json:"total_price"`
	}

	var order BookingOrder
	err := json.Unmarshal([]byte(bookingOrder), &order)
	if err != nil {
		log.Printf("Failed to parse booking order: %v", err)
		http.Error(w, "Invalid booking order", http.StatusBadRequest)
		return
	}

	// Initialize items slice with capacity for all courts and services
	items := make([]payos.Item, 0, len(order.Courts)+len(order.AdditionalServices))

	// Add court bookings to items
	for _, court := range order.Courts {
		startTime, _ := time.Parse(time.RFC3339, court.StartTime)
		endTime, _ := time.Parse(time.RFC3339, court.EndTime)

		items = append(items, payos.Item{
			Name: fmt.Sprintf("Court %d (%s - %s)",
				court.CourtID,
				startTime.Format("15:04"),
				endTime.Format("15:04")),
			Quantity: int(endTime.Sub(startTime).Hours()),
			Price:    80000, // Price per hour
		})
	}

	// Add additional services to items
	servicesPrices := map[string]int{
		"water":       10000,
		"soda":        15000,
		"shuttlecock": 50000,
		"towel":       20000,
	}
	servicesNames := map[string]string{
		"water":       "Water Bottle",
		"soda":        "Soda",
		"shuttlecock": "Shuttlecock",
		"towel":       "Towel",
	}

	for _, service := range order.AdditionalServices {
		if price, exists := servicesPrices[service.ServiceID]; exists {
			items = append(items, payos.Item{
				Name:     servicesNames[service.ServiceID],
				Quantity: service.Quantity,
				Price:    price,
			})
		}
	}
	paymentLinkRequest := payos.CheckoutRequestType{
		OrderCode:   time.Now().UnixNano() / int64(time.Millisecond),
		Amount:      order.TotalPrice,
		Description: "Thanh toan don hang",
		Items:       items,
		CancelUrl:   domain + "cancel",
		ReturnUrl:   domain + "success",
	}

	paymentLinkResponse, err := payos.CreatePaymentLink(paymentLinkRequest)

	unpaidBooking := models.UnpaidBooking{
		OrderCode: paymentLinkResponse.OrderCode,
		BookingOrder: models.BookingOrderDetail{
			Courts: func() []models.CourtBookingDetail {
				var courts []models.CourtBookingDetail
				for _, court := range order.Courts {
					courts = append(courts, models.CourtBookingDetail{
						CourtID:   court.CourtID,
						StartTime: court.StartTime,
						EndTime:   court.EndTime,
					})
				}
				return courts
			}(),
			AdditionalServices: func() []models.AdditionalService {
				var additionalServices []models.AdditionalService
				for _, service := range order.AdditionalServices {
					additionalServices = append(additionalServices, models.AdditionalService{
						ServiceID: service.ServiceID,
						Quantity:  service.Quantity,
					})
				}
				return additionalServices
			}(),
			TotalPrice: order.TotalPrice,
		},
	}

	err = services.PostUnpaidBooking(unpaidBooking)
	if err != nil {
		log.Printf("Failed to insert unpaid booking: %v", err)
	}

	if err != nil {
		log.Printf("Create payment link failed: %v", err)
	}

	http.Redirect(w, r, paymentLinkResponse.CheckoutUrl, http.StatusSeeOther)
}

func SuccessPaymentHandler(w http.ResponseWriter, r *http.Request) {
	orderCodeStr := r.URL.Query().Get("orderCode")
	orderCode, err := strconv.ParseInt(orderCodeStr, 10, 64)
	if err != nil {
		log.Printf("Failed to parse order code: %v", err)
		http.Error(w, "Invalid order code", http.StatusBadRequest)
		return
	}
	paymentStatus := r.URL.Query().Get("paymentStatus")
	fmt.Println("paymentStatus", paymentStatus)
	// Get the unpaid booking from database
	collection := config.GetCollection("UnpaidBookings")
	var unpaidBooking models.UnpaidBooking
	err = collection.FindOne(context.TODO(), bson.M{"order_code": orderCode}).Decode(&unpaidBooking)
	if err != nil {
		log.Printf("Failed to get unpaid booking: %v", err)
		http.Error(w, "Failed to get booking details", http.StatusInternalServerError)
		return
	}

	// Lấy user từ token header
	token := r.Header.Get("Authorization")
	if token == "" {
		http.Error(w, "Missing Authorization token", http.StatusUnauthorized)
		return
	}
	user, err := services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var orders []services.BookingOrder
	for _, court := range unpaidBooking.BookingOrder.Courts {
		startTime, _ := time.Parse(time.RFC3339, court.StartTime)
		endTime, _ := time.Parse(time.RFC3339, court.EndTime)
		orders = append(orders, services.BookingOrder{
			CourtID:     int32(court.CourtID),
			UserID:      user.ID.Hex(),
			StartTime:   startTime,
			EndTime:     endTime,
			AllowPickup: false,
		})

		orders[0].AdditionalServices = unpaidBooking.BookingOrder.AdditionalServices
	}

	if paymentStatus == "PAID" {
		services.CreateCourtBooking(orders)
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
	}
}

func TournamentPaymentHandler(w http.ResponseWriter, r *http.Request) {
	domain := "http://localhost:8080/"

	tournamentID := r.URL.Query().Get("tournament_id")
	fmt.Println(tournamentID)

	collection := config.GetCollection("Tournaments")
	var tournament models.Tournament
	err := collection.FindOne(context.TODO(), bson.M{"tour_id": tournamentID}).Decode(&tournament)
	if err != nil {
		log.Printf("Failed to get tournament: %v", err)
		http.Error(w, "Failed to get tournament", http.StatusInternalServerError)
		return
	}

	paymentLinkRequest := payos.CheckoutRequestType{
		OrderCode:   time.Now().UnixNano() / int64(time.Millisecond),
		Amount:      int(tournament.Price),
		Description: "Thanh toan don hang",
		Items: []payos.Item{
			{
				Name:     "Tournament",
				Quantity: 1,
				Price:    int(tournament.Price),
			},
		},
		CancelUrl: domain + "tournament-cancel",
		ReturnUrl: domain + "tournament-success",
	}

	paymentLinkResponse, err := payos.CreatePaymentLink(paymentLinkRequest)
	if err != nil {
		log.Printf("Failed to create payment link: %v", err)
		http.Error(w, "Failed to create payment link", http.StatusInternalServerError)
		return
	}

	if err != nil {
		log.Printf("Create payment link failed: %v", err)
	}

	http.Redirect(w, r, paymentLinkResponse.CheckoutUrl, http.StatusSeeOther)
}

func TournamentSuccessPaymentHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Tournament success payment")
	tournamentID := r.URL.Query().Get("tournament_id")
	paymentStatus := r.URL.Query().Get("paymentStatus")
	fmt.Println("paymentStatus", paymentStatus)

	// Lấy user từ token header
	token := r.Header.Get("Authorization")
	if token == "" {
		http.Error(w, "Missing Authorization token", http.StatusUnauthorized)
		return
	}
	user, err := services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	if paymentStatus == "PAID" {
		services.RegisterToTournament(tournamentID, user.User_id, *user.Email)
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
	}
}

func CancelPaymentHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Cancel payment")
}
