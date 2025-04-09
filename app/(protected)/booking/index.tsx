import { useState } from "react";

// components
import { ScrollView, View, ImageBackground } from "react-native";
import ActionButton from "@/libs/my-booking/components/ActionButton";
import Header from "@/libs/home/components/Header";
import SegmentedButton from "@/libs/my-booking/components/SegmentedButton";
import CalendarComponent from "@/libs/my-booking/components/CalendarComponent";

const Booking = () => {
  const [time, setTime] = useState("upcoming");

  // Action button
  const [isABExtended, setIsABExtended] = useState(true);
  const onScroll = ({ nativeEvent }: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsABExtended(currentScrollPosition <= 0);
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <Header headTitle="My Bookings" />

      <SegmentedButton />

      <ScrollView
        onScroll={onScroll}
        style={{ width: "100%", padding: 16 }}
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <CalendarComponent />
        <CalendarComponent />
       
      </ScrollView>

      <ActionButton isExtended={isABExtended} />
    </View>
  );
};

export default Booking;
