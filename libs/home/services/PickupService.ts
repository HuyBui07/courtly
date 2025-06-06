import { TokenManager } from "@/libs/store/persistStore";
import { JOIN_PICKUP_URL, PICKUP_URL } from "../constants";

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
};

export default PickupService;