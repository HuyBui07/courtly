// design system
import { styles, textStyles } from "@/libs/commons/design-system/styles";
import FlipTimer from "@/libs/home/components/FlipTimer";

import { Text, ImageBackground, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface TournamentViewProps {
  tour_id: string;
  deadline: string;
  type: string;
  poster: string;
}

const TournamentView = ({ tour_id, deadline, type, poster }: TournamentViewProps) => {
  const router = useRouter();

  const now = new Date();
  const deadlineDate = new Date(deadline);

  const remainingSeconds = Math.max(
    0,
    Math.floor((deadlineDate.getTime() - now.getTime()) / 1000)
  );

  const getImage = () => {
    if (type === "single") {
      return require("../../../assets/images/levels/single.png");
    } else {
      return require("../../../assets/images/levels/doubles.png");
    }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/home/tournament/${tour_id}`)}
      style={{
        ...styles.container,
        width: 200,
        height: 200,
        overflow: "hidden",
        elevation: 4,
      }}
    >
      <ImageBackground
        source={getImage()}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            ...textStyles.title,
            fontSize: 52,
            color: "white",
            paddingHorizontal: 16,
          }}
        >
          {type === "single" ? "S" : "D"}
        </Text>

        <FlipTimer seconds={remainingSeconds} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default TournamentView;
