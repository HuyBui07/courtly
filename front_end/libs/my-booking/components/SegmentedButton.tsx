import { useState } from "react";

import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import { View, Text, StyleSheet } from "react-native";

const SegmentedButton = () => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const buttonWidth = dimensions.width / 2;

  return (
    <View
      style={{
        flexDirection: "row",
        height: 80,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
        marginTop: 32,
        paddingHorizontal: 4,
        gap: 16,
        borderRadius: 50,
        elevation: 4,
        backgroundColor: "white",
      }}
    >
      <View style={styles.button}>
        <Text style={{ ...textStyles.title, ...styles.text }}>Upcoming</Text>
      </View>

      <View style={styles.button}>
        <Text style={{ ...textStyles.title, ...styles.text }}>Past</Text>
      </View>
    </View>
  );
};

export default SegmentedButton;

const styles = StyleSheet.create({
  container: {},

  button: {
    width: "45%",
    height: 60,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
