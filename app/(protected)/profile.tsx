import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { queryClient } from "@/libs/commons/utils";

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Surendhar</Text>
          <Text style={styles.email}>Surendharpv01@gmail.com</Text>
        </View>
      </View>

      {/* Menu List */}
      <View style={styles.menuContainer}>
        <MenuItem icon="person" label="Account" />
        <MenuItem icon="calendar" label="Your Booking" />
        <MenuItem
          icon="money-bill-wave"
          label="Refunds"
          iconType="FontAwesome5"
        />
        <MenuItem icon="bookmark" label="Favourite Venues" />
        <MenuItem
          icon="support-agent"
          label="Support"
          iconType="MaterialIcons"
        />
        <MenuItem icon="lock" label="Privacy Policy" />
        <MenuItem icon="shield-checkmark" label="Terms of use" />
        <MenuItem
          icon="log-out"
          label="Logout"
          color="red"
          onClick={() => {
            queryClient.clear();
            router.dismissTo("/(auth)");
          }}
        />
      </View>

      {/* Bottom Navigation
      <View style={styles.bottomNav}>
        <NavItem icon="home" label="Home" />
        <NavItem icon="football" label="Turf" />
        <NavItem icon="clipboard" label="Booking" />
        <NavItem icon="heart" label="Favorites" />
        <NavItem icon="person" label="Profile" active />
      </View> */}
    </View>
  );
};

// Component hiển thị từng mục menu
const MenuItem = ({
  icon,
  label,
  color = "green",
  iconType = "Ionicons",
  onClick,
}) => {
  const IconComponent =
    iconType === "FontAwesome5"
      ? FontAwesome5
      : iconType === "MaterialIcons"
      ? MaterialIcons
      : Ionicons;

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onClick}>
      <IconComponent name={icon} size={22} color={color} />
      <Text style={[styles.menuText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

// Component Navigation dưới cùng
const NavItem = ({ icon, label, active = false }) => {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name={icon} size={24} color={active ? "green" : "black"} />
      <Text style={[styles.navText, active && { color: "green" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#D0F5D6",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  menuContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    color: "black",
  },
});

export default ProfileScreen;
