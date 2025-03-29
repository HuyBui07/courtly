// components
import { View, Text, Image, StyleSheet } from "react-native";
import { textStyles, styles as GlobalStyles } from "../styles";

const PickupView = () => {
  return (
    <View
      style={{
        height: 200,
        width: 200,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        padding: 12,
        marginTop: 16,
        elevation: 4,
        gap: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
          style={styles.avatar}
        />
        <Text style={{ ...textStyles.body, fontWeight: "bold" }}>
          Lebron James
        </Text>
      </View>

      <Text style={{ ...textStyles.body, fontWeight: "bold" }}>Level: A</Text>

      <Text style={{ ...textStyles.body }}>
        "Yo anyone want to smash together"
      </Text>
    </View>
  );
};

export default PickupView;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
});
