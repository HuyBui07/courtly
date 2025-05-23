package controllers

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"back_end/config"
	"back_end/models"
	"back_end/services"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BookingRequest struct {
	CourtID   int32  `json:"court_id"`
	StartTime string `json:"start_time"` // ISO8601 format: "2025-04-27T10:00:00Z"
	EndTime   string `json:"end_time"`
}

func BookCourtHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var requests []BookingRequest
	if err := json.NewDecoder(r.Body).Decode(&requests); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
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
	for _, req := range requests {
		startTime, err := time.Parse(time.RFC3339, req.StartTime)
		if err != nil {
			http.Error(w, "Invalid start time format", http.StatusBadRequest)
			return
		}
		endTime, err := time.Parse(time.RFC3339, req.EndTime)
		if err != nil {
			http.Error(w, "Invalid end time format", http.StatusBadRequest)
			return
		}

		orders = append(orders, services.BookingOrder{
			CourtID:   req.CourtID,
			UserID:    user.ID.Hex(),
			StartTime: startTime,
			EndTime:   endTime,
		})
	}

	err = services.CreateCourtBooking(orders)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Courts booked successfully"))
}

func GetUserBookingsHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received request: %s %s", r.Method, r.URL.Path)
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
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

	upcomingBookings, pastBookings, err := services.GetUserBookings(user.ID.Hex())
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to fetch bookings: %v", err), http.StatusInternalServerError)
		return
	}

	if upcomingBookings == nil {
		upcomingBookings = []models.CourtBooking{}
	}
	if pastBookings == nil {
		pastBookings = []models.CourtBooking{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"upcoming_bookings": upcomingBookings,
		"past_bookings":     pastBookings,
	})
}

func GetBookingsForCourtOnSpecificDateHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Lấy các query parameter: court_id và date
	courtIDStr := r.URL.Query().Get("court_id")
	dateStr := r.URL.Query().Get("date")

	if dateStr == "" {
		http.Error(w, "date is required", http.StatusBadRequest)
		return
	}

	// Parse date string về time.Time
	parsedDate, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		http.Error(w, "Invalid date format, expected YYYY-MM-DD", http.StatusBadRequest)
		return
	}

	// Lấy user từ token header
	token := r.Header.Get("Authorization")
	if token == "" {
		http.Error(w, "Missing Authorization token", http.StatusUnauthorized)
		return
	}

	// Lấy user từ token
	_, err = services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Gọi service để lấy bookings
	bookings, err := services.GetBookingsForCourtOnSpecificDate(courtIDStr, parsedDate)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to fetch bookings: %v", err), http.StatusInternalServerError)
		return
	}

	if bookings == nil {
		bookings = []models.CourtBooking{}
	}

	// Trả về danh sách booking dưới dạng JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(bookings); err != nil {
		http.Error(w, fmt.Sprintf("Failed to encode response: %v", err), http.StatusInternalServerError)
	}
}

func GetAllBookingsOnASpecificDateHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	dateStr := r.URL.Query().Get("date")
	if dateStr == "" {
		http.Error(w, "date is required", http.StatusBadRequest)
		return
	}
	parsedDate, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		http.Error(w, "Invalid date format, expected YYYY-MM-DD", http.StatusBadRequest)
		return
	}

	bookings, err := services.GetAllBookingsOnASpecificDate(parsedDate)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to fetch bookings: %v", err), http.StatusInternalServerError)
		return
	}

	if bookings == nil {
		bookings = []models.CourtBooking{}
	}

	// Create response objects with additional fields
	type BookingResponse struct {
		models.CourtBooking
		Status         string `json:"status"`
		StartTimeIndex int    `json:"start_time_index"`
		EndTimeIndex   int    `json:"end_time_index"`
	}

	// Map bookings to response objects
	response := make([]BookingResponse, len(bookings))
	for i := range bookings {
		// Convert start and end times to indexes (8:00 = index 0, 9:00 = index 1, etc)
		startHour := bookings[i].StartTime.Hour()
		endHour := bookings[i].EndTime.Hour()
		startIndex := startHour - 8 // 8:00 maps to index 0
		endIndex := endHour - 8
		response[i] = BookingResponse{
			CourtBooking:   bookings[i],
			Status:         "confirmed",
			StartTimeIndex: startIndex,
			EndTimeIndex:   endIndex,
		}
	}

	// Replace bookings with response for encoding
	bookings = nil // Clear original slice

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func GetUserBookingsByMonthHandler(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	month := r.URL.Query().Get("month") // expected format: yyyy-mm

	bookings, err := services.GetUserBookingsByMonth(token, month)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusBadRequest)
		return
	}

	if bookings == nil {
		bookings = []models.CourtBooking{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(bookings)
}

func DeleteBookingByID(userID string, role string, bookingID string) error {
	collection := config.GetCollection("CourtBookings")

	bookingObjID, err := primitive.ObjectIDFromHex(bookingID)
	if err != nil {
		return errors.New("invalid booking ID format")
	}

	// Tạo filter
	filter := bson.M{"_id": bookingObjID}
	if role == "Client" {
		filter["user_id"] = userID // userID là dạng string, KHÔNG chuyển sang ObjectID
	}

	// Log để debug
	fmt.Println("Delete filter:", filter)

	// Thực hiện xóa
	result, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		return errors.New("failed to delete booking")
	}
	if result.DeletedCount == 0 {
		return errors.New("booking not found or permission denied")
	}

	return nil
}

func DeleteBookingHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	bookingID := r.URL.Query().Get("booking_id")
	if bookingID == "" {
		http.Error(w, "booking_id is required", http.StatusBadRequest)
		return
	}

	token := r.Header.Get("Authorization")
	if token == "" {
		http.Error(w, "Missing token", http.StatusUnauthorized)
		return
	}

	user, err := services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	err = services.DeleteBookingByID(user.User_id, user.Type, bookingID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to delete booking: %v", err), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Booking deleted successfully"})
}

func DeleteAllBookingsInMonthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	token := r.Header.Get("Authorization")
	if token == "" {
		http.Error(w, "Missing Authorization token", http.StatusUnauthorized)
		return
	}

	_, err := services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	yearStr := r.URL.Query().Get("year")
	monthStr := r.URL.Query().Get("month")
	if yearStr == "" || monthStr == "" {
		http.Error(w, "Missing year or month parameter", http.StatusBadRequest)
		return
	}

	year, err := strconv.Atoi(yearStr)
	if err != nil {
		http.Error(w, "Invalid year", http.StatusBadRequest)
		return
	}
	month, err := strconv.Atoi(monthStr)
	if err != nil {
		http.Error(w, "Invalid month", http.StatusBadRequest)
		return
	}

	err = services.DeleteAllBookingsInMonth(year, month)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("All bookings deleted successfully for the specified month"))
}

func DeleteBookingsOfCourtInMonthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	token := r.Header.Get("Authorization")
	if token == "" {
		http.Error(w, "Missing Authorization token", http.StatusUnauthorized)
		return
	}

	_, err := services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	courtID := r.URL.Query().Get("court_id")
	yearStr := r.URL.Query().Get("year")
	monthStr := r.URL.Query().Get("month")
	if courtID == "" || yearStr == "" || monthStr == "" {
		http.Error(w, "Missing parameters", http.StatusBadRequest)
		return
	}

	year, err := strconv.Atoi(yearStr)
	if err != nil {
		http.Error(w, "Invalid year", http.StatusBadRequest)
		return
	}
	month, err := strconv.Atoi(monthStr)
	if err != nil {
		http.Error(w, "Invalid month", http.StatusBadRequest)
		return
	}

	err = services.DeleteBookingsOfCourtInMonth(courtID, year, month)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Bookings for the specified court and month deleted successfully"))
}
