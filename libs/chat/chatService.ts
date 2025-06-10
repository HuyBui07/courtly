import { firebase } from "@react-native-firebase/database";

const reference = firebase
  .app()
  .database(
    "https://console.firebase.google.com/u/1/project/courtly-5e320/database/courtly-5e320-default-rtdb/data/~2F?fb_gclid=Cj0KCQjwjJrCBhCXARIsAI5x66U9sw0EETpmHEcLUaz5djfp3zR6cEHlBvOCOkzAtT7RwGTVKZoYbPsaAm1dEALw_wcB"
  );

export default reference;
