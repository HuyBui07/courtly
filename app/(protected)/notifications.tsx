// screens/NotificationsScreen.tsx

import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, useTheme, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useNotifications } from "@/libs/store/useNotifications";

const tabs = ["Tất cả", "Ưu đãi", "Cập nhật"];

const NotificationsScreen = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("Tất cả");
  const { notifications } = useNotifications() as any;

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 12,
      }}
    >
      <Avatar.Icon size={40} icon="bell" style={{ backgroundColor: theme.colors.primary }} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
          {item.title}
        </Text>
        <Text variant="bodyMedium" style={{ color: "#666" }}>
          {item.body}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text
          variant="headlineSmall"
          style={{ marginLeft: 16, fontWeight: "bold" }}
        >
          Notifications
        </Text>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? theme.colors.primary : "#f0f0f0",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              marginRight: 8,
            }}
          >
            <Text
              style={{
                color: activeTab === tab ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notification list */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationsScreen;
