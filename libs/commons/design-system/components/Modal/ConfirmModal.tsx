import React, { useCallback } from "react"

import { View, Text, StyleSheet } from "react-native"
import { Button, IconButton } from "react-native-paper"

import Modal from "../Modal"
import { useConfirmModalStore } from "@/libs/store"

const ConfirmModal = () => {
  const { illustrator, title, message, isVisible, onConfirm, onCancel } =
    useConfirmModalStore()

  const getIllustrator = () => {
    switch (illustrator) {
      case "logout":
        return (
          <IconButton
            icon="logout"
            containerColor="#FFEBEE"
            iconColor="#F44336"
            style={{ borderRadius: 8 }}
          />
        )
      case "delete":
        return (
          <IconButton
            icon="trash-can-outline"
            containerColor="#FFEBEE"
            iconColor="#F44336"
            style={{ borderRadius: 8 }}
          />
        )
      default:
        return null
    }
  }

  return (
    <Modal
      containerStyle={{ width: "80%", paddingVertical: 24, gap: 8 }}
      isVisible={isVisible}>
      {getIllustrator()}
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 8 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 16, opacity: 0.5 }}>{message}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 32,
        }}>
        <Button
          mode="outlined"
          onPress={onCancel}
          textColor="#000"
          style={{ flex: 1, marginRight: 8, borderRadius: 8 }}>
          Hủy
        </Button>
        <Button
          mode="contained"
          onPress={onConfirm}
          buttonColor="#208345"
          style={{ flex: 1, borderRadius: 8 }}>
          Xác nhận
        </Button>
      </View>
    </Modal>
  )
}

export default ConfirmModal
