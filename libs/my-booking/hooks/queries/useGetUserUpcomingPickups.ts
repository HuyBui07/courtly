import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";

export const useGetUserUpcomingPickups = () => {
  return useQuery({
    queryKey: ["user-upcoming-pickups"],
    queryFn: BookingService.getUserUpcomingPickups,
  });
};