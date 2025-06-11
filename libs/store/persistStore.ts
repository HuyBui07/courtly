import messaging from "@react-native-firebase/messaging";
import { storage } from "./storage";

const getToken = async () => {
  const token = await messaging().getToken();
  return token;
}

export const TokenManager = {
  accessToken: undefined as string | undefined,
  fcmToken: undefined as string | undefined,

  async get() {
    if (!this.accessToken) {
      this.accessToken = storage.getString("accessToken")
    }
    return this.accessToken
  },

  async set(token: string) {
    this.accessToken = token
    storage.set("accessToken", token)},

  async clear() {
    this.accessToken = undefined
    storage.delete("accessToken")
  },

  async getFCMToken() {
    if (!this.fcmToken) {
      this.fcmToken = storage.getString("fcmToken")
    }
    if (!this.fcmToken) {
      this.fcmToken = await getToken();
    }
    console.log("FCM Token:", this.fcmToken)
    return this.fcmToken
  },
  
  async setFCMToken(token: string) {
    this.fcmToken = token
    storage.set("fcmToken", token)
  },

  async clearFCMToken() {
    this.fcmToken = undefined
    storage.delete("fcmToken")
  },
}
