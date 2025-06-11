import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/libs/auth/services/AuthService";

export const useGetPersonalData = () => {
  return useQuery({
    queryKey: ["personalData"],
    queryFn: AuthService.getPersonalData,
  });
};