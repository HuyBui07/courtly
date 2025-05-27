import { Text, View } from "react-native";
import { Button, Icon, IconButton } from "react-native-paper";

import Modal from "@/libs/commons/design-system/components/Modal";
import { InformationLine } from "./InformationLine";

import { textStyles } from "@/libs/commons/design-system/styles";
import {
  CourtDetailsModalController,
  useCourtDetailsModalStore,
} from "@/libs/commons/stores/useCourtDetailsModalStore";

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
