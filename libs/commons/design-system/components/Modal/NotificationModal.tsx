import React, { useCallback } from "react";

import { Text } from "react-native";
import { Button, IconButton } from "react-native-paper";

import Modal from "../Modal";
import { useNotificationModalStore } from "@/libs/commons/stores/useNotificationModalStore";

const NotificationModal = () => {
  const { isVisible, title, message, type } = useNotificationModalStore();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <IconButton
            icon="check"
            containerColor="#E8F5E9"
            iconColor="#4CAF50"
            style={{ borderRadius: 8 }}
          />
        );
      case "error":
        return (
          <IconButton
            icon="close"
            containerColor="#FFEBEE"
            iconColor="#F44336"
            style={{ borderRadius: 8 }}
          />
        );
      case "info":
        return (
          <IconButton
            icon="information"
            containerColor="#BBDEFB"
            iconColor="#64B5F6"
            style={{ borderRadius: 8 }}
          />
        );
      default:
        return "";
    }
  };

  return (
    <Modal isVisible={isVisible} containerStyle={{ width: "80%" }}>
      {getIcon(type)}
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 8 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 14, marginTop: 8, opacity: 0.5 }}>
        {message}
      </Text>
      <Button
        mode="contained"
        onPress={() => {
          useNotificationModalStore.setState({ isVisible: false });
        }}
        buttonColor="white"
        textColor="#000"
        style={{
          marginTop: 32,
          width: "100%",
          borderWidth: 0.2,
          borderColor: "#000",
        }}
      >
        Got it
      </Button>
    </Modal>
  );
};

export default NotificationModal;
