import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../libs/commons/design-system/colors";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarItemStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
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
        },
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
        name="shop"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="shopping-cart" color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="friends"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="group" color={color} />
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
