// design system
import { styles, textStyles } from "@/libs/commons/design-system/styles";
import FlipTimer from "@/libs/home/components/FlipTimer";

import { View, Text, ImageBackground } from "react-native";

const TournamentView = () => {
  return (
    <View
      style={{
        ...styles.container,
        width: 200,
        height: 200,
        overflow: "hidden",
        elevation: 4,
      }}
    >
      <ImageBackground
        source={require("../../../../assets/images/levels/a-level.png")}
        style={{ width: "100%", height: "100%", justifyContent: "space-between" }}
      >
        <Text
          style={{
            ...textStyles.title,
            fontSize: 52,
            color: "white",
            paddingHorizontal: 16,
          }}
        >
          A
        </Text>

        <FlipTimer seconds={3600000}/>
      </ImageBackground>
    </View>
  );
};

export default TournamentView;
