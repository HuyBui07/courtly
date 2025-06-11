import { useMutation } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";
import { queryClient } from "@/libs/commons/utils";
import { router } from "expo-router";

type PaymentSuccessParams = {
  tournamentId: string;
  paymentStatus: string;
};

export const useTournamentPaymentSuccess = () => {
  return useMutation({
    mutationFn: (params: PaymentSuccessParams) => 
      BookingService.tournamentPaymentSuccess(params.tournamentId, params.paymentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      setTimeout(() => {
        router.back();
      }, 4000);
    },
    onError: (error) => {
      console.error("Payment failed:", error);
    },
  });
};
