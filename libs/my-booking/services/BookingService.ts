import {
  GET_USER_BOOKINGS_URL,
  GET_ALL_BOOKED_COURT_ON_SPECIFIC_DATE_URL,
  BOOK_COURT_URL,
  CANCEL_BOOKING_URL,
  PAYMENT_SUCCESS_URL,
  GET_USER_UPCOMING_PICKUPS_URL,
  CREATE_PICKUP_URL,
  GET_PICKUP_PARTICIPATED_STATE_URL,
  CANCEL_PICKUP_URL,
  TOURNAMENT_PAYMENT_SUCCESS_URL,
} from "../constants";

import { TokenManager } from "@/libs/store/persistStore";
import { BookingOrder } from "../types/BookingOrder";
import { PickupMetadataPayload } from "../types/PickupMetadataPayload";

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
    console.log("orderCode", orderCode);
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
  tournamentPaymentSuccess: async (tournamentId: string, paymentStatus: string) => {
    console.log("tournamentId", tournamentId);
    console.log("paymentStatus", paymentStatus);
    try {
      const response = await fetch(TOURNAMENT_PAYMENT_SUCCESS_URL + "?tournament_id=" + tournamentId + "&paymentStatus=" + paymentStatus, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getUserUpcomingPickups: async () => {
    try {
      const response = await fetch(GET_USER_UPCOMING_PICKUPS_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }
      return response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  createPickup: async (payload: PickupMetadataPayload) => {
    try {
      const response = await fetch(CREATE_PICKUP_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }
      return response.text();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getPickupParticipatedState: async (bookingID: string) => {
    try {
      const response = await fetch(GET_PICKUP_PARTICIPATED_STATE_URL + "?booking_id=" + bookingID, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }
      return response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  cancelPickup: async (pickupID: string) => {
    try {
      console.log("pickupID", pickupID);
      const response = await fetch(CANCEL_PICKUP_URL + "?pickup_id=" + pickupID, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }
      return response.text();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
