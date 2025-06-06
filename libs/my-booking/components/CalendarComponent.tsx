import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Animated, {
  LinearTransition,
} from "react-native-reanimated";

import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";
import { AnimatedTouchableOpacity } from "@/libs/commons/design-system/components/AnimatedComponents";
import { Booking } from "../types/Booking";
import { formatDate } from "@/libs/commons/utils";
import { InformationLine } from "./InformationLine";
import { CourtDetailsModalController } from "@/libs/commons/stores/useCourtDetailsModalStore";
import { useCancelBookingState } from "../hooks/mutations/useCancelBookingState";

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
        pointerEvents: "box-none",
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
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  return `${formatTime(startDate)} - ${formatTime(endDate)}`;
};

const CalendarComponent = ({ booking }: { booking: Booking }) => {
  const { mutate: cancelBooking } = useCancelBookingState();
  const formattedDate = formatDate(booking.start_time);
  const formattedTime = formatTime(booking.start_time, booking.end_time);

  const isPast = new Date(booking.end_time) < new Date();

  const showDetailsModal = () => {
    const startDate = new Date(booking.start_time);
    const endDate = new Date(booking.end_time);
    const durationHours =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    const price = durationHours * 80;

    CourtDetailsModalController.show({
      court: booking.court_id.toString(),
      date: formattedDate,
      time: formattedTime,
      duration: `${durationHours} hour${durationHours > 1 ? "s" : ""}`,
      price: price.toString() + ".000 VND",
      status: booking.state,
      additionalServices: booking.additional_services,
      onCancel: !isPast ? () => {
        cancelBooking(booking._id)
        CourtDetailsModalController.hide()
      } : undefined
    });
  };

  return (
    <AnimatedTouchableOpacity
      layout={LinearTransition.springify()}
      onPress={showDetailsModal}
      disabled={booking.state !== "Booked" || isPast}
      style={[
        styles.container,
        (isPast || booking.state === "Cancelled") && {
          backgroundColor: "#F5F5F5",
        },
      ]}
    >
      {!isPast && <StateText state={booking.state} />}

      <InformationLine title="Court" value={booking.court_id.toString()} />
      <InformationLine title="Date" value={formattedDate} />
      <InformationLine title="Time" value={formattedTime} />
    </AnimatedTouchableOpacity>
  );
};

export default React.memo(CalendarComponent);

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
