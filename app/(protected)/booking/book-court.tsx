import { View, Text } from "react-native";
import React from "react";

import InformationBar from "@/libs/my-booking/components/InformationBar";
import BookingCalendar from "@/libs/my-booking/components/BookingCalendar";

const BookCourt = () => {
  return (
    <View
      style={{ flex: 1, gap: 16, paddingTop: 16, backgroundColor: "white" }}
    >
      <InformationBar />
      <BookingCalendar />
    </View>
  );
};

export default BookCourt;
