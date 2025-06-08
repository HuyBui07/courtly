package controllers

import (
	"back_end/services"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type FeeRequest struct {
	StartTime string `json:"start_time"` // ISO8601 format
	EndTime   string `json:"end_time"`
}

type FeeResponse struct {
	Total int64 `json:"total_fee"`
}

type FeeUpdateRequest struct {
	HotFee    int64 `json:"hot_fee"`
	NormalFee int64 `json:"normal_fee"`
}

func CalculateCourtFeeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var req FeeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

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

	total, err := services.CalculateCourtFee(startTime, endTime)
	if err != nil {
		http.Error(w, fmt.Sprintf("Calculation failed: %v", err), http.StatusInternalServerError)
		return
	}

	response := FeeResponse{Total: total}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func UpdateCourtFeeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	token := r.Header.Get("Authorization")
	var req FeeUpdateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	err := services.UpdateCourtFee(token, req.HotFee, req.NormalFee)
	if err != nil {
		http.Error(w, fmt.Sprintf("Update failed: %v", err), http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Court fee updated successfully"}`))
}
