import { View, ImageBackground, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import TournamentView from "@/components/TournamentView";

const Tournament = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ width: "100%", height: "13%" }}>
        <ImageBackground
          source={require("../../assets/images/background_header.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            style={{
              marginHorizontal: 16,
              marginTop: 16,
              color: "rgba(0,0,0,0.5)",
              fontWeight: "semibold",
              marginBottom: -4,
            }}
          >
            WELCOME BACK!
          </Text>
        </ImageBackground>
      </View>

      <View
        style={{
          flexDirection: "column",
          marginHorizontal: 16,
        }}
      >
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          Giải đấu
        </Text>

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

        <Text
          variant="titleLarge"
          style={{ fontWeight: "bold", marginTop: 24 }}
        >
          Kèo vãng lai
        </Text>

        
      </View>
    </View>
  );
};

export default Tournament;
