import { View, Text } from "react-native";

import { textStyles } from "@/libs/commons/design-system/styles";

export const InformationLine = ({
  title,
  value,
  isVietnamese = false,
}: {
  title: string;
  value: string;
  isVietnamese?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        pointerEvents: "box-none",
        overflow: "hidden",
      }}
    >
      <Text style={[textStyles.body, { marginRight: 16 }]}>{title}:</Text>
      <Text
        style={
          isVietnamese
            ? { fontSize: 14, fontWeight: "bold" }
            : textStyles.bodyBold
        }
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
};
