package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)
type TournamentAthlete struct {
	UserID    string `bson:"user_id" json:"user_id"`
	Athlete1  string `bson:"athlete_1" json:"athlete_1"`
	Athlete2  string `bson:"athlete_2,omitempty" json:"athlete_2,omitempty"` // optional for singles
}
type Tournament struct {
	ID          primitive.ObjectID   `bson:"_id,omitempty" json:"_id"`
	TourID      string               `bson:"tour_id" json:"tour_id"`
	Name        string               `bson:"name" json:"name"`
	Description string               `bson:"description" json:"description"`
	Poster      string               `bson:"poster" json:"poster"`
	Type        string               `bson:"type" json:"type"` // "single" or "double"
	Athletes    []TournamentAthlete  `bson:"athletes"`
	Deadline    time.Time            `bson:"deadline" json:"deadline"`
	Period      []time.Time          `bson:"period" json:"period"` // [startDate, endDate]
	Scale       int                  `bson:"scale" json:"scale"`   // Max number of athletes
	CreatedAt   time.Time            `bson:"created_at" json:"created_at"`
	UpdatedAt   time.Time            `bson:"updated_at" json:"updated_at"`
}