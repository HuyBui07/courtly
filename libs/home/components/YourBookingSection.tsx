import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Text as PaperText } from "react-native-paper";
import { Icon } from "react-native-paper";
import CourtView from "@/libs/commons/design-system/components/CourtView";
import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";
import { Link, router } from "expo-router";
import React from "react";
import { useGetUserBookings } from "../../my-booking/hooks/queries/useGetUserBookings";
import { Booking } from "../../my-booking/types/Booking";
import LoadingCircleForComponents from "@/libs/commons/design-system/components/LoadingCircleForComponents";

const YourBookingSection = () => {
  const { data: bookings, isLoading } = useGetUserBookings();

  const upcomingBookedCourts = bookings?.upcoming_bookings.filter(
    (booking: Booking) => booking.state === "Booked"
  );

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 32,
          paddingHorizontal: 12,
        }}
      >
        <PaperText variant="titleLarge" style={{ ...textStyles.title }}>
          Your Bookings
        </PaperText>

        <Link href="/(protected)/booking">
          <PaperText style={{ ...textStyles.body, color: colors.primary }}>
            Click for all {">>>"}
          </PaperText>
        </Link>
      </View>

      {isLoading && <LoadingCircleForComponents />}

      {upcomingBookedCourts?.length === 0 && (
        <TouchableOpacity
          onPress={() => router.push("/(protected)/booking")}
          style={{
            marginTop: 16,
            height: 60,
            width: "50%",
            marginLeft: 16,
            backgroundColor: colors.primary,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon source="plus" size={20} color="white" />
          <PaperText
            variant="bodyMedium"
            style={{ ...textStyles.bodyBold, color: "white" }}
          >
            Book a court
          </PaperText>
        </TouchableOpacity>
      )}

      {upcomingBookedCourts?.length > 0 && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 12,
            paddingBottom: 8,
          }}
          style={{ overflow: "visible" }}
        >
          {upcomingBookedCourts?.map((booking: Booking) => (
            <CourtView key={booking._id} booking={booking} />
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default YourBookingSection;
