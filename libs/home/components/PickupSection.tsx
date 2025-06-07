import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import PickupView from "@/libs/commons/design-system/components/PickupView";
import { useGetPickups } from "../hooks/queries/useGetPickups";
import PickupModel from "../models/PickupModel";
import LottieView from "lottie-react-native";
import LoadingCircleForComponents from "@/libs/commons/design-system/components/LoadingCircleForComponents";

const PickupSection = () => {
  const { data: pickups, isLoading } = useGetPickups();
  console.log(pickups);
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
          Pickup Games
        </Text>
        <Text
          variant="bodyMedium"
          style={{ ...textStyles.body, color: colors.primary }}
        >
          Click for all {">>>"}
        </Text>
      </View>

      {isLoading && <LoadingCircleForComponents />}
      {pickups == null && (
        <View
          style={{
            width: "90%",
            backgroundColor: colors.superLightPrimary,
            padding: 16,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            marginVertical: 24,
            marginHorizontal: "auto",
          }}
        >
          <LottieView
            source={require("@/assets/gifs/empty_tp.json")}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text variant="bodyMedium" style={{ ...textStyles.body }}>
            No pickup games found!
          </Text>
        </View>
      )}
      {pickups?.length > 0 && !isLoading && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 12,
            paddingBottom: 8,
          }}
          style={{ overflow: "visible" }}
        >
          {pickups?.map((pickup: PickupModel) => (
            <PickupView key={pickup.id} {...pickup} />
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default PickupSection;
