import { View, Text } from "react-native";
import React from "react";
import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";

const DateBreakline = ({ date }: { date: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
        gap: 10,
      }}
    >
      <View
        style={{
          height: 1,
          backgroundColor: "#ccc",
          flex: 1,
        }}
      />
      <Text
        style={{
          ...textStyles.body,
          fontSize: 12,

          textAlign: "center",
          marginVertical: 10,
          color: colors.lightGray,
        }}
      >
        {date}
      </Text>
      <View
        style={{
          height: 1,
          backgroundColor: "#ccc",
          flex: 1,
        }}
      />
    </View>
  );
};

export default DateBreakline;
