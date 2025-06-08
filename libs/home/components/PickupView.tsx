// components
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { textStyles } from "@/libs/commons/design-system/styles";
import PickupModel from "@/libs/home/models/PickupModel";
import { colors } from "@/libs/commons/design-system/colors";
import { Icon } from "react-native-paper";
import { useGetUserInfo } from "@/libs/home/hooks/queries/useGetUserInfo";
import { PickupDetailsModalController } from "@/libs/home/store/usePickupDetailsModalStore";
import { memo } from "react";

const PickupView = (pickup: PickupModel) => {
  const { data: userInfo } = useGetUserInfo(pickup.user_id);
  return (
    <TouchableOpacity
      onPress={() => PickupDetailsModalController.show(pickup)}
      style={styles.container}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
          style={styles.avatar}
        />
        <Text style={{ ...textStyles.body, fontWeight: "bold" }}>
          {userInfo?.name}
        </Text>
      </View>

      <Text style={{ ...textStyles.body, fontWeight: "bold" }}>
        Level: {pickup.pickup_level}
      </Text>

      <Text style={{ ...textStyles.body }}>
        "{pickup.message || "No message"}"
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Icon source="account-group" size={20} color={colors.primary} />
        <Text style={{ ...textStyles.body, fontWeight: "bold" }}>
          {pickup.participant_ids ? pickup.participant_ids.length : 0} /{" "}
          {pickup.maximum_pickup}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PickupView);

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    padding: 12,
    marginTop: 16,
    elevation: 4,
    gap: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
});
