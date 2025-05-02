package main

import (
	"fmt"
	"log"
	"net/http"

	"back_end/config"
	"back_end/routes"

	"github.com/payOSHQ/payos-lib-golang"
)

func init() {
	err := config.ConnectDatabase()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	fmt.Println("Successfully connected to BCM!")
}

func main() {
	const clientId = "0e6b9854-2a8c-4eb6-a32b-cb11e030a07d"
	const apiKey = "7211add5-4d6b-422b-adec-4b55dccc8660"
	const checksumKey = "93a83dfe4fba0e8037b0427b717241c86b4cc0e923c78aa98ea050fb819f7133"

	payos.Key(clientId, apiKey, checksumKey)

	routes.AuthRoutes()
	routes.PaymentRoutes()
	// routes.CourtRoutes()

	port := "8080"
	log.Printf("Server is running on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
