package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CourtFee struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	HotFee     int64              `bson:"hot_fee" json:"hot_fee"`       // 4h - 16h
	NormalFee  int64              `bson:"normal_fee" json:"normal_fee"` // 16h - 22h
	UpdatedBy  string             `bson:"updated_by" json:"updated_by"`
	UpdatedAt  time.Time          `bson:"updated_at" json:"updated_at"`
}
