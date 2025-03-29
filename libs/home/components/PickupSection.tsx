import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import PickupView from "@/libs/commons/design-system/components/PickupView";

const PickupSection = () => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 32,
          paddingHorizontal: 12,
        }}
      >
        <Text variant="titleLarge" style={{ ...textStyles.title }}>
          Pickup Games
        </Text>
        <Text
          variant="bodyMedium"
          style={{ ...textStyles.body, color: colors.primary }}
        >
          Click for all {">>>"}
        </Text>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 12,
          paddingBottom: 8,
        }}
        style={{ overflow: "visible" }}
      >
        <PickupView />
        <PickupView />
        <PickupView />
        <PickupView />
      </ScrollView>
    </>
  );
};

export default PickupSection;
