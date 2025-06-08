package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"back_end/services"
)

type StatisticResponse struct {
	CourtID        int     `json:"court_id"`
	MonthYear      string  `json:"month_year"`
	UsagePercent   float64 `json:"usage_percent"`
	ActualHours    int     `json:"actual_hours"`
	MaxPossibleHours int   `json:"max_possible_hours"`
}

func GetCourtUsageStatisticHandler(w http.ResponseWriter, r *http.Request) {
	courtIDStr := r.URL.Query().Get("court_id")
	monthYear := r.URL.Query().Get("month_year")

	courtID, err := strconv.Atoi(courtIDStr)
	if err != nil || courtID < 1 || courtID > 4 {
		http.Error(w, "Invalid court_id", http.StatusBadRequest)
		return
	}

	usage, actual, max, err := services.GetCourtUsageStatistic(courtID, monthYear)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to compute statistic: %v", err), http.StatusInternalServerError)
		return
	}

	resp := StatisticResponse{
		CourtID:          courtID,
		MonthYear:        monthYear,
		UsagePercent:     usage,
		ActualHours:      actual,
		MaxPossibleHours: max,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

type RevenueResponse struct {
	CourtID     int    `json:"court_id"`
	MonthYear   string `json:"month_year"`
	TotalAmount int64  `json:"total_amount"`
}

func GetCourtRevenueStatisticHandler(w http.ResponseWriter, r *http.Request) {
	courtIDStr := r.URL.Query().Get("court_id")
	monthYear := r.URL.Query().Get("month_year")

	courtID, err := strconv.Atoi(courtIDStr)
	if err != nil || courtID < 1 || courtID > 4 {
		http.Error(w, "Invalid court_id", http.StatusBadRequest)
		return
	}

	totalAmount, err := services.GetCourtRevenueStatistic(courtID, monthYear)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to compute revenue: %v", err), http.StatusInternalServerError)
		return
	}

	resp := RevenueResponse{
		CourtID:     courtID,
		MonthYear:   monthYear,
		TotalAmount: totalAmount,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}


