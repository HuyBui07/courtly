import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Icon, Text, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { queryClient } from "@/libs/commons/utils";
import { TokenManager } from "@/libs/store/persistStore";
import { useNotifications } from "@/libs/store/useNotifications";
import { useGetPersonalData } from "@/libs/commons/hooks/useGetPersonalData";

const profileOptions = [
  { icon: "account", label: "Account" },
  { icon: "calendar-check", label: "Your Booking" },
  { icon: "cash-refund", label: "Refunds" },
  { icon: "heart-outline", label: "Favourite Venues" },
  { icon: "headset", label: "Support" },
  { icon: "lock", label: "Privacy Policy" },
  { icon: "shield-check", label: "Terms of use" },
];

const ProfileScreen = () => {
  const theme = useTheme();
  const { data: user } = useGetPersonalData();
  const name = user?.email.split("@")[0];

  const handleLogout = async () => {
    queryClient.clear();
    await TokenManager.clear();
    await TokenManager.clearFCMToken();
    (useNotifications as any).getState().clearNotifications();
    router.dismissTo("/(auth)");  
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          size={60}
        />
        <View style={{ marginLeft: 12 }}>
          <Text variant="titleMedium" style={styles.nameText}>
            {name}
          </Text>
          <Text variant="bodySmall" style={styles.emailText}>
            {user?.email}
          </Text>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionList}>
        {profileOptions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.optionItem}>
            <Icon source={item.icon} size={24} color={theme.colors.primary} />
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={[styles.optionItem, { marginTop: 12 }]}
          onPress={handleLogout}
        >
          <Icon source="logout" size={24} color="red" />
          <Text style={[styles.optionText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  nameText: {
    fontWeight: "bold",
  },
  emailText: {
    color: "#888",
  },
  optionList: {
    marginTop: 8,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
  },
});
