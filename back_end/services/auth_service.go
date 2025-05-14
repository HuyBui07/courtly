package services

import (
	"context"
	"errors"
	"time"

	"back_end/config"
	"back_end/models"
	"back_end/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

var Token string
func RegisterUser(user *models.User) (string, error) {
    collection := config.GetCollection("Users")
    var existingUser models.User
    err := collection.FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&existingUser)

    if err == nil {
        return "", errors.New("email already exists")
    }

    // Hash password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*user.Password), bcrypt.DefaultCost)
    if err != nil {
        return "", err
    }

    hashedPasswordStr := string(hashedPassword)
    user.Password = &hashedPasswordStr
	user.Type = "Client"
    user.Create_at = time.Now()
    user.Update_at = time.Now()

    // Insert user vào database
    result, err := collection.InsertOne(context.Background(), user)
    if err != nil {
        return "", err
    }

    // objectId = user_id
    user.User_id = result.InsertedID.(primitive.ObjectID).Hex()

    filter := bson.M{"_id": result.InsertedID}
    update := bson.M{"$set": bson.M{"user_id": user.User_id}}

    _, err = collection.UpdateOne(context.Background(), filter, update)
    if err != nil {
        return "", err
    }

    // Tạo token
    token, err := utils.GenerateJWT(user.User_id)
    if err != nil {
        return "", err
    }
    Token = token
    // Cập nhật token vào MongoDB
    updateToken := bson.M{"$set": bson.M{"token": token, "update_at": time.Now()}}
    _, err = collection.UpdateOne(context.TODO(), bson.M{"_id": result.InsertedID}, updateToken)

    return token, err
}

func LoginUser(email, password string) (string, error) {
    collection := config.GetCollection("Users")

    var user models.User
    err := collection.FindOne(context.TODO(), bson.M{"email": email}).Decode(&user)
    if err != nil {
        return "", errors.New("user not found")
    }

    if err := bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(password)); err != nil {
        return "", errors.New("invalid password")
    }

    token, err := utils.GenerateJWT(user.User_id) // Sử dụng user_id để tạo token
    if err != nil {
        return "", err
    }
    Token = token
    // Cập nhật token vào MongoDB
    update := bson.M{"$set": bson.M{"token": token, "update_at": time.Now()}}
    _, err = collection.UpdateOne(context.TODO(), bson.M{"email": email}, update)

    return token, err
}

func GetUserDataByToken(token string) (models.User, error) {
    // Xác thực token và lấy user_id
    userID, err := utils.ValidateJWT(token)
    if err != nil {
        return models.User{}, errors.New("invalid token")
    }

    // Lấy user theo user_id từ database
    collection := config.GetCollection("Users")
    var user models.User
    err = collection.FindOne(context.TODO(), bson.M{"user_id": userID}).Decode(&user)
    if err != nil {
        return models.User{}, errors.New("user not found")
    }

    return user, nil
}

func isAdmin(userID string) bool {
    collection := config.GetCollection("Users")
    var user models.User
    err := collection.FindOne(context.TODO(), bson.M{"user_id": userID}).Decode(&user)
    if err != nil || user.Type != "Admin" {
        return false
    }
    return true
}

func GetAllUserDataByToken(token string) ([]models.User, error) {
    // Xác thực token và kiểm tra quyền Admin
    userID, err := utils.ValidateJWT(token)
    if err != nil {
        return nil, errors.New("invalid token")
    }
    
    if !isAdmin(userID) {
        return nil, errors.New("you don't have permission")
    }

    collection := config.GetCollection("Users")
    var users []models.User

    cursor, err := collection.Find(context.Background(), bson.M{})
    if err != nil {
        return nil, errors.New("failed to fetch users")
    }
    defer cursor.Close(context.Background())

    if err = cursor.All(context.Background(), &users); err != nil {
        return nil, errors.New("error decoding users")
    }

    return users, nil
}

func GetAllAdmins(token string) ([]models.User, error) {
    // Xác thực token và kiểm tra quyền Admin
    userID, err := utils.ValidateJWT(token)
    if err != nil {
        return nil, errors.New("invalid token")
    }
    
    if !isAdmin(userID) {
        return nil, errors.New("you don't have permission")
    }

    // Kết nối đến collection Users
    collection := config.GetCollection("Users")
    var admins []models.User
	filter := bson.M{
		"user_type": "Admin",
	}
    // Truy vấn tất cả Admins
    cursor, err := collection.Find(context.Background(), filter)
    if err != nil {
        return nil, errors.New("failed to fetch admins")
    }
    defer cursor.Close(context.Background())

    if err = cursor.All(context.Background(), &admins); err != nil {
        return nil, errors.New("error decoding admins")
    }

    return admins, nil
}

func GetAllClients(token string) ([]models.User, error) {
    // Xác thực token và kiểm tra quyền Admin
    userID, err := utils.ValidateJWT(token)
    if err != nil {
        return nil, errors.New("invalid token")
    }
    
    if !isAdmin(userID) {
        return nil, errors.New("you don't have permission")
    }

    // Kết nối đến collection Users
    collection := config.GetCollection("Users")
    var clients []models.User
	filter := bson.M{
		"user_type": "Client",
	}
    // Truy vấn tất cả Clients
    cursor, err := collection.Find(context.Background(), filter)
    if err != nil {
        return nil, errors.New("failed to fetch clients")
    }
    defer cursor.Close(context.Background())

    // Decode kết quả vào slice clients
    if err = cursor.All(context.Background(), &clients); err != nil {
        return nil, errors.New("error decoding clients")
    }

    return clients, nil
}

