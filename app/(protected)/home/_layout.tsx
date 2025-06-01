import { Stack } from "expo-router";
import Header from "@/libs/my-booking/components/Header";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ navigation }) => {
          return <Header navigation={navigation} title="Tournament" />;
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="tournament" />
    </Stack>
  );
}