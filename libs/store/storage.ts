import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
  id: "courtly",
  encryptionKey: "courtly",
});