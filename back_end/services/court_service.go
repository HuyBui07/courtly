package services

import (
	"context"
	"time"

	"back_end/config"
	"back_end/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateCourt(court *models.Court) error {
    collection := config.GetCollection("Courts")
	
    court.CreatedAt = time.Now()
    court.UpdatedAt = time.Now()

    // Insert court vào DB
    result, err := collection.InsertOne(context.TODO(), court)
    if err != nil {
        return err
    }

    // Cập nhật court_id sau khi insert
    objectID := result.InsertedID.(primitive.ObjectID)
    courtID := objectID.Hex()

    filter := bson.M{"_id": objectID}
    update := bson.M{"$set": bson.M{"court_id": courtID}}

    _, err = collection.UpdateOne(context.TODO(), filter, update)
    if err != nil {
        return err
    }

    return nil
}

