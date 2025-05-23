import { GET_USER_BOOKINGS_URL, GET_ALL_BOOKED_COURT_ON_SPECIFIC_DATE_URL } from "../constants";

import { TokenManager } from "@/libs/store/persistStore";

export const BookingService = {
  getUserBookings: async () => {
    try {
      const response = await fetch(GET_USER_BOOKINGS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await TokenManager.get()}`,
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
      const response = await fetch(GET_ALL_BOOKED_COURT_ON_SPECIFIC_DATE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await TokenManager.get()}`,
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
};
