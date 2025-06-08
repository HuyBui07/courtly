package services

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"back_end/config"
	"back_end/models"

	"go.mongodb.org/mongo-driver/bson"
)

// Tính tổng số ngày trong tháng (không kiểm tra năm nhuận =)))
func getDaysInMonth(month, year int) int {
	daysPerMonth := [...]int{
		31, 28, 31, 30, 31, 30,
		31, 31, 30, 31, 30, 31,
	}
	if month >= 1 && month <= 12 {
		return daysPerMonth[month-1]
	}
	return 0
}

// Tổng số giờ có thể được thuê trong 1 tháng
func getMaxRentableHours(month, year int) int {
	return getDaysInMonth(month, year) * 18
}

// Tính số giờ thuê thực tế từ database
func GetActualBookedHours(courtID int, monthYear string) (int, error) {
	parts := strings.Split(monthYear, "-")
	if len(parts) != 2 {
		return 0, errors.New("invalid monthYear format")
	}
	month, err1 := strconv.Atoi(parts[0])
	year, err2 := strconv.Atoi(parts[1])
	if err1 != nil || err2 != nil {
		return 0, errors.New("invalid month or year")
	}

	startDate := time.Date(year, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
	endDate := startDate.AddDate(0, 1, 0)

	collection := config.GetCollection("CourtBookings")
	filter := bson.M{
		"court_id":  courtID,
		"state":     "Booked",
		"start_time": bson.M{"$gte": startDate, "$lt": endDate},
	}
	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return 0, err
	}
	defer cursor.Close(context.TODO())

	type Booking struct {
		StartTime time.Time `bson:"start_time"`
		EndTime   time.Time `bson:"end_time"`
	}

	totalHours := 0
	for cursor.Next(context.TODO()) {
		var booking Booking
		if err := cursor.Decode(&booking); err != nil {
			return 0, err
		}
		duration := booking.EndTime.Sub(booking.StartTime).Hours()
		totalHours += int(duration)
	}

	return totalHours, nil
}

// Tính phần trăm sử dụng của sân
func GetCourtUsageStatistic(courtID int, monthYear string) (float64, int, int, error) {
	parts := strings.Split(monthYear, "-")
	if len(parts) != 2 {
		return 0, 0, 0, errors.New("invalid input format")
	}
	month, err1 := strconv.Atoi(parts[0])
	year, err2 := strconv.Atoi(parts[1])
	if err1 != nil || err2 != nil {
		return 0, 0, 0, errors.New("invalid month or year")
	}

	maxHours := getMaxRentableHours(month, year)
	actualHours, err := GetActualBookedHours(courtID, monthYear)
	if err != nil {
		return 0, 0, 0, err
	}

	usage := (float64(actualHours) / float64(maxHours)) * 100
	return usage, actualHours, maxHours, nil
}

func GetCourtRevenueStatistic(courtID int, monthYear string) (int64, error) {
	layout := "1-2006"
	monthTime, err := time.Parse(layout, monthYear)
	if err != nil {
		return 0, fmt.Errorf("invalid month format: %v", err)
	}
	startOfMonth := time.Date(monthTime.Year(), monthTime.Month(), 1, 0, 0, 0, 0, time.UTC)
	endOfMonth := startOfMonth.AddDate(0, 1, 0)
	BookingCollection := config.GetCollection("CourtBookings")
	CourtFeeCollection := config.GetCollection("Fee")
	// Filter các booking của court trong tháng đó và có state = "Booked"
	filter := bson.M{
		"court_id":   courtID,
		"start_time": bson.M{"$gte": startOfMonth, "$lt": endOfMonth},
		"state":      "Booked",
	}

	cursor, err := BookingCollection.Find(context.TODO(), filter)
	if err != nil {
		return 0, err
	}
	defer cursor.Close(context.TODO())

	// Lấy court fee hiện tại (luôn chỉ có 1 bản ghi)
	var courtFee models.CourtFee
	err = CourtFeeCollection.FindOne(context.TODO(), bson.M{}).Decode(&courtFee)
	if err != nil {
		return 0, fmt.Errorf("could not fetch court fee: %v", err)
	}

	var totalRevenue int64 = 0

	// Duyệt từng booking, tính phí theo giờ
	for cursor.Next(context.TODO()) {
		var booking models.CourtBooking
		if err := cursor.Decode(&booking); err != nil {
			continue
		}

		start := booking.StartTime
		end := booking.EndTime

		for t := start; t.Before(end); t = t.Add(time.Hour) {
			hour := t.Hour()
			if hour >= 4 && hour < 16 {
				totalRevenue += courtFee.NormalFee
			} else if hour >= 16 && hour < 22 {
				totalRevenue += courtFee.HotFee
			}
			// Bỏ qua giờ ngoài khung 4h - 22h
		}
	}

	return totalRevenue, nil
}