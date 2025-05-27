import { useMutation } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";
import { NotificationModalController } from "@/libs/commons/stores/useNotificationModalStore";
import { queryClient } from "@/libs/commons/utils";
import { LoadingStateController } from "@/libs/commons/stores/useLoadingState";

export const useCancelBookingState = () => {
  return useMutation({
    mutationKey: ["cancelBookingState"],
    mutationFn: BookingService.cancelBooking,
    onMutate: () => {
      LoadingStateController.setLoading(true);
    },
    onSuccess: () => {
      LoadingStateController.setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err: any) => {
      LoadingStateController.setLoading(false);
      NotificationModalController.show({
        title: "Hủy đặt lịch thất bại", 
        message: err.message,
        type: "error",
      });
    },
  });
};