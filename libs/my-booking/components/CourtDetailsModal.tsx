import { Text, TouchableOpacity, View } from "react-native";
import { Button, Icon, IconButton } from "react-native-paper";

import Modal from "@/libs/commons/design-system/components/Modal";
import { InformationLine } from "./InformationLine";

import { textStyles } from "@/libs/commons/design-system/styles";
import {
  CourtDetailsModalController,
  useCourtDetailsModalStore,
} from "@/libs/commons/stores/useCourtDetailsModalStore";
import { colors } from "@/libs/commons/design-system/colors";
import { router } from "expo-router";

export const CourtDetailsModal = () => {
  const { isVisible, details } = useCourtDetailsModalStore();
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={CourtDetailsModalController.hide}
      containerStyle={{ width: "80%", paddingVertical: 32 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <Text style={textStyles.titleSmall}>Details</Text>
        <Icon source="file-document-outline" size={24} />
      </View>
      <View style={{ alignItems: "flex-start", width: "100%", gap: 8 }}>
        <InformationLine title="Court" value={details.court} />
        <InformationLine title="Date" value={details.date} />
        <InformationLine title="Time" value={details.time} />
        <InformationLine title="Duration" value={details.duration} />
        <InformationLine title="Price" value={details.price} />
        <InformationLine title="Status" value={details.status} />
        {details.additionalServices && (
          <InformationLine
            title="Additional Services"
            value={details.additionalServices
              .map((service) => service.service_id + " x " + service.quantity)
              .join(", ")}
          />
        )}
      </View>

      <View style={{ gap: 16, flexDirection: "row", width: "100%" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("pick up");
          }}
          style={{
            marginTop: 16,
            height: 50,
            flex: 1,
            backgroundColor: colors.primary,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon source="account-plus" size={20} color="white" />
          <Text style={{ ...textStyles.bodyBold, color: "white" }}>
            Pick up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={details.onCancel}
          disabled={!details.onCancel}
          style={{
            marginTop: 16,
            height: 50,
            flex: 1,
            backgroundColor: "red",
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon source="close" size={20} color="white" />
          <Text style={{ ...textStyles.bodyBold, color: "white" }}>
            Cancell
          </Text>
        </TouchableOpacity>
      </View>

      <IconButton
        icon="close"
        size={24}
        onPress={CourtDetailsModalController.hide}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
        }}
      />
    </Modal>
  );
};
