import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Icon, IconButton } from "react-native-paper";

import Modal from "@/libs/commons/design-system/components/Modal";
import { InformationLine } from "@/libs/my-booking/components/InformationLine";

import { textStyles } from "@/libs/commons/design-system/styles";
import {
  PickupDetailsModalController,
  usePickupDetailsModalStore,
} from "@/libs/home/store/usePickupDetailsModalStore";
import { colors } from "@/libs/commons/design-system/colors";
import { useGetUserInfo } from "../hooks/queries/useGetUserInfo";
import { useGetPickupDetails } from "../hooks/queries/useGetPickupDetails";

export const PickupDetailsModal = () => {
  const { isVisible, details } = usePickupDetailsModalStore();
  const { data: userInfo } = useGetUserInfo(details.user_id);
  const { data: pickupDetails } = useGetPickupDetails(details.court_booking_id);
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={PickupDetailsModalController.hide}
      containerStyle={{
        width: "80%",
        paddingVertical: 32,
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          gap: 8,
          justifyContent: "space-between",
          marginHorizontal: "auto",
        }}
      >
        <Text style={textStyles.titleSmall}>Pickup Details</Text>
        <Icon source="account-group" size={24} />
      </View>

      <InformationLine
        title="Current Players"
        value={
          details.participant_ids
            ? details.participant_ids.length.toString()
            : "0" + " / " + details.maximum_pickup.toString()
        }
      />

      <InformationLine title="Level" value={details.pickup_level} />
      <InformationLine
        title="Date"
        value={
          pickupDetails?.date
            ? new Date(pickupDetails.date).toLocaleDateString("en-GB")
            : ""
        }
      />
      <InformationLine title="Time" value={pickupDetails?.time} />
      <InformationLine
        title="Duration"
        value={pickupDetails?.duration + " h"}
      />

      <View style={styles.messageContainer}>
        <View style={styles.bottomLeftCorner} />

        {/* Top Right Corner */}
        <View style={styles.topRightCorner} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
            style={styles.avatar}
          />
          <Text style={{ ...textStyles.body, fontWeight: "bold" }}>
            {userInfo?.name}
          </Text>
        </View>
        <Text style={{ ...textStyles.body }}>"{details.message}"</Text>
      </View>

      <View style={{ gap: 16, flexDirection: "row", width: "100%" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("join pickup");
          }}
          style={styles.joinButton}
        >
          <Icon source="account-plus" size={20} color="white" />
          <Text style={{ ...textStyles.bodyBold, color: "white" }}>
            Join Pickup
          </Text>
        </TouchableOpacity>
      </View>

      <IconButton
        icon="close"
        size={24}
        onPress={PickupDetailsModalController.hide}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  joinButton: {
    marginTop: 16,
    height: 50,
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  messageContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    gap: 16,
    backgroundColor: colors.superLightPrimary,
    padding: 24,
    paddingBottom: 28,
    position: "relative",
    borderRadius: 10,
    marginTop: 8,
  },
  topRightCorner: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  bottomLeftCorner: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 10,
    height: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
});
