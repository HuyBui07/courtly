package main

import (
	"fmt"
	"log"
	"net/http"

	"back_end/config"
	"back_end/routes"
)

func init() {
	err := config.ConnectDatabase()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	fmt.Println("Successfully connected to BCM!")
}

func main() {
	routes.AuthRoutes()

	port := "8080"
	log.Printf("Server is running on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
