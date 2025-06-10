import { StyleSheet, View } from "react-native";
import { Text, Badge } from "react-native-paper";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";
import { AnimatedIconButton } from "@/libs/commons/design-system/components/AnimatedComponents";
import { useEffect } from "react";
import { router } from "expo-router";
import { useNotifications } from "@/libs/store/useNotifications";

const Header = ({
  headTitle,
  description,
}: {
  headTitle: string;
  description?: string;
}) => {
  const animatedValue = useSharedValue(5);
  const { notifications } = useNotifications() as any;
  useEffect(() => {
    animatedValue.value = withRepeat(
      withSpring(-animatedValue.value),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${animatedValue.value}deg`,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <Text
          variant="titleMedium"
          style={{ ...textStyles.title, fontSize: 20, color: "white" }}
        >
          {headTitle}
        </Text>
        {description && (
          <Text
            variant="titleMedium"
            style={{ ...textStyles.body, color: "white" }}
          >
            {description}
          </Text>
        )}
      </View>

      <View>
        <AnimatedIconButton
          icon="bell"
          iconColor="white"
          size={24}
          onPress={() => router.push("/notifications")}
          style={[
            notifications.length > 0 ? animatedStyle : {},
            {
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
            },
          ]}
        />
        {notifications.length > 0 && (
          <Badge
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              ...textStyles.body,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {notifications.length}
          </Badge>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: "100%",
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "space-between",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
});
