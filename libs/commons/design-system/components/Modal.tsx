import React from "react";

import { Pressable, StyleSheet, type ViewStyle } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

interface GlobalModalProps {
  containerStyle?: ViewStyle;
  children: React.ReactNode;
  isVisible: boolean;
  onBackdropPress?: () => void;
  entering?: typeof BounceIn;
  exiting?: typeof BounceOut;
  enteringDuration?: number;
  exitingDuration?: number;
}

const GLOBAL_MODAL_Z_INDEX = 10000;

const Modal: React.FC<GlobalModalProps> = (props) => {
  const enteringDuration = props.enteringDuration ?? 600;
  const exitingDuration = props.exitingDuration ?? 400;

  return (
    props.isVisible && (
      <Pressable
        onPress={props.onBackdropPress}
        onStartShouldSetResponder={() => false}
        style={[styles.backdrop]}
      >
        <Animated.View
          entering={props.entering ?? BounceIn.duration(enteringDuration)}
          exiting={props.exiting ?? BounceOut.duration(exitingDuration)}
          style={[styles.container, props.containerStyle]}
        >
          {props.children}
        </Animated.View>
      </Pressable>
    )
  );
};
const styles = StyleSheet.create({
  modal_wrapper: {
    margin: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: GLOBAL_MODAL_Z_INDEX,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: GLOBAL_MODAL_Z_INDEX + 1,
  },
});

export default Modal;
