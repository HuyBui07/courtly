package controllers

import (
	"encoding/json"
	"net/http"

	"back_end/models"
	"back_end/services"
)

type CreateCourtRequest struct {
	Name     string `json:"name"`
	Location string `json:"location"`
}

type CreateCourtResponse struct {
	Message  string `json:"message"`
}

func CreateCourtHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var req CreateCourtRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	
	// Tạo struct court để gửi vào service
	court := &models.Court{
		Name:     req.Name,
		Location: req.Location,
	}
	// Lấy user từ token header
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
	
	err = services.CreateCourt(court)
	if err != nil {
		http.Error(w, "Failed to create court", http.StatusInternalServerError)
		return
	}

	// Trả về court_id sau khi tạo thành công
	response := CreateCourtResponse{
		Message: "Court created successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
