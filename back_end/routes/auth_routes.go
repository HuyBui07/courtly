package routes

import (
	"back_end/controllers"
	"net/http"
)

func AuthRoutes() {
	http.HandleFunc("/register", controllers.RegisterHandler)
	http.HandleFunc("/login", controllers.LoginHandler)
	http.HandleFunc("/getCurrentUser", controllers.CurrentUserDataHandler)
	http.HandleFunc("/getAllUsers", controllers.GetAllUserDataHandler)
	http.HandleFunc("/getAllAdmins", controllers.GetAllAdminDataHandler)
	http.HandleFunc("/getAllClients", controllers.GetAllClientDataHandler)
}
