import { useState, useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { textStyles } from "@/libs/commons/design-system/styles";

const FlipTimer = ({ seconds }: { seconds: number }) => {
  const [hours, setHours] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    setHours(Math.floor(seconds / 3600));
    setRemainingMinutes(Math.floor((seconds % 3600) / 60));
    setRemainingSeconds((seconds % 3600) % 60);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingSeconds === 0) {
        if (remainingMinutes === 0) {
          if (hours === 0) {
            clearInterval(interval);
          } else {
            setHours((prev) => prev - 1);
            setRemainingMinutes(59);
            setRemainingSeconds(59);
          }
        } else {
          setRemainingMinutes((prev) => prev - 1);
          setRemainingSeconds(59);
        }
      } else {
        setRemainingSeconds((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours, remainingMinutes, remainingSeconds]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "auto",
        marginBottom: 16,
        gap: 8,
      }}
    >
      <View style={styles.container}>
        <Text
          style={{ ...textStyles.body, color: "white", fontWeight: "bold" }}
        >
          {hours}
        </Text>
      </View>
      <Text style={styles.colon}>:</Text>
      <View style={styles.container}>
        <Text
          style={{ ...textStyles.body, color: "white", fontWeight: "bold" }}
        >
          {remainingMinutes}
        </Text>
      </View>
      <Text style={styles.colon}>:</Text>
      <View style={styles.container}>
        <Text
          style={{ ...textStyles.body, color: "white", fontWeight: "bold" }}
        >
          {remainingSeconds}
        </Text>
      </View>
    </View>
  );
};

export default FlipTimer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 8,
    color: "white",
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: "white",
  },

  colon: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
