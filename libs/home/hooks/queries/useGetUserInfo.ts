import { useQuery } from "@tanstack/react-query";
import PickupService from "../../services/PickupService";

export const useGetUserInfo = (userID: string) => {
  return useQuery({
    queryKey: ["userInfo", userID],
    queryFn: () => PickupService.getUserInfoByID(userID),
  });
};