import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../colors";
import { textStyles } from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CourtLine = ({
  court,
  duration,
}: {
  court: String;
  duration: String;
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        gap: 16
      }}
    >
      <Text style={{ ...textStyles.body, fontSize: 20, fontWeight: "bold" }}>
        {court}
      </Text>

      <Text style={{ ...textStyles.body }}>
        <MaterialCommunityIcons name="timer-sand" size={20} color="black" />{" "}
        {duration}
      </Text>
    </View>
  );
};

const CourtView = () => {
  return (
    <View
      style={{
        height: "auto",
        flexDirection: "row",
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        padding: 12,
        marginTop: 16,
        elevation: 4,
        gap: 24,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: colors.primary,
          borderRadius: 10,
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 24,
        }}
      >
        <Text
          variant="titleLarge"
          style={{ ...textStyles.title, color: "white" }}
        >
          Mon, 12
        </Text>

        <Text
          variant="bodyMedium"
          style={{ ...textStyles.body, color: "white" }}
        >
          10:00 AM
        </Text>
      </View>

      <CourtLine court="Court 1" duration="1 hour" />
    </View>
  );
};

export default CourtView;
