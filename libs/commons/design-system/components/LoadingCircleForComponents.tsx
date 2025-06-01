import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const LoadingCircleForComponents = () => {
  return (
    <View style={[styles.container, { display: "flex" }]}>
      <LottieView
        source={require("@/assets/gifs/loading.json")}
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

export default LoadingCircleForComponents;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
