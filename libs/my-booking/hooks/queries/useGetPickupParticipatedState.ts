import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";

export const useGetPickupParticipatedState = (bookingID: string) => {
  return useQuery({
    queryKey: ["pickupParticipatedState", bookingID],
    queryFn: () => BookingService.getPickupParticipatedState(bookingID),
  });
};