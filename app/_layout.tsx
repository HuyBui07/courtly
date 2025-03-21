import { View } from "react-native";
import { Stack } from "expo-router";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00BE76",
    background: "#FFFFFF",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(protected)" />
        </Stack>
      </View>
    </PaperProvider>
  );
}
