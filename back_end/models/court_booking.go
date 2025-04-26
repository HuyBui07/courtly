package models

import (
	"time"
)

type CourtBooking struct {
	CourtID   string    `json:"court_id" bson:"court_id"`
	UserID    string    `json:"user_id" bson:"user_id"`
	StartTime time.Time `json:"start_time" bson:"start_time"`
	EndTime   time.Time `json:"end_time" bson:"end_time"`
	CreatedAt time.Time `json:"created_at" bson:"created_at"`
}
