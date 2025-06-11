package config

import (
	"context"
	"log"

	"firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

var App *firebase.App

func init() {
	opt := option.WithCredentialsFile("admin-sdk.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	App = app
}

func GetMessagingClient() *messaging.Client {
	ctx := context.Background()
	client, err := App.Messaging(ctx)
	if err != nil {
		log.Fatalf("error initializing messaging client: %v\n", err)
	}
	return client
}
