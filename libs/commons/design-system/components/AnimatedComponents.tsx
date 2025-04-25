import { TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import Animated from "react-native-reanimated";

export const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedIconButton = Animated.createAnimatedComponent(IconButton);
