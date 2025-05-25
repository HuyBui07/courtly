import { useQuery } from "@tanstack/react-query";

import { BookingService } from "../services/BookingService";

export const useGetUserBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: BookingService.getUserBookings,
  });
};