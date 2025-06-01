import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { useGetTournaments } from "@/libs/home/hooks/queries/useGetTournaments";
import { Tournament } from "@/libs/home/models/TournamentModel";
import { useLocalSearchParams } from "expo-router";

import { colors } from "@/libs/commons/design-system/colors";
import HoldButton from "@/libs/commons/design-system/components/HoldButton";

const TournamentScreen = () => {
  const { tour_id } = useLocalSearchParams();
  const { data: tournaments } = useGetTournaments();

  const tournament = tournaments?.find(
    (tournament: Tournament) => tournament._id === tour_id
  );

  const readableDeadline = new Date(tournament?.deadline).toLocaleDateString(
    "vi-VN",
    { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" }
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialIcons name="emoji-events" size={24} color="black" />
        <Text style={styles.title}>{tournament?.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2023/06/2506/cau-long-250623.jpg",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.descriptionRow}>
        <FontAwesome5 name="info-circle" size={20} color="black" />
        <Text style={styles.description}>
          <Text style={{ fontWeight: "bold" }}>Mô tả:</Text>{" "}
          {tournament?.description}
        </Text>
      </View>

      <View style={styles.descriptionRow}>
        <MaterialIcons name="access-time" size={20} color="black" />
        <Text style={styles.description}>
          <Text style={{ fontWeight: "bold" }}>Thời gian:</Text>{" "}
          {readableDeadline}
        </Text>
      </View>

      <View style={styles.descriptionRow}>
        <Ionicons name="people" size={20} color="black" />
        <Text style={styles.description}>
          <Text style={{ fontWeight: "bold" }}>Số lượng người tham gia:</Text>{" "}
          {tournament?.scale}/{tournament?.scale}
        </Text>
      </View>

      <HoldButton />
    </View>
  );
};

export default TournamentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 32,
    paddingTop: 40,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  descriptionRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  description: {
    fontSize: 20,
    flex: 1,
  },
  joinButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
