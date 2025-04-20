import { Tabs, useSegments } from "expo-router";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../libs/commons/design-system/colors";
import Header from "@/libs/my-booking/components/Header";

export default function RootLayout() {
  const segments = useSegments();
  console.log("segments", segments);

  const hideTabBar = segments.some(
    (segment) => segment === "book-court" || segment === "check-out"
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarItemStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          position: "absolute",
          height: 60,
          marginBottom: 10,
          marginHorizontal: 10,
          borderRadius: 50,
          elevation: 2,
          borderStyle: "solid",
          borderWidth: 1,
          display: hideTabBar ? "none" : "flex",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="calendar" color={color} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="(booking)/book-court"
        options={{
          href: null,
          headerShown: true,
          // headerTitle: "Book a Court",
          // headerTitleStyle: {
          //   fontFamily: "Poppins-Bold",
          // },
          header: (props) => <Header title="Book a Court" />,
          tabBarStyle: {
            display: "none",
          },
          animation: "shift",
        }}
      />

      <Tabs.Screen
        name="(booking)/check-out"
        options={{
          href: null,
          headerShown: true,
          // headerTitle: "Book a Court",
          // headerTitleStyle: {
          //   fontFamily: "Poppins-Bold",
          // },
          header: () => <Header title="Check Out" />,
          tabBarStyle: {
            display: "none",
          },
          animation: "shift",
        }}
      /> */}

      {/* <Tabs.Screen
        name="shop"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="shopping-cart" color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
