package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Pickup struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	CourtBookingID primitive.ObjectID `bson:"court_booking_id,omitempty" json:"court_booking_id,omitempty"`
	MaximumPickup int                `bson:"maximum_pickup,omitempty" json:"maximum_pickup,omitempty"`
	ParticipantIDs []primitive.ObjectID `bson:"participant_ids,omitempty" json:"participant_ids,omitempty"`
	Message string `bson:"message,omitempty" json:"message,omitempty"`
	PickupLevel string `bson:"pickup_level,omitempty" json:"pickup_level,omitempty"`
}