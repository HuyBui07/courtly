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
import { Booking } from "../types/Booking";
import { formatDate } from "@/libs/commons/utils";

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
  const color = state === "Booked" ? colors.primary : "red";

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
            state === "Booked" ? "check-circle-outline" : "close-circle-outline"
        }
        size={20}
        color={color}
      />
    </View>
  );
};

const formatTime = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const formatTime = (date: Date) => {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  return `${formatTime(startDate)} - ${formatTime(endDate)}`;
};

const CalendarComponent = ({ booking }: { booking: Booking }) => {
  const [isExtended, setIsExtended] = useState(false);

  const formattedDate = formatDate(booking.start_time);
  const formattedTime = formatTime(booking.start_time, booking.end_time);
  
  const isPast = new Date(booking.end_time) < new Date();

  return (  
    <AnimatedTouchableOpacity
      layout={LinearTransition.springify()}
      onPress={() => setIsExtended(!isExtended)}
      style={[
        styles.container,
        isPast && { backgroundColor: "#F5F5F5" }
      ]}
    >
      {!isPast && <StateText state={booking.state} />}

      <InformationLine title="Court" value={booking.court_id.toString()} />
      <InformationLine title="Date" value={formattedDate} />
      <InformationLine title="Time" value={formattedTime} />

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
              width: isPast ? "100%" : "50%",
              borderRadius: 12,
              borderColor: colors.primary,
            }}
          >
            Details
          </Button>
          {!isPast && (
            <Button
              mode="contained"
              buttonColor="red"
              textColor="white"
              labelStyle={{ fontWeight: "bold" }}
              style={{ width: "50%", borderRadius: 12 }}
            >
              Cancell
            </Button>
          )}
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
