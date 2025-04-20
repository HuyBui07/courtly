package routes

import (
	"back_end/controllers"
	"net/http"
)

func PaymentRoutes() {
	http.HandleFunc("/create-payment", controllers.CreatePaymentHandler)
}
