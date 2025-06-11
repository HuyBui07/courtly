package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type CourtBookingDetail struct {
	CourtID int `json:"court_id" bson:"court_id"`
	StartTime string `json:"start_time" bson:"start_time"`
	EndTime string `json:"end_time" bson:"end_time"`
}

type BookingOrderDetail struct {
	Courts []CourtBookingDetail `json:"courts" bson:"courts"`
	AdditionalServices []AdditionalService `json:"additional_services" bson:"additional_services"`
	TotalPrice int `json:"total_price" bson:"total_price"`
}

type UnpaidBooking struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id"`
	OrderCode   int64              `json:"order_code" bson:"order_code"`
	BookingOrder BookingOrderDetail `json:"booking_order" bson:"booking_order"`
}