import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "react-native-paper";

import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";
import { Booking } from "../types/Booking";
import { formatDate } from "@/libs/commons/utils";
import { InformationLine } from "./InformationLine";
import { CourtDetailsModalController } from "@/libs/commons/stores/useCourtDetailsModalStore";
import { useCancelBookingState } from "../hooks/mutations/useCancelBookingState";
import { Pickup } from "../types";
import { useGetPickupParticipatedState } from "../hooks/queries/useGetPickupParticipatedState";
import { useCancelPickup } from "../hooks/mutations/useCancelPickup";

const StateText = ({ state }: { state: string }) => {
  const color = state === "Cancelled" ? "red" : colors.primary;

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
          state === "Cancelled"
            ? "close-circle-outline"
            : "check-circle-outline"
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

const CalendarComponent = ({ booking }: { booking: Booking | Pickup }) => {
  const { mutate: cancelBooking } = useCancelBookingState();
  const { mutate: cancelPickup } = useCancelPickup();
  const formattedDate = formatDate(booking.start_time);
  const formattedTime = formatTime(booking.start_time, booking.end_time);
  const { data: pickupParticipatedState } = useGetPickupParticipatedState(
    booking._id
  );
  
  const isPast =
    new Date(booking.end_time) <
    new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

  // if the pickup_id is in the booking, then the component is picked up and this user is not the host
  const isThisComponentPickedUp = "pickup_id" in booking;

  const showDetailsModal = () => {
    const startDate = new Date(booking.start_time);
    const endDate = new Date(booking.end_time);
    const durationHours =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    const price = durationHours * 80;

    CourtDetailsModalController.show({
      court_booking_id: booking._id,
      court: booking.court_id.toString(),
      date: formattedDate,
      time: formattedTime,
      duration: `${durationHours} hour${durationHours > 1 ? "s" : ""}`,
      price: price.toString() + ".000 VND",
      status: booking.state,
      additionalServices: booking.additional_services,
      isJoinable: !booking.allow_pickup,
      isPickedUp: isThisComponentPickedUp,
      onCancel: () => {
        if (isPast) return;
        if (isThisComponentPickedUp) {
          cancelPickup(booking.pickup_id as string);
        } else {
          cancelBooking(booking._id);
        }
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={showDetailsModal}
      disabled={booking.state !== "Booked" || isPast}
      style={[
        styles.container,
        (isPast || booking.state === "Cancelled") && {
          backgroundColor: "#F5F5F5",
        },
      ]}
    >
      {!isPast && (
        <StateText
          state={(() => {
            if (booking.state === "Cancelled") {
              return "Cancelled";
            }
            if (isThisComponentPickedUp) {
              return "You've picked up";
            } else if (booking?.allow_pickup) {
              return `Picking up ${
                pickupParticipatedState?.users?.length || 0
              } / ${pickupParticipatedState?.maximum_pickups}`;
            } else {
              return booking.state;
            }
          })()}
        />
      )}

      <InformationLine title="Court" value={booking.court_id.toString()} />
      <InformationLine title="Date" value={formattedDate} />
      <InformationLine title="Time" value={formattedTime} />
    </TouchableOpacity>
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
