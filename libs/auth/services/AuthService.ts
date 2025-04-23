import { LOGIN_URL } from "../constants";

interface LoginPayload {
  email: string;
  pass: string;
}

export const AuthService = {
  login: async (payload: LoginPayload) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: payload.email, pass: payload.pass }),
      });

      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  logout: async () => {
    // Perform logout logic here
  },
};
