import { View, Text } from "react-native";

import { textStyles } from "@/libs/commons/design-system/styles";

export const InformationLine = ({
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
          pointerEvents: "box-none",
        }}
      >
        <Text style={[textStyles.body, { marginRight: 16 }]}>{title}:</Text>
        <Text style={{ ...textStyles.bodyBold }}>{value}</Text>
      </View>
    );
  };