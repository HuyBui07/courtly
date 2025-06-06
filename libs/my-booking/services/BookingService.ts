import {
  GET_USER_BOOKINGS_URL,
  GET_ALL_BOOKED_COURT_ON_SPECIFIC_DATE_URL,
  BOOK_COURT_URL,
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
  bookCourt: async (bookingOrder: BookingOrder[]) => {
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
};
