package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Name      string             `json:"name"`
	Type      string             `json:"user_type"` // Admin - Client
	Email     *string            `json:"email"`
	Password  *string            `json:"pass"`
	Create_at time.Time          `json:"create_at"`
	Update_at time.Time          `json:"update_at"`
	User_id   string             `json:"user_id"`
	FCMToken  string             `json:"fcmToken"`
}
