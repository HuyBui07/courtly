import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    marginTop: 16,
  },
  headerText: {
    fontSize: 24,
    marginHorizontal: 16,
    fontWeight: "bold",
  },
});

export * from "./TextStyle"
