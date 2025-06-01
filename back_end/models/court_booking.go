package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AdditionalService struct {
	ServiceID string `json:"service_id" bson:"service_id"`
	Quantity  int    `json:"quantity" bson:"quantity"`
}

type CourtBooking struct {
	CourtID           int32              `json:"court_id" bson:"court_id"`
	UserID           string             `json:"user_id" bson:"user_id"`
	StartTime        time.Time          `json:"start_time" bson:"start_time"`
	EndTime          time.Time          `json:"end_time" bson:"end_time"`
	State            string             `json:"state" bson:"state"`
	CreatedAt        time.Time          `json:"created_at" bson:"created_at"`
	AdditionalServices []AdditionalService `json:"additional_services" bson:"additional_services"`
}

type CourtBookingResponse struct {
	ID                primitive.ObjectID `json:"_id" bson:"_id"`
	CourtID           int32              `json:"court_id" bson:"court_id"`
	StartTime         time.Time          `json:"start_time" bson:"start_time"`
	EndTime           time.Time          `json:"end_time" bson:"end_time"`
	State             string             `json:"state" bson:"state"`
	CreatedAt         time.Time          `json:"created_at" bson:"created_at"`
	AdditionalServices []AdditionalService `json:"additional_services" bson:"additional_services"`
}

type UserBookingInfo struct {
    CourtName  string    `json:"court_name"`
    Location   string    `json:"location"`
    StartTime  time.Time `json:"start_time"`
    EndTime    time.Time `json:"end_time"`
}

