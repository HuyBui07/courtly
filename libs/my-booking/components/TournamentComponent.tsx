import { Tournament } from "@/libs/home/models/TournamentModel";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { InformationLine } from "./InformationLine";
import { formatDate } from "@/libs/commons/utils";
import { textStyles } from "@/libs/commons/design-system/styles";

const TournamentComponent = ({ tournament }: { tournament: Tournament }) => {
  const formattedType = tournament.type === "single" ? "Đánh đơn" : "Đánh đôi";
  const formattedDate = formatDate(tournament.deadline);

  return (
    <TouchableOpacity style={[styles.container, {borderColor: tournament.type === "single" ? "red" : "blue"}]}>
      <View style={styles.content}>
        <InformationLine title="Name" value={tournament.name} isVietnamese />
        <InformationLine title="Type" value={formattedType} isVietnamese />
        <InformationLine title="Start Date" value={formattedDate} isVietnamese />
      </View>
      <View style={[styles.sideContainer, {backgroundColor: tournament.type === "single" ? "red" : "blue"}]}>
        <Text
          style={[
            textStyles.bodyBold,
            styles.sideText,
          ]}
        >
          {tournament.type === "single" ? "Single" : "Double"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TournamentComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 24,
    flexDirection: "row",
    borderWidth: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  sideContainer: {
    width: 32,
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  sideText: {
    transform: [{ rotate: "90deg" }],
    width: 100,
    textAlign: "center",
    color: "white",
  },
});
