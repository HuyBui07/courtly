package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"back_end/models"
	"back_end/services"
)

type AuthResponse struct {
    Message string `json:"message"`
    Token   string `json:"token"`
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    var user models.User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Failed to parse request body", http.StatusBadRequest)
        return
    }

    token, err := services.RegisterUser(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    response := AuthResponse{
        Message: "User registered successfully",
        Token:   token,
    }

    w.Header().Set("Content-Type", "application/json")

    w.WriteHeader(http.StatusOK)
    if err := json.NewEncoder(w).Encode(response); err != nil {
        http.Error(w, fmt.Sprintf("Failed to encode response: %v", err), http.StatusInternalServerError)
    }
    fmt.Println("User registered successfully")
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    credentials := make(map[string]string)

    if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
        http.Error(w, fmt.Sprintf("Failed to parse request body: %v", err), http.StatusBadRequest)
        return
    }

    token, err := services.LoginUser(credentials["email"], credentials["pass"])
    if err != nil {
        http.Error(w, fmt.Sprintf("Login failed: %v", err), http.StatusUnauthorized)
        return
    }

    response := AuthResponse{
        Message: "Login successful",
        Token:   token,
    }

    w.Header().Set("Content-Type", "application/json")

    w.WriteHeader(http.StatusOK)
    if err := json.NewEncoder(w).Encode(response); err != nil {
        http.Error(w, fmt.Sprintf("Failed to encode response: %v", err), http.StatusInternalServerError)
    }
}


func CurrentUserDataHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    token := r.Header.Get("Authorization")

    user, err := services.GetUserDataByToken(token)
    if err != nil {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(user)
}

func GetAllUserDataHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    token := r.Header.Get("Authorization")

    users, err := services.GetAllUserDataByToken(token)
    if err != nil {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(users)
}

func GetAllAdminDataHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    token := r.Header.Get("Authorization")

    admins, err := services.GetAllAdmins(token)
    if err != nil {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(admins)
}

func GetAllClientDataHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    token := r.Header.Get("Authorization")

    clients, err := services.GetAllClients(token)
    if err != nil {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(clients)
}