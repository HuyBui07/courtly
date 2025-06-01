import React, { useEffect } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, StyleProp, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { colors } from "../colors";
interface CheckBoxProps {
  size: number;
  style?: StyleProp<any>;
  checked?: boolean;
  onPress?: () => void;
}

const CheckBox = (props: CheckBoxProps) => {
  const { size, style, checked, onPress } = props;

  const scale = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (checked) {
      scale.value = withSpring(1, { duration: 500 });
    } else {
      scale.value = withSpring(0, { duration: 300 });
    }
  }, [checked]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        checked && { backgroundColor: colors.primary },
      ]}
      onPress={onPress}
    >
      <Animated.View style={[animatedStyle]}>
        <AntDesign name="check" color="#fff" size={size - 2} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    alignSelf: "flex-start",
  },
});
