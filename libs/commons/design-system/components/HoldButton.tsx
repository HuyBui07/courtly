import {
  Pressable,
  Text,
  Animated,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import { colors } from "../colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Tournament } from "@/libs/home/models/TournamentModel";

const HoldButton = ({ tournament }: { tournament: Tournament }) => {
  const [buttonText, setButtonText] = useState("Giữ để tham gia");
  const [isReady, setIsReady] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");

  const handleLongPress = () => {
    setButtonText("Tham gia!!!");
    setIsReady(true);
    router.push(
      `/home/tournament/check-out?tournament=${encodeURIComponent(
        JSON.stringify(tournament)
      )}`
    );
  };

  const handlePressIn = () => {
    Animated.timing(progressAnim, {
      toValue: width - 40, // Subtract padding
      duration: 1000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        handleLongPress();
      }
    });
  };

  const handlePressOut = () => {
    progressAnim.setValue(0);
    setButtonText("Giữ để tham gia");
    setIsReady(false);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        {
          opacity: tournament?.is_register ? 0.5 : 1,
          backgroundColor: tournament?.is_register ? "gray" : colors.primary,
        },
      ]}
      disabled={tournament?.is_register}
    >
      {tournament?.is_register ? (
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Đã tham gia</Text>
        </View>
      ) : (
        <View style={styles.buttonContent}>
          <MaterialIcons
            name={isReady ? "check-circle" : "touch-app"}
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>{buttonText}</Text>
        </View>
      )}
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progressAnim,
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default HoldButton;
