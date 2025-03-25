// design system
import { styles } from "@/libs/commons/design-system/styles";

// components
import { View, Text } from "react-native";

const PickupView = () => {
  return (
    <View
      style={{...styles.container, width: 200, height: 200}}
    >
      <Text>PickView</Text>
    </View>
  );
};

export default PickupView;
