import {
  GET_USER_BOOKINGS_URL,
  GET_ALL_BOOKED_COURT_ON_SPECIFIC_DATE_URL,
  BOOK_COURT_URL,
  CANCEL_BOOKING_URL,
  PAYMENT_SUCCESS_URL,
} from "../constants";

import { TokenManager } from "@/libs/store/persistStore";
import { BookingOrder } from "../types/BookingOrder";

export const BookingService = {
  getUserBookings: async () => {
    try {
      const response = await fetch(GET_USER_BOOKINGS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });

      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getAllBookedCourtOnSpecificDate: async (date: string) => {
    try {
      const response = await fetch(
        GET_ALL_BOOKED_COURT_ON_SPECIFIC_DATE_URL + "?date=" + date,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await TokenManager.get()}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  bookCourt: async (bookingOrder: BookingOrder) => {
    try {
      console.log("booking", bookingOrder);
      const response = await fetch(BOOK_COURT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
        body: JSON.stringify(bookingOrder),
      });

      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }

      const data = (await response.text()).trim();
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  cancelBooking: async (bookingID: string) => {
    try {
      console.log("bookingID", bookingID);
      await fetch(CANCEL_BOOKING_URL + "?booking_id=" + bookingID, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  paymentSuccess: async (orderCode: string, paymentStatus: string) => {
    try {
      const response = await fetch(
        PAYMENT_SUCCESS_URL +
          "?orderCode=" +
          orderCode +
          "&paymentStatus=" +
          paymentStatus,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await TokenManager.get()}`,
          },
        }
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
