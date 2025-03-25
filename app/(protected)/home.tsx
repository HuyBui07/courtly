// components
import { View, ImageBackground, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import CourtView from "@/libs/commons/design-system/components/CourtView";
import TournamentView from "@/libs/commons/design-system/components/TournamentView";
import Banner from "@/libs/commons/design-system/components/Banner";

// design system
import { colors } from "@/libs/commons/design-system/colors";
import PickupView from "@/libs/commons/design-system/components/PickupView";
const Home = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ paddingBottom: 92 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ width: "100%", height: 80}}>
        <ImageBackground
          source={require("../../assets/images/background_header.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            variant="bodyLarge"
            style={{
              marginHorizontal: 16,
              marginTop: 16,
              color: "rgba(0,0,0,0.5)",
              fontWeight: "semibold",
            }}
          >
            WELCOME BACK!
          </Text>

          <Text
            variant="bodyMedium"
            style={{
              marginHorizontal: 16,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Gia Huy
          </Text>
        </ImageBackground>
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginHorizontal: 16,
        }}
      >
        <Banner />

        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 24, marginBottom: 16 }}>
          Your Bookings
        </Text>
        <CourtView />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 32,
          }}
        >
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            Tournaments
          </Text>

          <Text
            variant="bodyMedium"
            style={{ color: colors.primary, fontWeight: "bold" }}
          >
            Click for all {">>>"}
          </Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        >
          <TournamentView />
          <TournamentView />
          <TournamentView />
          <TournamentView />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 32,
          }}
        >
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            Pickup Games
          </Text>

          <Text
            variant="bodyMedium"
            style={{ color: colors.primary, fontWeight: "bold" }}
          >
            Click for all{">>>"}
          </Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        >
          <PickupView />
          <PickupView />
          <PickupView />
          <PickupView />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Home;
