import { useMutation } from "@tanstack/react-query";
import PickupService from "../../services/PickupService";
import { queryClient } from "@/libs/commons/utils";
import { PickupDetailsModalController } from "../../store/usePickupDetailsModalStore";
import { LoadingStateController } from "@/libs/commons/stores/useLoadingState";

export const useJoinPickup = () => {
  return useMutation({
    mutationFn: (pickupId: string) => {
      LoadingStateController.setLoading(true);
      return PickupService.joinPickup(pickupId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pickups"] });
      queryClient.invalidateQueries({ queryKey: ["user-upcoming-pickups"] });
      LoadingStateController.setLoading(false);
      PickupDetailsModalController.hide();
    },
    onError: () => {
      LoadingStateController.setLoading(false);
    },
  });
};
