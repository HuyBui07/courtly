import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";

const InformationBar = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.colorBox,
          backgroundColor: "white",
        }}
      ></View>
      <Text style={{ ...textStyles.bodySmall, marginRight: 10 }}>Empty</Text>

      <View
        style={{
          ...styles.colorBox,
          backgroundColor: colors.primary,
        }}
      ></View>
      <Text style={{ ...textStyles.bodySmall, marginRight: 10 }}>Selected</Text>

      <View
        style={{
          ...styles.colorBox,
          backgroundColor: "red",
        }}
      ></View>
      <Text style={{ ...textStyles.bodySmall, marginRight: 10 }}>Booked</Text>

      <Text
        style={{
          ...textStyles.bodyBold,
          marginLeft: "auto",
          color: colors.primary,
          textDecorationLine: "underline",
        }}
      >
        Rent Price
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 12,
    alignItems: "center",
  },
  colorBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    marginRight: 5,
    borderWidth: 0.5,
  },
});

export default InformationBar;
