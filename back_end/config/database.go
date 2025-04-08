package config

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectDatabase() error {
	clientOptions := options.Client().ApplyURI("mongodb+srv://dbUser:dbUserPassword@node0.8toc7.mongodb.net/")

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return fmt.Errorf("failed to connect to MongoDB: %v", err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return fmt.Errorf("could not ping MongoDB: %v", err)
	}

	DB = client
	log.Println("Successfully connected to MongoDB!")
	return nil
}

func GetCollection(collectionName string) *mongo.Collection {
	if DB == nil {
		log.Fatal("Database connection is not initialized")
	}
	return DB.Database("BCM").Collection(collectionName)
}
