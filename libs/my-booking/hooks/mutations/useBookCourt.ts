import { useMutation } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";
import { BookingOrder } from "../../types/BookingOrder";
import { queryClient } from "@/libs/commons/utils";
import { NotificationModalController } from "@/libs/commons/stores/useNotificationModalStore";
import { router } from "expo-router";

export const useBookCourt = () => {
  return useMutation({
    mutationKey: ["bookCourt"],
    mutationFn: BookingService.bookCourt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
        router.replace("/(protected)/booking/check-out");
    },
    onError: (err: any) => {
      NotificationModalController.show({
        title: "Đặt lịch thất bại",
        message: err.message,
        type: "error",
      });
    },
  });
};
