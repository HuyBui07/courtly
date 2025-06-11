package services

import (
	"back_end/config"
	"context"

	"firebase.google.com/go/v4/messaging"
)

func SendNotification(token string, title string, body string) error {
	client := config.GetMessagingClient()

	message := &messaging.Message{
		Token: token,
		Notification: &messaging.Notification{
			Title: title,
			Body:  body,
		},
	}

	_, err := client.Send(context.Background(), message)
	if err != nil {
		return err
	}

	return nil
}
