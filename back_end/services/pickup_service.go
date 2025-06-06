package services

import (
	"back_end/config"
	"back_end/models"
	"context"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreatePickup(pickup *models.Pickup, userID string) error {
	collection := config.GetCollection("Pickups")
	bookingCollection := config.GetCollection("CourtBookings")

	// Get booking details to verify user
	bookingObjID, err := primitive.ObjectIDFromHex(pickup.CourtBookingID.Hex())
	if err != nil {
		return errors.New("invalid booking ID")
	}

	var booking models.CourtBooking
	err = bookingCollection.FindOne(context.TODO(), bson.M{"_id": bookingObjID}).Decode(&booking)
	if err != nil {
		return errors.New("invalid booking ID")
	}

	// Check if the user creating the pickup is the one who booked the court
	if booking.UserID != userID {
		return errors.New("unauthorized: only the user who booked the court can create a pickup game for it")
	}
	fmt.Println(pickup.ParticipantIDs)
	_, err = collection.InsertOne(context.TODO(), pickup)
	if err != nil {
		return err
	}

	return nil
}

func GetBookingDetailsByBookingID(bookingID string) (*models.CourtBookingResponse, error) {
	collection := config.GetCollection("CourtBookings")

	bookingObjID, err := primitive.ObjectIDFromHex(bookingID)
	if err != nil {
		return nil, err
	}

	var booking models.CourtBookingResponse
	err = collection.FindOne(context.TODO(), bson.M{"_id": bookingObjID}).Decode(&booking)
	if err != nil {
		return nil, err
	}

	return &booking, nil
}

func GetAllPickups() ([]models.Pickup, error) {
	collection := config.GetCollection("Pickups")

	filter := bson.M{
		"$expr": bson.M{
			"$ne": []interface{}{
				bson.M{"$ifNull": []interface{}{
					bson.M{"$size": bson.M{"$ifNull": []interface{}{"$participant_ids", []interface{}{}}}},
					0,
				}},
				"$maximum_pickup",
			},
		},
	}

	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}

	var pickups []models.Pickup
	if err = cursor.All(context.TODO(), &pickups); err != nil {
		return nil, err
	}

	return pickups, nil
}

func HandleJoinPickup(pickupID string, userID string) error {
	collection := config.GetCollection("Pickups")

	pickupObjID, err := primitive.ObjectIDFromHex(pickupID)
	if err != nil {
		return err
	}

	var pickup models.Pickup
	err = collection.FindOne(context.TODO(), bson.M{"_id": pickupObjID}).Decode(&pickup)
	if err != nil {
		return err
	}

	if pickup.MaximumPickup == len(pickup.ParticipantIDs) {
		return errors.New("pickup is full")
	}

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	pickup.ParticipantIDs = append(pickup.ParticipantIDs, userObjID)

	_, err = collection.UpdateOne(context.TODO(), bson.M{"_id": pickupObjID}, bson.M{"$set": pickup})
	if err != nil {
		return err
	}

	return nil
}