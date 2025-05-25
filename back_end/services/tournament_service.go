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

func CreateTournament(name, description, poster, tType string, deadline time.Time, period []time.Time, scale int) error {
	collection := config.GetCollection("Tournaments")

	if len(period) != 2 {
		return errors.New("period must have exactly 2 dates")
	}

	now := time.Now().UTC()
	id := primitive.NewObjectID()

	tour := models.Tournament{
		ID:          id,
		TourID:      id.Hex(),
		Name:        name,
		Description: description,
		Poster:      poster,
		Type:        tType,
		Athletes:    []models.TournamentAthlete{},
		Deadline:    deadline,
		Period:      period,
		Scale:       scale,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	_, err := collection.InsertOne(context.TODO(), tour)
	return err
}

func RegisterToTournament(userID, tourID, athlete1, athlete2 string) error {
	collection := config.GetCollection("Tournaments")

	// Tìm tournament
	objID, err := primitive.ObjectIDFromHex(tourID)
	if err != nil {
		return errors.New("invalid tournament ID")
	}

	var tournament models.Tournament
	err = collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&tournament)
	if err != nil {
		return errors.New("tournament not found")
	}

	// Kiểm tra deadline
	if time.Now().After(tournament.Deadline) {
		return errors.New("registration deadline has passed")
	}

	// Kiểm tra số lượng người tham gia
	if len(tournament.Athletes) >= tournament.Scale {
		return errors.New("tournament is full")
	}

	// Kiểm tra user đã đăng ký chưa
	for _, a := range tournament.Athletes {
		if a.UserID == userID {
			return errors.New("you have already registered for this tournament")
		}
	}

	// Tạo đối tượng athlete
	newAthlete := models.TournamentAthlete{
		UserID:   userID,
		Athlete1: athlete1,
		Athlete2: athlete2,
	}

	// Cập nhật tournament
	update := bson.M{
		"$push": bson.M{"athletes": newAthlete},
		"$set":  bson.M{"updated_at": time.Now()},
	}

	_, err = collection.UpdateOne(context.TODO(), bson.M{"_id": objID}, update)
	if err != nil {
		return errors.New("failed to register")
	}

	return nil
}

func GetAthletesByTournamentID(tourID string) ([]models.TournamentAthlete, error) {
	collection := config.GetCollection("Tournaments")

	objID, err := primitive.ObjectIDFromHex(tourID)
	if err != nil {
		return nil, errors.New("invalid tournament ID")
	}

	var tournament models.Tournament
	err = collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&tournament)
	if err != nil {
		return nil, errors.New("tournament not found")
	}

	return tournament.Athletes, nil
}

func CancelTournamentRegistration(tourID string, userID string) error {
	tourCollection := config.GetCollection("Tournaments")

	// Chuyển đổi tourID sang ObjectID
	objID, err := primitive.ObjectIDFromHex(tourID)
	if err != nil {
		return errors.New("invalid tournament ID")
	}

	// Tìm tournament để đảm bảo tồn tại
	var tournament models.Tournament
	err = tourCollection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&tournament)
	if err != nil {
		return errors.New("tournament not found")
	}

	// Lọc bỏ user khỏi danh sách athletes
	newAthletes := []models.TournamentAthlete{}
	found := false
	for _, a := range tournament.Athletes {
		if a.UserID != userID {
			newAthletes = append(newAthletes, a)
		} else {
			found = true
		}
	}

	if !found {
		return errors.New("user is not registered in this tournament")
	}

	// Cập nhật lại danh sách
	update := bson.M{
		"$set": bson.M{
			"athletes":   newAthletes,
			"updated_at": time.Now(),
		},
	}

	_, err = tourCollection.UpdateOne(context.TODO(), bson.M{"_id": objID}, update)
	if err != nil {
		return errors.New("failed to update tournament")
	}

	return nil
}

