import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Animated, {
  LinearTransition,
  StretchInY,
  StretchOutY,
} from "react-native-reanimated";

import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";
import { AnimatedTouchableOpacity } from "@/libs/commons/design-system/components/AnimatedComponents";

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
      <Text style={{ ...textStyles.bodyBold }}>{value}</Text>
    </View>
  );
};

const StateText = ({ state }: { state: string }) => {
  const color = state === "Approved" ? colors.primary : "red";

  return (
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
          ...textStyles.body,
          marginRight: 4,
          color: color,
        }}
      >
        {state}
      </Text>
      <MaterialCommunityIcons
        name={
          state === "Approved" ? "check-circle-outline" : "close-circle-outline"
        }
        size={20}
        color={color}
      />
    </View>
  );
};

const CalendarComponent = () => {
  const [isExtended, setIsExtended] = useState(false);

  return (
    <AnimatedTouchableOpacity
      layout={LinearTransition.springify()}
      onPress={() => setIsExtended(!isExtended)}
      style={styles.container}
    >
      <StateText state="Cancelled" />

      <InformationLine title="Court" value="Court 1" />
      <InformationLine title="Date" value="29/03/2025" />
      <InformationLine title="Time" value="10:00 - 11:00" />

      {isExtended && (
        <Animated.View
          style={{
            flexDirection: "row",
            gap: 8,
            marginVertical: 8,
            justifyContent: "space-between",
          }}
          entering={StretchInY}
          exiting={StretchOutY}
        >
          <Button
            mode="outlined"
            labelStyle={{ fontWeight: "bold" }}
            style={{
              width: "50%",
              borderRadius: 12,
              borderColor: colors.primary,
            }}
          >
            Details
          </Button>
          <Button
            mode="contained"
            buttonColor="red"
            textColor="white"
            labelStyle={{ fontWeight: "bold" }}
            style={{ width: "50%", borderRadius: 12 }}
          >
            Cancell
          </Button>
        </Animated.View>
      )}
    </AnimatedTouchableOpacity>
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
