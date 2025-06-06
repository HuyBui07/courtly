import { useCallback, useState } from "react";

// components
import { FlatList, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import ActionButton from "@/libs/my-booking/components/ActionButton";
import Header from "@/libs/home/components/Header";
import SegmentedButton from "@/libs/my-booking/components/SegmentedButton";
import CalendarComponent from "@/libs/my-booking/components/CalendarComponent";
import { useGetUserBookings } from "@/libs/my-booking/hooks/queries/useGetUserBookings";
import { Booking } from "@/libs/my-booking/types/Booking";
import LottieView from "lottie-react-native";
import { BOTTOM_TAB_BAR_HEIGHT } from "@/libs/commons/design-system/constants";

const BookingScreen = () => {
  const [time, setTime] = useState("upcoming");
  const { data: bookings, isLoading } = useGetUserBookings();
  // Action button
  const [isABExtended, setIsABExtended] = useState(true);
  const onScroll = useCallback(({ nativeEvent }: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsABExtended(currentScrollPosition <= 0);
  }, []);

  const renderBookings = () => {
    if (time === "upcoming") {
      return bookings?.upcoming_bookings;
    }
    return bookings?.past_bookings;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Header headTitle="My Bookings" />

      <SegmentedButton selected={time} setSelected={setTime} />

      {!isLoading && renderBookings()?.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("@/assets/gifs/empty.json")}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
            No bookings found
          </Text>
        </View>
      )}

      <FlatList
        onScroll={onScroll}
        // scrollEventThrottle={32}
        style={{
          flex: 1,
          marginTop: 16,
        }}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 16,
          flexGrow: 1,
          paddingBottom: BOTTOM_TAB_BAR_HEIGHT * 2 + 20,
        }}
        showsVerticalScrollIndicator={false}
        data={isLoading ? [] : renderBookings()}
        renderItem={({ item: booking }) => (
          <CalendarComponent
            key={booking.court_id + booking.start_time}
            booking={booking}
          />
        )}
        ListEmptyComponent={
          isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                source={require("@/assets/gifs/loading.json")}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
              />
            </View>
          ) : null
        }
      />

      <ActionButton isExtended={isABExtended} />
    </View>
  );
};

export default BookingScreen;
