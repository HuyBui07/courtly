import { useQuery } from "@tanstack/react-query";
import PickupService from "@/libs/home/services/PickupService";

export const useGetPickups = () => {
  return useQuery({
    queryKey: ["pickups"],
    queryFn: PickupService.getAllPickups,
  });
};