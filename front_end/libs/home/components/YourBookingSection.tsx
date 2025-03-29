import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import CourtView from "@/libs/commons/design-system/components/CourtView";
import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";

const YourBookingSection = () => {
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
          Your Bookings
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
        <CourtView />
        <CourtView />
        <CourtView />
      </ScrollView>
    </>
  );
};

export default YourBookingSection;
