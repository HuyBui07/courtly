import { View, StyleSheet, Text } from "react-native";
import { Icon, IconButton } from "react-native-paper";

import Modal from "@/libs/commons/design-system/components/Modal";
import {
  TournamentDetailsModalController,
  useTournamentDetailsModalStore,
} from "../store/useTournamentDetailsModalStore";
import { textStyles } from "@/libs/commons/design-system/styles/TextStyle";

const TournamentDetailsModal = () => {
  const { isVisible, details } = useTournamentDetailsModalStore();

  const startDate = new Date(details.period[0]).toLocaleDateString("vi-VN");
  const endDate = new Date(details.period[1]).toLocaleDateString("vi-VN");
  const formattedPeriod = `${startDate} - ${endDate}`;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={TournamentDetailsModalController.hide}
      containerStyle={{
        ...styles.modalContainer,
        borderColor: details.type === "single" ? "red" : "blue"
      }}
    >
      <View style={styles.headerContainer}>
        <Text style={textStyles.titleSmall}>Tournament Details</Text>
        <Icon source="file-document-outline" size={24} />
      </View>

      <View style={styles.detailsContainer}>
        <Text>
          <Text style={textStyles.bodyBold}>Name: </Text>
          <Text style={textStyles.body}>{details.name}</Text>
        </Text>
        <Text>
          <Text style={textStyles.bodyBold}>Description: </Text>
          <Text style={textStyles.body}>{details.description}</Text>
        </Text>
        <Text>
          <Text style={textStyles.bodyBold}>Type: </Text>
          <Text style={textStyles.body}>{details.type === "single" ? "Single" : "Double"}</Text>
        </Text>
        <Text>
          <Text style={textStyles.bodyBold}>Period: </Text>
          <Text style={textStyles.body}>{formattedPeriod}</Text>
        </Text>
        <Text>
          <Text style={textStyles.bodyBold}>Number of players: </Text>
          <Text style={textStyles.body}>{details.number_of_players} / {details.scale}</Text>
        </Text>
      </View>

      <IconButton
        icon="close"
        size={24}
        onPress={() => {
          TournamentDetailsModalController.hide();
        }}
        style={styles.closeButton}
      />
    </Modal>
  );
};

export default TournamentDetailsModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: "80%",
    paddingVertical: 40,
    borderWidth: 2,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
    justifyContent: "space-between",
  },
  detailsContainer: {
    alignItems: "flex-start",
    width: "100%",
    gap: 8,
  },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
