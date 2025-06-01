import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";

import TournamentView from "@/libs/commons/design-system/components/TournamentView";
import { useGetTournaments } from "../hooks/queries/useGetTournaments";
import { Tournament } from "../models/TournamentModel";

const TournarmentSection = () => {
  const { data: tournaments } = useGetTournaments();
  
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 48,
          paddingHorizontal: 12,
        }}
      >
        <Text variant="titleLarge" style={{ ...textStyles.title }}>
          Tournaments
        </Text>

        <Text
          variant="bodyMedium"
          style={{ ...textStyles.body, color: colors.primary }}
        >
          Click for all {">>>"}
        </Text>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 12,
          paddingBottom: 8,
        }}
      >
        {tournaments?.map((tournament: Tournament) => (
          <TournamentView
            key={tournament._id}
            tour_id={tournament._id}
            deadline={tournament.deadline}
            type={tournament.type}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default TournarmentSection;
