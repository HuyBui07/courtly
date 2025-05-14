package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Court struct {
    ID        primitive.ObjectID `bson:"_id,omitempty"`
    CourtID   int32              `json:"court_id" bson:"court_id"`
    Name      string             `json:"name" bson:"name"`
    Location  string             `json:"location" bson:"location"`
    CreatedAt time.Time          `json:"created_at" bson:"created_at"`
    UpdatedAt time.Time          `json:"updated_at" bson:"updated_at"`
}
