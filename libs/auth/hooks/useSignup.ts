import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/AuthService";

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: AuthService.signup,
  });
};
