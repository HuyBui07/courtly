package services

import (
	"context"
	"errors"
	"fmt"
	"time"

	"back_end/config"
	"back_end/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BookingOrder struct {
	CourtID           int32
	UserID           string
	StartTime        time.Time
	EndTime          time.Time
	AdditionalServices []models.AdditionalService
	AllowPickup      bool
}

func CreateCourtBooking(orders []BookingOrder) error {
	fmt.Println("CreateCourtBooking")
	collection := config.GetCollection("CourtBookings")
	courtsCollection := config.GetCollection("Courts")
	usersCollection := config.GetCollection("Users")

	for _, order := range orders {
		var court models.Court
		err := courtsCollection.FindOne(context.TODO(), bson.M{"court_id": order.CourtID}).Decode(&court)
		if err != nil {
			return errors.New("court not found")
		}

		// Kiểm tra User có tồn tại không
		userObjID, err := primitive.ObjectIDFromHex(order.UserID)
		if err != nil {
			return errors.New("invalid user ID")
		}

		var user models.User
		err = usersCollection.FindOne(context.TODO(), bson.M{"_id": userObjID}).Decode(&user)
		if err != nil {
			return errors.New("user not found")
		}

		// Kiểm tra khoảng thời gian đã được book chưa
		filter := bson.M{
			"court_id": order.CourtID,
			"$or": []bson.M{
				{"start_time": bson.M{"$lt": order.EndTime}, "end_time": bson.M{"$gt": order.StartTime}},
			},
		}

		count, err := collection.CountDocuments(context.TODO(), filter)
		if err != nil {
			return errors.New("error checking existing bookings")
		}

		if count > 0 {
			return errors.New("time slot already booked")
		}

		// Tạo booking mới
		newBooking := models.CourtBooking{
			CourtID:           order.CourtID,
			UserID:           order.UserID,
			StartTime:        order.StartTime,
			EndTime:          order.EndTime,
			CreatedAt:        time.Now(),
			State:            "Booked",
			AdditionalServices: order.AdditionalServices,
			AllowPickup:      order.AllowPickup,
		}

		_, err = collection.InsertOne(context.TODO(), newBooking)
		if err != nil {
			return errors.New(err.Error())
		}
	}

	return nil
}

func GetUserBookings(userId string) ([]models.CourtBookingResponse, []models.CourtBookingResponse, error) {
	collection := config.GetCollection("CourtBookings")
	filter := bson.M{"user_id": userId}

	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, nil, errors.New("failed to fetch bookings")
	}
	defer cursor.Close(context.TODO())

	var upcomingBookings []models.CourtBookingResponse
	var pastBookings []models.CourtBookingResponse
	for cursor.Next(context.TODO()) {
		var booking models.CourtBookingResponse
		if err := cursor.Decode(&booking); err != nil {
			return nil, nil, errors.New("failed to decode booking")
		}
		// Convert booking times to UTC for consistent comparison
		now := time.Now().UTC().Add(7 * time.Hour)
		bookingEnd := booking.EndTime.UTC()

		if bookingEnd.After(now) {
			fmt.Println("bookingEnd: ", bookingEnd)
			fmt.Println("now: ", now)

			upcomingBookings = append(upcomingBookings, booking)
		} else {
			pastBookings = append(pastBookings, booking)
		}
		continue

	}

	return upcomingBookings, pastBookings, nil
}

func GetBookingsForCourtOnSpecificDate(courtID string, date time.Time) ([]models.CourtBookingResponse, error) {
	collection := config.GetCollection("CourtBookings")

	startOfDay := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, time.UTC)
	endOfDay := startOfDay.Add(24 * time.Hour)

	filter := bson.M{
		"court_id": courtID,
		"start_time": bson.M{
			"$gte": startOfDay,
			"$lt":  endOfDay,
		},
	}

	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, errors.New("failed to fetch bookings")
	}
	defer cursor.Close(context.TODO())

	var bookings []models.CourtBookingResponse
	for cursor.Next(context.TODO()) {
		var booking models.CourtBookingResponse
		if err := cursor.Decode(&booking); err != nil {
			return nil, errors.New("failed to decode booking")
		}
		bookings = append(bookings, booking)
	}

	return bookings, nil
}

func GetAllBookingsOnASpecificDate(date time.Time) ([]models.CourtBookingResponse, error) {
	collection := config.GetCollection("CourtBookings")

	startOfDay := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, time.UTC)
	endOfDay := startOfDay.Add(24 * time.Hour)

	filter := bson.M{
		"start_time": bson.M{"$gte": startOfDay, "$lt": endOfDay},
		"state":      "Booked",
	}

	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, errors.New("failed to fetch bookings")
	}
	defer cursor.Close(context.TODO())

	var bookings []models.CourtBookingResponse
	for cursor.Next(context.TODO()) {
		var booking models.CourtBookingResponse
		if err := cursor.Decode(&booking); err != nil {
			return nil, errors.New("failed to decode booking")
		}
		bookings = append(bookings, booking)
	}

	return bookings, nil
}

