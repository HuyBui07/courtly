import { useMutation } from "@tanstack/react-query";

import { AuthService } from "../services";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      console.log("Login successful", data);
    },
  });
};
