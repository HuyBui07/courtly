import { useQuery } from "@tanstack/react-query";
import PickupService from "../../services/PickupService";

export const useGetPickupDetails = (bookingID: string) => {
  return useQuery({
    queryKey: ["pickupDetails", bookingID],
    queryFn: () => PickupService.getPickupDetails(bookingID),
  });
};