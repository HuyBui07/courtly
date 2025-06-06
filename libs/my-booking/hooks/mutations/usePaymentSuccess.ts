import { useMutation } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";
import { queryClient } from "@/libs/commons/utils";
import { router } from "expo-router";

export const usePaymentSuccess = (orderCode: string, paymentStatus: string) => {
  return useMutation({
    mutationFn: () => BookingService.paymentSuccess(orderCode, paymentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setTimeout(() => {
        router.replace("/(protected)/booking");
      }, 3000);
    },
    onError: (error) => {
      console.error("Payment failed:", error);
    },
  });
};