func GetUserBookingsByDate(token, dateStr string) ([]models.CourtBookingResponse, error) {
	user, err := GetUserDataByToken(token)
	if err != nil {
		return nil, errors.New("unauthorized")
	}

	date, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return nil, errors.New("invalid date format. Expected yyyy-mm-dd")
	}

	start := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, time.UTC)
	end := start.Add(24 * time.Hour)

	collection := config.GetCollection("CourtBookings")
	filter := bson.M{
		"user_id":    user.ID.Hex(),
		"start_time": bson.M{"$gte": start, "$lt": end},
	}

	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var bookings []models.CourtBookingResponse
	for cursor.Next(context.TODO()) {
		var b models.CourtBookingResponse
		if err := cursor.Decode(&b); err == nil {
			bookings = append(bookings, b)
		}
	}

	return bookings, nil
}

func GetUserBookingsByMonth(token, monthStr string) ([]models.CourtBookingResponse, error) {
	user, err := GetUserDataByToken(token)
	if err != nil {
		return nil, errors.New("unauthorized")
	}

	date, err := time.Parse("2006-01", monthStr)
	if err != nil {
		return nil, errors.New("invalid month format. Expected yyyy-mm")
	}

	start := time.Date(date.Year(), date.Month(), 1, 0, 0, 0, 0, time.UTC)
	end := start.AddDate(0, 1, 0)

	collection := config.GetCollection("CourtBookings")
	filter := bson.M{
		"user_id":    user.ID.Hex(),
		"start_time": bson.M{"$gte": start, "$lt": end},
	}

	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var bookings []models.CourtBookingResponse
	for cursor.Next(context.TODO()) {
		var b models.CourtBookingResponse
		if err := cursor.Decode(&b); err == nil {
			bookings = append(bookings, b)
		}
	}

	return bookings, nil
}

func DeleteBookingByID(userID string, role string, bookingID string) error {
	collection := config.GetCollection("CourtBookings")

	bookingObjID, err := primitive.ObjectIDFromHex(bookingID)
	if err != nil {
		return errors.New("invalid booking ID format")
	}

	// Tạo filter
	filter := bson.M{"_id": bookingObjID}
	if role == "Client" {
		filter["user_id"] = userID // userID là dạng string, KHÔNG chuyển sang ObjectID
	}

	// Log để debug
	fmt.Println("Delete filter:", filter)

	// Thực hiện xóa
	result, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		return errors.New("failed to delete booking")
	}
	if result.DeletedCount == 0 {
		return errors.New("booking not found or permission denied")
	}

	return nil
}

func DeleteAllBookingsInMonth(year int, month int) error {
	collection := config.GetCollection("CourtBookings")

	startDate := time.Date(year, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
	endDate := startDate.AddDate(0, 1, 0) // Tăng thêm 1 tháng

	filter := bson.M{
		"start_time": bson.M{
			"$gte": startDate,
			"$lt":  endDate,
		},
	}

	_, err := collection.DeleteMany(context.TODO(), filter)
	return err
}

func DeleteBookingsOfCourtInMonth(courtID string, year int, month int) error {
	collection := config.GetCollection("CourtBookings")
	courtsCollection := config.GetCollection("Courts")

	courtObjID, err := primitive.ObjectIDFromHex(courtID)
	if err != nil {
		return errors.New("invalid court ID")
	}
	var court models.Court
	err = courtsCollection.FindOne(context.TODO(), bson.M{"_id": courtObjID}).Decode(&court)
	if err != nil {
		return errors.New("court not found")
	}
	startDate := time.Date(year, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
	endDate := startDate.AddDate(0, 1, 0)

	filter := bson.M{
		"court_id": courtID,
		"start_time": bson.M{
			"$gte": startDate,
			"$lt":  endDate,
		},
	}

	_, err = collection.DeleteMany(context.TODO(), filter)
	return err
}
func CancelBookingByID(bookingID string, userID string) error {
	collection := config.GetCollection("CourtBookings")

	bookingObjID, err := primitive.ObjectIDFromHex(bookingID)
	if err != nil {
		return errors.New("invalid booking ID format")
	}

	// Check if booking exists and belongs to user
	var booking models.CourtBooking
	filter := bson.M{"_id": bookingObjID}
	err = collection.FindOne(context.TODO(), filter).Decode(&booking)
	if err != nil {
		return errors.New("booking not found")
	}

	if booking.UserID != userID {
		return errors.New("permission denied - booking belongs to different user")
	}

	_, err = collection.UpdateOne(context.TODO(), filter, bson.M{"$set": bson.M{"state": "Cancelled"}})
	if err != nil {
		return errors.New("failed to cancel booking")
	}

	return nil
}

func PostUnpaidBooking(unpaidBooking models.UnpaidBooking) error {
	collection := config.GetCollection("UnpaidBookings")
	
	// Generate a new ObjectID
	unpaidBooking.ID = primitive.NewObjectID()
	
	_, err := collection.InsertOne(context.TODO(), unpaidBooking)
	return err
}
