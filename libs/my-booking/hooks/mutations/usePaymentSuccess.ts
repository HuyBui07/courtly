import { useMutation } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";
import { queryClient } from "@/libs/commons/utils";
import { router } from "expo-router";

type PaymentSuccessProps = {
  orderCode: string;
  paymentStatus: string;
};

export const usePaymentSuccess = () => {
  return useMutation({
    mutationFn: (props: PaymentSuccessProps) =>
      BookingService.paymentSuccess(props.orderCode, props.paymentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setTimeout(() => {
        router.replace("/(protected)/booking");
      }, 4000);
    },
    onError: (error) => {
      console.error("Payment failed:", error);
    },
  });
};
