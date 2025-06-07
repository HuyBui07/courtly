package controllers

import (
	"back_end/models"
	"back_end/services"
	"encoding/json"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PickupRequest struct {
	CourtBookingID string `json:"court_booking_id"`
	MaximumPickup int `json:"maximum_pickup"`
	Message string `json:"message"`
	PickupLevel string `json:"pickup_level"`
}

func CreatePickupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	token := r.Header.Get("Authorization")
	// Lấy user từ token header
	if token == "" {
		http.Error(w, "Missing Authorization token", http.StatusUnauthorized)
		return
	}
	user, err := services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var pickupRequest PickupRequest
	err = json.NewDecoder(r.Body).Decode(&pickupRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	userID := user.ID.Hex()

	CourtBookingObjID, err := primitive.ObjectIDFromHex(pickupRequest.CourtBookingID)
	if err != nil {
		http.Error(w, "Invalid court booking ID", http.StatusBadRequest)
		return
	}

	pickup := models.Pickup{
		CourtBookingID: CourtBookingObjID,
		MaximumPickup: pickupRequest.MaximumPickup,
		Message: pickupRequest.Message,
		PickupLevel: pickupRequest.PickupLevel,
		ParticipantIDs: []primitive.ObjectID{},
	}

	err = services.CreatePickup(&pickup, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Pickup created successfully"))
}

func GetAllPickupsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

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

	pickups, err := services.GetAllPickups(user.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(pickups)
}

func JoinPickupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	
	pickupID := r.URL.Query().Get("pickup_id")
	if pickupID == "" {
		http.Error(w, "pickup_id is required", http.StatusBadRequest)
		return
	}

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

	err = services.HandleJoinPickup(pickupID, user.ID.Hex())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Joined pickup successfully"))
}	

func GetPickupDetailsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
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
	
	bookingID := r.URL.Query().Get("booking_id")
	if bookingID == "" {
		http.Error(w, "booking_id is required", http.StatusBadRequest)
		return
	}

	booking, err := services.GetBookingDetailsByBookingID(bookingID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(booking)
}