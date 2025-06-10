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
import { useGetUserUpcomingPickups } from "@/libs/my-booking/hooks/queries/useGetUserUpcomingPickups";
import { useGetTournaments } from "@/libs/home/hooks/queries/useGetTournaments";
import { Pickup } from "@/libs/my-booking/types/Pickup";
import { Tournament } from "@/libs/home/models/TournamentModel";
import TournamentComponent from "@/libs/my-booking/components/TournamentComponent";

const BookingScreen = () => {
  const [time, setTime] = useState("upcoming");
  const { data: bookings, isLoading: isLoadingBookings } = useGetUserBookings();
  const { data: upcomingPickups, isLoading: isLoadingUpcomingPickups } =
    useGetUserUpcomingPickups();
  const { data: tournaments, isLoading: isLoadingTournaments } =
    useGetTournaments();
  const registeredTournaments = tournaments?.filter((tournament: Tournament) => tournament.is_register);

  const isLoading = isLoadingBookings || isLoadingUpcomingPickups || isLoadingTournaments;

  // Action button
  const [isABExtended, setIsABExtended] = useState(true);
  const onScroll = useCallback(({ nativeEvent }: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsABExtended(currentScrollPosition <= 0);
  }, []);

  const renderBookings = () => {
    if (time === "upcoming") {
      return [...(bookings?.upcoming_bookings || []), ...(upcomingPickups || []), ...(registeredTournaments || [])];
    }
    return bookings?.past_bookings;
  };

  const renderItem = ({ item }: { item: Booking | Pickup | Tournament }) => {
    if ("tour_id" in item && "is_register" in item && item.is_register) {
      return <TournamentComponent tournament={item as Tournament} />;
    }
    if ("court_id" in item) {
      return <CalendarComponent booking={item as Booking | Pickup} />;
    }
    return null;
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
        renderItem={renderItem}
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
