package services

import (
	"back_end/config"
	"back_end/models"
	"back_end/utils"
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CalculateCourtFee(startTime, endTime time.Time) (int64, error) {
	// Lấy fee hiện tại từ DB
	collection := config.GetCollection("Fee")
	var courtFee models.CourtFee
	err := collection.FindOne(context.TODO(), bson.M{}).Decode(&courtFee)
	if err != nil {
		return 0, errors.New("failed to get court fee")
	}

	var totalFee int64 = 0

	current := startTime
	for current.Before(endTime) {
		hour := current.Hour()

		if hour >= 16 && hour < 22 {
			totalFee += courtFee.HotFee
		} else if hour >= 4 && hour < 16 {
			totalFee += courtFee.NormalFee
		}
		current = current.Add(time.Hour)
	}

	return totalFee, nil
}

func UpdateCourtFee(token string, hotFee, normalFee int64) error {
	// Xác thực token & kiểm tra quyền Admin
	userID, err := utils.ValidateJWT(token)
	if err != nil {
		return errors.New("invalid token")
	}
	if !isAdmin(userID) {
		return errors.New("unauthorized: admin only")
	}

	collection := config.GetCollection("Fee")

	// Tạo thông tin mới
	newFee := models.CourtFee{
		HotFee:    hotFee,
		NormalFee: normalFee,
		UpdatedBy: userID,
		UpdatedAt: time.Now(),
	}

	// Cập nhật hoặc tạo mới nếu chưa có
	filter := bson.M{} // lọc rỗng để áp dụng cho bản ghi duy nhất
	update := bson.M{"$set": newFee}
	opts := options.Update().SetUpsert(true)

	_, err = collection.UpdateOne(context.Background(), filter, update, opts)
	if err != nil {
		return errors.New("failed to update court fee")
	}

	return nil
}

