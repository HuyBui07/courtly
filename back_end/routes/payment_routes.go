package routes

import (
	"back_end/controllers"
	"net/http"
)

func PaymentRoutes() {
	http.HandleFunc("/create-payment", controllers.CreatePaymentHandler)
	http.HandleFunc("/success", controllers.SuccessPaymentHandler)
	http.HandleFunc("/tournament-payment", controllers.TournamentPaymentHandler)
	http.HandleFunc("/tournament-success", controllers.TournamentSuccessPaymentHandler)
}
