import { useEffect } from "react";
import { PermissionsAndroid, View } from "react-native";
import { Stack } from "expo-router";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from "react-native-paper";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { QueryClientProvider } from "@tanstack/react-query";
import { enableLayoutAnimations } from "react-native-reanimated";

import NotificationModal from "@/libs/commons/design-system/components/Modal/NotificationModal";
import { CourtDetailsModal } from "@/libs/my-booking/components/CourtDetailsModal";
import LoadingCircle from "@/libs/commons/design-system/components/LoadingCircle";
import { queryClient } from "@/libs/commons/utils";
import { PickupDetailsModal } from "@/libs/home/components/PickupDetailsModal";
import messaging from "@react-native-firebase/messaging";
import { useNotifications } from "@/libs/store/useNotifications";

enableLayoutAnimations(true);

const fontConfig = {
  fontFamily: "Poppins",
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00BE76",
    background: "#FFFFFF",
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default function RootLayout() {
  const { pushNotification } = useNotifications() as any;
  const requestUserPermission = async () => {
    const authStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (authStatus === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      pushNotification(remoteMessage.notification);
      console.log("Message received: ", remoteMessage.notification);
    });
    return unsubscribe;
  }, []);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(protected)" />
          </Stack>

          <NotificationModal />
          <CourtDetailsModal />
          <PickupDetailsModal />
          <LoadingCircle />
        </View>
      </PaperProvider>
    </QueryClientProvider>
  );
}
