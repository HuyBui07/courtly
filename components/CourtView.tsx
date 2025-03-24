import { View } from "react-native";
import { Text } from "react-native-paper";

// design system
import { textVariants } from "@/libs/design-system/text-variants";

const InformationLine = ({
  title,
  value,
}: {
  title: String;
  value: String;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
      }}
    >
      <Text variant="bodyMedium">{title}:</Text>
      <Text variant="bodyMedium">{value}</Text>
    </View>
  );
};

const CourtView = () => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        padding: 12,
        marginTop: 16,
      }}
    >
      <InformationLine title="Court" value="Court 1" />
      <InformationLine title="Time" value="08:00 - 09:00" />
      <InformationLine title="Date" value="Today" />
    </View>
  );
};

export default CourtView;
