import React from "react";

import { View, StyleSheet } from "react-native";
// import LottieView from "lottie-react-native"

import { useLoadingState } from "@/libs/commons/stores/useLoadingState";

export const LoadingCircle = () => {
  const { isLoading } = useLoadingState();

  return (
    isLoading && (
      <View
        style={[styles.container, { display: isLoading ? "flex" : "none" }]}
      >
        Loading...
        {/* <LottieView
          source={require("@/assets/gifs/loading.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        /> */}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    position: "absolute",
    zIndex: 9999,
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },
});

export default LoadingCircle;
