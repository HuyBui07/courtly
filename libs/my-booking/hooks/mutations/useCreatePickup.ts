import { useMutation } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";
import { queryClient } from "@/libs/commons/utils";
import { PickupMetadataPayload } from "../../types/PickupMetadataPayload";

export const useCreatePickup = () => {
  return useMutation({
    mutationFn: (payload: PickupMetadataPayload) => BookingService.createPickup(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
