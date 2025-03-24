import { View, ImageBackground } from "react-native";
import { TextInput, Text } from "react-native-paper";
import React from "react";
import { useTheme } from "react-native-paper";

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
      </View>
    </View>
  );
};

export default Home;
