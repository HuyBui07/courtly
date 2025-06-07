// components
import { View, ScrollView } from "react-native";
import Banner from "@/libs/home/components/Banner";

// design system
import Header from "@/libs/home/components/Header";
import YourBookingSection from "@/libs/home/components/YourBookingSection";
import TournarmentSection from "@/libs/home/components/TournarmentSection";
import PickupSection from "@/libs/home/components/PickupSection";
import { BOTTOM_TAB_BAR_HEIGHT } from "@/libs/commons/design-system/constants";

const Home = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: BOTTOM_TAB_BAR_HEIGHT + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <Header headTitle="Hello, Gia Huy" description="Let's play some badminton!"/>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          overflow:"visible"
        }}
      >
        <Banner />
        <YourBookingSection />
        <TournarmentSection />
        <PickupSection />
      </View>

    </ScrollView>
  );
};

export default Home;
