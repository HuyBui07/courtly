import { MMKV } from "react-native-mmkv"

const storage = new MMKV({
  id: "courtly",
  encryptionKey: "courtly",
})

export const TokenManager = {
  accessToken: undefined as string | undefined,

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
}
