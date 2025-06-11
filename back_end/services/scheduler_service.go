package services

import (
	"back_end/config"
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Booking struct {
	ID        primitive.ObjectID `bson:"_id"`
	StartTime time.Time          `bson:"start_time"`
	UserID    string             `bson:"user_id"`
	CourtID   int32              `bson:"court_id"`
}

func StartScheduler() {
	fmt.Println("Starting scheduler...")
	// Run immediately for testing

	// Run daily at 7 AM
	ticker := time.NewTicker(24 * time.Hour)
	go func() {
		for {
			checkUpcomingBookings()
			<-ticker.C
		}
	}()
}

func checkUpcomingBookings() {
	collection := config.GetCollection("CourtBookings")
	ctx := context.Background()

	now := time.Now().UTC().Add(7 * time.Hour)
	startOfCurrentHour := time.Date(now.Year(), now.Month(), now.Day(), now.Hour(), 0, 0, 0, time.UTC)
	endOfTomorrow := startOfCurrentHour.Add(24 * time.Hour)

	fmt.Println("Start of current hour: ", startOfCurrentHour)
	fmt.Println("End of tomorrow: ", endOfTomorrow)

	filter := bson.M{
		"start_time": bson.M{
			"$gte": startOfCurrentHour,
			"$lte": endOfTomorrow,
		},
		"state": "Booked",
	}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Printf("Error finding bookings: %v", err)
		return
	}
	defer cursor.Close(ctx)

	var bookings []Booking
	if err = cursor.All(ctx, &bookings); err != nil {
		log.Printf("Error decoding bookings: %v", err)
		return
	}

	// Set notification timers for each booking
	for _, booking := range bookings {
		fmt.Println("Booking: ", booking.ID)
		notificationTime := booking.StartTime.Add(-94 * time.Minute)
		if notificationTime.After(now) {
			go scheduleNotification(booking, notificationTime.Sub(now))
		}
	}
}

func scheduleNotification(booking Booking, delay time.Duration) {
	fmt.Println("Scheduling notification for booking: ", booking.ID, " with delay: ", delay)
	// Use a timer channel instead of sleep
	timer := time.NewTimer(delay)
	go func() {
		<-timer.C

		// Get user's FCM token from users collection
		collection := config.GetCollection("Users")
		ctx := context.Background()

		var user struct {
			FCMToken string `bson:"fcmToken"`
		}

		userID, err := primitive.ObjectIDFromHex(booking.UserID)
		if err != nil {
			log.Printf("Error converting user ID to ObjectID: %v", err)
			return
		}

		err = collection.FindOne(ctx, bson.M{"_id": userID}).Decode(&user)
		if err != nil {
			log.Printf("Error finding user: %v", err)
			return
		}

		// Send notification
		err = SendNotification(
			user.FCMToken,
			"Upcoming Court Booking",
			"Your court booking starts in 30 minutes!",
		)
		if err != nil {
			log.Printf("Error sending notification: %v", err)
		}

		fmt.Println("Notification sent to user: ", user.FCMToken)
	}()
}
