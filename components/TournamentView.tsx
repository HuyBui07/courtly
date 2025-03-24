// design system
import {styles} from "@/libs/design-system/styles";

import { View, Text } from "react-native";

const TournamentView = () => {
  return (
    <View
      style={{...styles.container, width: 200, height: 200}}
    >
      <Text>TournamentView</Text>
    </View>
  );
};

export default TournamentView;
