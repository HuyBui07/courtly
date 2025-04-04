import { useState } from "react";

// design system
import { styles } from "@/libs/commons/design-system/styles";
import CourtView from "@/libs/commons/design-system/components/CourtView";

// components
import { ScrollView, View, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "@/libs/commons/design-system/colors";
import Header from "@/libs/home/components/Header";
import SegmentedButton from "@/libs/my-booking/components/SegmentedButton";
import CalendarComponent from "@/libs/my-booking/components/CalendarComponent";

const Booking = () => {
  const [time, setTime] = useState("upcoming");

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      {/* <View style={{ width: "100%", height: "13%" }}>
        <ImageBackground
          source={require("../../assets/images/background_header.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            variant="headlineMedium"
            style={{
              fontWeight: "bold",
              margin: "auto",
            }}
          >
            My Bookings
          </Text>
        </ImageBackground>
      </View> */}

      {/* <Text style={styles.headerText}>Lich dat cua toi</Text> */}

      <Header headTitle="My Bookings" />

      {/* <SegmentedButtons
        value={time}
        onValueChange={setTime}
        buttons={[
          {
            value: "upcoming",
            label: "Upcoming",
            checkedColor: "white",
            style: { borderRadius: 8 },
            labelStyle: { fontWeight: "bold", fontSize: 16 },
          },
          {
            value: "past",
            label: "Past",
            checkedColor: "white",
            style: { borderRadius: 8 },
            labelStyle: { fontWeight: "bold", fontSize: 16 },
          },
        ]}
        theme={{ colors: { secondaryContainer: colors.primary } }}
        style={{ marginHorizontal: 16, marginVertical: 16}}
      /> */}
      <SegmentedButton />


      <ScrollView
        style={{ width: "100%", padding: 16 }}
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <CalendarComponent  />
        <CalendarComponent  />
      </ScrollView>
    </View>
  );
};

export default Booking;
