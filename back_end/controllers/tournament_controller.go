package controllers

import (
	"back_end/services"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type CreateTournamentRequest struct {
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Poster      string   `json:"poster"`
	Type        string   `json:"type"`     // "single" or "doubles"
	Deadline    string   `json:"deadline"` // e.g. "2025-07-01"
	Period      []string `json:"period"`   // e.g. ["2025-07-10", "2025-07-15"]
	Scale       int      `json:"scale"`
}

func CreateTournamentHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Name        string   `json:"name"`
		Description string   `json:"description"`
		Poster      string   `json:"poster"`
		Type        string   `json:"type"` // single or doubles
		Deadline    string   `json:"deadline"` // "2025-07-01"
		Period      []string `json:"period"`   // ["2025-07-10", "2025-07-15"]
		Scale       int      `json:"scale"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Parse deadline
	deadline, err := time.Parse("2006-01-02", req.Deadline)
	if err != nil {
		http.Error(w, "Invalid deadline format (expected YYYY-MM-DD)", http.StatusBadRequest)
		return
	}

	// Parse period
	if len(req.Period) != 2 {
		http.Error(w, "Period must contain exactly 2 dates", http.StatusBadRequest)
		return
	}
	start, err1 := time.Parse("2006-01-02", req.Period[0])
	end, err2 := time.Parse("2006-01-02", req.Period[1])
	if err1 != nil || err2 != nil {
		http.Error(w, "Invalid period date format", http.StatusBadRequest)
		return
	}
	period := []time.Time{start, end}

	// Auth
	token := r.Header.Get("Authorization")
	user, err := services.GetUserDataByToken(token)
	if err != nil || user.Type != "Admin" {
		http.Error(w, "Unauthorized - Admins only", http.StatusUnauthorized)
		return
	}

	err = services.CreateTournament(req.Name, req.Description, req.Poster, req.Type, deadline, period, req.Scale)
	if err != nil {
		http.Error(w, "Failed to create tournament: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Tournament created successfully"))
}

type RegisterTournamentRequest struct {
	TourID    string `json:"tour_id"`
	Athlete1  string `json:"athlete_1"`
	Athlete2  string `json:"athlete_2,omitempty"` // optional for singles
}

func RegisterTournamentHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RegisterTournamentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Xác thực token
	token := r.Header.Get("Authorization")
	user, err := services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	if user.Type != "Client" {
		http.Error(w, "Only clients can register for tournaments", http.StatusForbidden)
		return
	}

	// Thực hiện đăng ký
	err = services.RegisterToTournament(user.ID.Hex(), req.TourID, req.Athlete1, req.Athlete2)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Registration successful"))
}

func GetAthletesByTournamentHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Lấy token và kiểm tra quyền
	token := r.Header.Get("Authorization")
	user, err := services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	if user.Type != "Admin" {
		http.Error(w, "Forbidden: Admins only", http.StatusForbidden)
		return
	}

	// Lấy tournament_id từ query
	tourID := r.URL.Query().Get("tour_id")
	if tourID == "" {
		http.Error(w, "Missing tournament ID", http.StatusBadRequest)
		return
	}

	// Lấy danh sách vận động viên
	athletes, err := services.GetAthletesByTournamentID(tourID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(athletes)
}

func CancelTournamentRegistrationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Lấy tour_id từ URL query parameter
	tourID := r.URL.Query().Get("tour_id")
	if tourID == "" {
		http.Error(w, "Missing tour_id parameter", http.StatusBadRequest)
		return
	}

	// Lấy thông tin user từ token
	token := r.Header.Get("Authorization")
	user, err := services.GetUserDataByToken(token)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Gọi service
	err = services.CancelTournamentRegistration(tourID, user.User_id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Successfully canceled tournament registration"))
}


