import { Stack } from "expo-router";
import Header from "@/libs/my-booking/components/Header";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ navigation, route }) => {
          const title =
            route.name === "book-court" ? "Book Court" : "Check Out";
          return <Header navigation={navigation} title={title} />;
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="book-court" />
      <Stack.Screen name="check-out" />
    </Stack>
  );
}
