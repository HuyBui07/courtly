package models

type UnpaidTournament struct {
	TourID string `bson:"tour_id" json:"tour_id"`
	UserID string `bson:"user_id" json:"user_id"`
}