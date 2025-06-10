import { useMutation } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";
import { queryClient } from "@/libs/commons/utils";
import { CourtDetailsModalController } from "@/libs/commons/stores/useCourtDetailsModalStore";

export const useCancelPickup = () => {
  return useMutation({
    mutationFn: (pickupID: string) => BookingService.cancelPickup(pickupID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pickups"] });
      queryClient.invalidateQueries({ queryKey: ["user-upcoming-pickups"] });
      queryClient.invalidateQueries({ queryKey: ["user-upcoming-bookings"] });
      CourtDetailsModalController.hide();
    },
  });
};