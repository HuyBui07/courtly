import { GET_PERSONAL_DATA_URL, LOGIN_URL, LOGOUT_URL, SIGNUP_URL } from "../constants";
import { TokenManager } from "@/libs/store/persistStore";

interface LoginPayload {
  email: string;
  pass: string;
}

interface SignupPayload {
  email: string;
  contactNumber: string;  
  pass: string;
}

export const AuthService = {
  login: async (payload: LoginPayload) => {
    try {
      console.log("Login payload:", payload);
      console.log("FCM Token:", await TokenManager.getFCMToken());
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          pass: payload.pass,
          fcmToken: await TokenManager.getFCMToken(),
        }),
      });

      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }

      const data = await response.json();
      if (data.token) {
        TokenManager.set(data.token);
      } else {
        throw new Error("No access token received");
      }
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  signup: async (payload: SignupPayload) => {
    try {
      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          contactNumber: payload.contactNumber,
          pass: payload.pass,
          fcmToken: await TokenManager.getFCMToken(),
        }),
      });

      if (!response.ok) {
        const errorText = (await response.text()).trim();
        throw new Error(errorText);
      }

      const data = await response.json();
      if (data.token) {
        TokenManager.set(data.token);
      } else {
        throw new Error("No access token received");
      }
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  logout: async () => {},
  getPersonalData: async () => {
    try {
      const response = await fetch(GET_PERSONAL_DATA_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await TokenManager.get()}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch personal data");
      }
      return response.json();
    } catch (error) {
      throw new Error("Failed to fetch personal data");
    }
  },
};
