import { Stack } from "expo-router";
import React from "react";
import { colors } from "@/libs/commons/design-system/colors";
import Header from "@/libs/commons/design-system/components/Header";
import { textStyles } from "@/libs/commons/design-system/styles";

export default function BookingLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: "#fff",
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book-court"
        options={{
          presentation: "modal",
          headerTitle: "Book a Court",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          header: () => <Header title="Book a Court" />,
          animationMatchesGesture: true,
        }}
      />
    </Stack>
  );
}
