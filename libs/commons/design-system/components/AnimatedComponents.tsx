import { TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import Animated from "react-native-reanimated";

export const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedView = Animated.createAnimatedComponent(View);

export const AnimatedIconButton = Animated.createAnimatedComponent(IconButton);

