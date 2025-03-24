import { View, ImageBackground } from "react-native";
import { TextInput, Text, FAB } from "react-native-paper";
import React from "react";

// components
import CourtView from "@/components/CourtView";
import { colors } from "@/libs/design-system/colors";

const Home = () => {
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

          <Text
            style={{
              marginHorizontal: 16,
              fontSize: 16,
              marginBottom: 16,
              fontWeight: "bold",
            }}
          >
            Gia Huy
          </Text>

          <TextInput
            mode="outlined"
            style={{ marginHorizontal: 16, marginTop: "auto", height: 44 }}
            outlineStyle={{ borderRadius: 10 }}
            outlineColor="rgba(0,0,0,0.2)"
            right={<TextInput.Icon icon="magnify" color="rgba(0,0,0,0.3)" />}
          />
        </ImageBackground>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 16,
            marginTop: 16,
          }}
        >
          <CourtView />
        </View>
      </View>

      <FAB
        variant="primary"
        mode="flat"
        style={{
          position: "absolute",
          right: 16,
          bottom: 88,
          backgroundColor: colors.primary,
        }}
        label="Đặt sân"
        color="white"
      />
    </View>
  );
};

export default Home;
