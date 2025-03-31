import { useState } from "react";

import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { Avatar } from "react-native-paper";

const SegmentedButton = () => {
  const [selected, setSelected] = useState("upcoming");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const buttonWidth = dimensions.width / 2;

  const onButtonLayout = (event: LayoutChangeEvent) => {
    setDimensions({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  };

  const buttonPositionX = useSharedValue(0);

  const handleClick = () => {
    setSelected((prev) => (prev === "upcoming" ? "past" : "upcoming"));
    buttonPositionX.value = withSpring(
      selected === "upcoming" ? buttonWidth : 0
    );
  };

  return (
    <View onLayout={onButtonLayout} style={styles.container}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: buttonWidth - 20,
            height: dimensions.height - 15,
            marginHorizontal: 10,
            backgroundColor: colors.primary,
            borderRadius: 50,
            zIndex: 0,
          },
          {
            transform: [
              {
                translateX: buttonPositionX,
              },
            ],
          },
        ]}
      ></Animated.View>

      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text
          style={[
            textStyles.title,
            styles.text,
            selected === "upcoming" && styles.selected,
          ]}
        >
          Upcoming
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text
          style={[
            textStyles.title,
            styles.text,
            selected === "past" && styles.selected,
          ]}
        >
          Past
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SegmentedButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    width: "90%",
    alignItems: "center",
    marginHorizontal: "auto",
    marginTop: 32,
    paddingHorizontal: 4,
    borderRadius: 50,
    elevation: 4,
    backgroundColor: "white",
  },

  button: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "black",
    opacity: 0.2,
    fontWeight: "bold",
    fontSize: 20,
    zIndex: 1,
  },

  selected: {
    color: "white",
    opacity: 1,
  },
});
