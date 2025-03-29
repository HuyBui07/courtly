// components
import { View, ImageBackground, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import CourtView from "@/libs/commons/design-system/components/CourtView";
import TournamentView from "@/libs/commons/design-system/components/TournamentView";
import Banner from "@/libs/home/components/Banner";

// design system
import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import PickupView from "@/libs/commons/design-system/components/PickupView";
import Header from "@/libs/home/components/Header";
import YourBookingSection from "@/libs/home/components/YourBookingSection";
import TournarmentSection from "@/libs/home/components/TournarmentSection";
import PickupSection from "@/libs/home/components/PickupSection";

const Home = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 120 }}
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
