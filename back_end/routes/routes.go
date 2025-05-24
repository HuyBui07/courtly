package routes

import (
	"back_end/controllers"
	"net/http"
)

func AuthRoutes() {
	//Auth
	http.HandleFunc("/register", controllers.RegisterHandler)
	http.HandleFunc("/login", controllers.LoginHandler)
	http.HandleFunc("/getCurrentUser", controllers.CurrentUserDataHandler)
	http.HandleFunc("/getAllUsers", controllers.GetAllUserDataHandler)
	http.HandleFunc("/getAllAdmins", controllers.GetAllAdminDataHandler)
	http.HandleFunc("/getAllClients", controllers.GetAllClientDataHandler)

	//
	http.HandleFunc("/createCourt", controllers.CreateCourtHandler)

	http.HandleFunc("/bookCourt", controllers.BookCourtHandler)
	http.HandleFunc("/getCourtBookingsOnSpecificDate", controllers.GetBookingsForCourtOnSpecificDateHandler)
	http.HandleFunc("/getUserBookingByDate", controllers.GetUserBookingsByDateHandler)
	http.HandleFunc("/getUserBookingByMonth", controllers.GetUserBookingsByMonthHandler)

	// Cái này cho user hủy lịch
	http.HandleFunc("/deleteSpecificBooking", controllers.DeleteBookingHandler)
	http.HandleFunc("/deleteAllBookingInMonth", controllers.DeleteAllBookingsInMonthHandler)
	http.HandleFunc("/deleteAllBookingOfCourtInMonth", controllers.DeleteBookingsOfCourtInMonthHandler)


	//
	http.HandleFunc("/tournament/create", controllers.CreateTournamentHandler)
	http.HandleFunc("/tournament/register", controllers.RegisterTournamentHandler)
	http.HandleFunc("/tournament/getAll", controllers.GetAthletesByTournamentHandler)
	http.HandleFunc("/tournament/cancel", controllers.CancelTournamentRegistrationHandler)

}
