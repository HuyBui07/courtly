package services

import (
	"back_end/config"
	"back_end/models"
	"context"
	"errors"
	"time"

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

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	pickup.UserID = userObjID
	pickup.StartTime = booking.StartTime
	pickup.EndTime = booking.EndTime

	_, err = collection.InsertOne(context.TODO(), pickup)
	if err != nil {
		return err
	}

	// Update booking to allow pickup
	_, err = bookingCollection.UpdateOne(
		context.TODO(),
		bson.M{"_id": bookingObjID},
		bson.M{"$set": bson.M{"allow_pickup": true}},
	)
	if err != nil {
		return err
	}

	return nil
}

func GetBookingDetailsByBookingID(bookingID string) (map[string]interface{}, error) {
	collection := config.GetCollection("CourtBookings")

	bookingObjID, err := primitive.ObjectIDFromHex(bookingID)
	if err != nil {
		return nil, err
	}

	var booking models.CourtBooking
	err = collection.FindOne(context.TODO(), bson.M{
		"_id": bookingObjID,
	}).Decode(&booking)
	if err != nil {
		return nil, err
	}

	// Format the time string
	timeStr := booking.StartTime.Format("15:04") + " - " + booking.EndTime.Format("15:04")
	
	// Calculate duration in minutes
	duration := booking.EndTime.Sub(booking.StartTime).Hours()

	// Create custom response
	response := map[string]interface{}{
		"date":     booking.StartTime.Format("2006-01-02"),
		"time":     timeStr,
		"duration": int(duration),
	}

	return response, nil
}

func GetAllPickups(userID primitive.ObjectID) ([]models.Pickup, error) {
	collection := config.GetCollection("Pickups")

	filter := bson.M{
		"$and": []bson.M{
			{
				"user_id": bson.M{
					"$ne": userID,
				},
			},
			{
				"participant_ids": bson.M{
					"$ne": userID,
				},
			},
			{
				"$expr": bson.M{
					"$ne": []interface{}{
						bson.M{"$ifNull": []interface{}{
							bson.M{"$size": bson.M{"$ifNull": []interface{}{"$participant_ids", []interface{}{}}}},
							0,
						}},
						"$maximum_pickup",
					},
				},
			},
			{
				"end_time": bson.M{
					"$gt": time.Now().UTC().Add(7 * time.Hour),
				},
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

func GetUserUpcomingPickups(userID string) ([]map[string]interface{}, error) {
	collection := config.GetCollection("Pickups")

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, err
	}

	filter := bson.M{
		"$and": []bson.M{
			{
				"participant_ids": userObjID,
			},
			{
				"start_time": bson.M{
					"$gt": time.Now().UTC().Add(7 * time.Hour),
				},
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

	// Fetch court booking details for each pickup
	bookingsCollection := config.GetCollection("CourtBookings")
	var result []map[string]interface{}
	for i := range pickups {
		var booking models.CourtBooking
		err = bookingsCollection.FindOne(context.TODO(), bson.M{"_id": pickups[i].CourtBookingID}).Decode(&booking)
		if err != nil {
			return nil, err
		}

		// Create combined response with booking details and pickup ID
		bookingMap := map[string]interface{}{
			"_id":                pickups[i].CourtBookingID.Hex(),
			"court_id":           booking.CourtID,
			"start_time":         booking.StartTime,
			"end_time":           booking.EndTime,
			"state":              booking.State,
			"additional_services": booking.AdditionalServices,
			"pickup_id":          pickups[i].ID.Hex(),
		}
		result = append(result, bookingMap)
	}

	return result, nil
}

func GetPickupParticipatedState(bookingID string, hostID string) (map[string]interface{}, error) {
	collection := config.GetCollection("Pickups")

	bookingObjID, err := primitive.ObjectIDFromHex(bookingID)
	if err != nil {
		return nil, err
	}

	var pickup models.Pickup
	err = collection.FindOne(context.TODO(), bson.M{"court_booking_id": bookingObjID}).Decode(&pickup)
	if err != nil {
		return nil, err
	}

	hostObjID, err := primitive.ObjectIDFromHex(hostID)
	if err != nil {
		return nil, err
	}

	if pickup.UserID.Hex() != hostObjID.Hex() {
		return nil, errors.New("unauthorized: only the host can get the pickup participated state")
	}

	usersCollection := config.GetCollection("Users")
	var participants []map[string]string

	for _, participantID := range pickup.ParticipantIDs {
		if participantID.Hex() != hostObjID.Hex() {
			var user struct {
				Email string `bson:"email"`
			}
			err := usersCollection.FindOne(context.TODO(), bson.M{"_id": participantID}).Decode(&user)
			if err != nil {
				continue
			}
			participants = append(participants, map[string]string{
				"id":    participantID.Hex(),
				"name": user.Email,
			})
		}
	}

	return map[string]interface{}{
		"maximum_pickups": pickup.MaximumPickup,
		"users":          participants,
	}, nil
}

func CancelPickup(pickupID string, userID string) error {
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

	userObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return err
	}

	// Remove userID from participant list
	var newParticipants []primitive.ObjectID
	for _, participantID := range pickup.ParticipantIDs {
		if participantID != userObjID {
			newParticipants = append(newParticipants, participantID)
		}
	}

	// Update pickup with new participant list
	_, err = collection.UpdateOne(
		context.TODO(),
		bson.M{"_id": pickupObjID},
		bson.M{"$set": bson.M{"participant_ids": newParticipants}},
	)
	if err != nil {
		return err
	}

	return nil
}