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
	http.HandleFunc("/getUserInfoByID", controllers.GetUserInfoByIDHandler)
	//
	http.HandleFunc("/createCourt", controllers.CreateCourtHandler)

	http.HandleFunc("/bookCourt", controllers.BookCourtHandler)
	http.HandleFunc("/getUserBookings", controllers.GetUserBookingsHandler)
	http.HandleFunc("/getCourtBookingsOnSpecificDate", controllers.GetBookingsForCourtOnSpecificDateHandler)
	http.HandleFunc("/getAllBookingsOnASpecificDate", controllers.GetAllBookingsOnASpecificDateHandler)
	http.HandleFunc("/getUserBookingByMonth", controllers.GetUserBookingsByMonthHandler)

	// Cái này cho user hủy lịch
	http.HandleFunc("/cancelBookCourt", controllers.CancelBookingByIDHandler)
	http.HandleFunc("/deleteSpecificBooking", controllers.DeleteBookingHandler)
	http.HandleFunc("/deleteAllBookingInMonth", controllers.DeleteAllBookingsInMonthHandler)
	http.HandleFunc("/deleteAllBookingOfCourtInMonth", controllers.DeleteBookingsOfCourtInMonthHandler)


	//
	http.HandleFunc("/tournament/getAll", controllers.GetAllTournamentsHandler)
	http.HandleFunc("/tournament/create", controllers.CreateTournamentHandler)
	http.HandleFunc("/tournament/register", controllers.RegisterTournamentHandler)
	http.HandleFunc("/tournament/getAllAthletes", controllers.GetAthletesByTournamentHandler)
	http.HandleFunc("/tournament/cancel", controllers.CancelTournamentRegistrationHandler)

	// Pickup
	http.HandleFunc("/pickup/create", controllers.CreatePickupHandler)
	http.HandleFunc("/pickup/getAll", controllers.GetAllPickupsHandler)
	http.HandleFunc("/pickup/join", controllers.JoinPickupHandler)
	http.HandleFunc("/pickup/getBookingDetails", controllers.GetPickupDetailsHandler)
	http.HandleFunc("/pickup/getUserUpcoming", controllers.GetUserUpcomingPickupsHandler)
	http.HandleFunc("/pickup/getParticipatedState", controllers.GetPickupParticipatedStateHandler)
}
