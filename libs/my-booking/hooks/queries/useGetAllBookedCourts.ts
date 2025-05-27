import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../../services/BookingService";

export const useGetAllBookedCourts = (date: string) => {
  return useQuery({
    queryKey: ["getAllBookedCourts", date],
    queryFn: () => BookingService.getAllBookedCourtOnSpecificDate(date),
  });
};
