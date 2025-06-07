import { TokenManager } from "@/libs/store/persistStore";
import { GET_USER_INFO_BY_ID_URL, JOIN_PICKUP_URL, PICKUP_URL, GET_PICKUP_DETAILS_URL } from "../constants";

const PickupService = {
  getAllPickups: async () => {
    try {
      const response = await fetch(PICKUP_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch pickups");
      }
      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch pickups");
    }
  },
  joinPickup: async (pickupID: string) => {
    try {
      const response = await fetch(JOIN_PICKUP_URL + "?pickup_id=" + pickupID, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to join pickup");
      }
      return response.json();
    } catch (error) {
      throw new Error("Failed to join pickup");
    }
  },
  getUserInfoByID: async (userID: string) => {
    try {
      const response = await fetch(GET_USER_INFO_BY_ID_URL + "?user_id=" + userID, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch user info");
    }
  },
  getPickupDetails: async (bookingID: string) => {
    try {
      const response = await fetch(GET_PICKUP_DETAILS_URL + "?booking_id=" + bookingID, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch pickup details");
      }
      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch pickup details");
    }
  },
};

export default PickupService;