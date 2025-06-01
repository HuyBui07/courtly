import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },

  titleSmall: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    includeFontPadding: false,
  },

  body: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },

  bodySmall: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    includeFontPadding: false,
  },

  bodyBold: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
});
