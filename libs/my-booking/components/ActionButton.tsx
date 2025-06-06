import { colors } from "@/libs/commons/design-system/colors";
import { StyleSheet } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { useRouter } from "expo-router";

const ActionButton = ({ isExtended }: { isExtended: boolean }) => {
  const router = useRouter();

  return (
    <AnimatedFAB
      icon={"plus"}
      label={"Book a court"}
      extended={isExtended}
      onPress={() => router.push("/booking/book-court")}
      animateFrom={"right"}
      style={styles.fabStyle}
      color="white"
      theme={{
        fonts: {
          labelLarge: {
            fontFamily: "Poppins-Bold",
          },
        },
      }}
    />
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 88,
    right: 16,
    position: "absolute",
    backgroundColor: colors.primary,
    pointerEvents: "box-none",
  },
});
