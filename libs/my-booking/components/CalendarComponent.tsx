import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";

const InformationLine = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Text style={[textStyles.body, { marginRight: 16 }]}>{title}:</Text>
      <Text style={{ ...textStyles.body, fontWeight: "bold" }}>{value}</Text>
    </View>
  );
};

const StateText = ({ state }: { state: string }) => {
  const color = state === "Approved" ? colors.primary : "red";

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(color, true)}
        onPress={() => {}}
    >
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 8,
          right: 16,
          opacity: 0.5,
        }}
      >
        <Text
          style={{
            marginRight: 4,
            color: color,
          }}
        >
          {state}
        </Text>
        <MaterialCommunityIcons
          name={
            state === "Approved"
              ? "check-circle-outline"
              : "close-circle-outline"
          }
          size={20}
          color={color}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

const CalendarComponent = () => {
  return (
    <View style={styles.container}>
      <StateText state="Cancelled" />

      <InformationLine title="Court" value="Court 1" />
      <InformationLine title="Date" value="29/03/2025" />
      <InformationLine title="Time" value="10:00 - 11:00" />
    </View>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    elevation: 4,
    borderRadius: 24,
    padding: 16,
    gap: 8,
  },
});
