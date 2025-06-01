import { View, Text, StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Button, Icon } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";

import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import { timeBlocks } from "../constants";
import { BookingOrder } from "../types/BookingOrder";
import { formatDate } from "@/libs/commons/utils";
import { BookingService } from "../services/BookingService";
import { useBookCourt } from "../hooks/mutations/useBookCourt";

const services = {
  water: { name: 'Water Bottle', price: 10000 },
  soda: { name: 'Soda', price: 15000 },
  shuttlecock: { name: 'Shuttlecock', price: 50000 },
  towel: { name: 'Towel', price: 20000 },
};

const BottomSheet = ({
  date,
  selectedTimeBlockIndexesCourt1,
  selectedTimeBlockIndexesCourt2,
  selectedTimeBlockIndexesCourt3,
  selectedTimeBlockIndexesCourt4,
  selectedServices,
}: {
  date?: string;
  selectedTimeBlockIndexesCourt1: number[];
  selectedTimeBlockIndexesCourt2: number[];
  selectedTimeBlockIndexesCourt3: number[];
  selectedTimeBlockIndexesCourt4: number[];
  selectedServices: { [key: string]: number };
}) => {
  const { mutate: bookCourt } = useBookCourt();
  const [isExtended, setIsExtended] = useState(false);
  const height = useSharedValue(120);

  const totalHours =
    selectedTimeBlockIndexesCourt1.length +
    selectedTimeBlockIndexesCourt2.length +
    selectedTimeBlockIndexesCourt3.length +
    selectedTimeBlockIndexesCourt4.length;

  const courtPrice = totalHours * 80000;
  const servicesPrice = Object.entries(selectedServices).reduce((total, [serviceId, quantity]) => {
    return total + (services[serviceId as keyof typeof services]?.price || 0) * quantity;
  }, 0);
  const totalPrice = courtPrice + servicesPrice;

  const gesture = Gesture.Pan().onEnd((event) => {
    if (event.translationY > 0 && height.value > 120) {
      height.value = withSpring(120);
      runOnJS(setIsExtended)(false);
    }
  });

  const handleContinue = async () => {
    if (isExtended) {
      console.log("Checkout");
      // Process data
      let bookingOrder: BookingOrder[] = [];
      const createBookingOrder = (
        courtId: number,
        selectedTimeBlocks: number[]
      ): BookingOrder | null => {
        if (selectedTimeBlocks.length === 0) return null;
        const sortedBlocks = [...selectedTimeBlocks].sort((a, b) => a - b);
        console.log(selectedServices);
        const additionalServices = Object.entries(selectedServices).map(([serviceId, quantity]) => ({
          service_id: serviceId,
          quantity,
        }));
        return {
          court_id: courtId,
          start_time: `${date}T${timeBlocks[sortedBlocks[0]]}:00Z`,
          end_time: `${date}T${
            timeBlocks[sortedBlocks[sortedBlocks.length - 1] + 1]
          }:00Z`,
          additional_services: additionalServices.length > 0 ? additionalServices : undefined,
        };
      };

      const courts = [
        { id: 1, blocks: selectedTimeBlockIndexesCourt1 },
        { id: 2, blocks: selectedTimeBlockIndexesCourt2 },
        { id: 3, blocks: selectedTimeBlockIndexesCourt3 },
        { id: 4, blocks: selectedTimeBlockIndexesCourt4 },
      ];

      bookingOrder = courts
        .map((court) => createBookingOrder(court.id, court.blocks))
        .filter((order): order is BookingOrder => order !== null);
      bookCourt(bookingOrder);
      return;
    }

    height.value = withSpring(height.value + detailsBoxHeight + 32);
    setIsExtended(true);
  };

  const animatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(height.value, [120, 220], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { opacity };
  });

  const [detailsBoxHeight, setDetailsBoxHeight] = useState(0);
  const onLayout = (event: any) => {
    const { height: newHeight } = event.nativeEvent.layout;
    setDetailsBoxHeight(newHeight);
  };

  return (
    <>
      {isExtended && <View style={[styles.backdrop]}></View>}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheet, { height }]}>
          <View style={styles.dash}></View>

          <View style={styles.infoContainer}>
            <Text style={styles.text}>Total hours: {totalHours}h</Text>
            <Text style={styles.text}>
              Price: {totalPrice.toLocaleString('vi-VN')} VND
            </Text>
          </View>

          <Animated.View
            onLayout={onLayout}
            style={[styles.detailsBox, animatedOpacity]}
          >
            <Text style={styles.text}>Date: {date}</Text>
            {selectedTimeBlockIndexesCourt1.length > 0 && (
              <Text style={styles.text}>
                Court 1:{" "}
                {selectedTimeBlockIndexesCourt1
                  .map(
                    (timeBlockIndex) =>
                      timeBlocks[timeBlockIndex] +
                      "-" +
                      timeBlocks[timeBlockIndex + 1]
                  )
                  .join(", ")}
              </Text>
            )}
            {selectedTimeBlockIndexesCourt2.length > 0 && (
              <Text style={styles.text}>
                Court 2:{" "}
                {selectedTimeBlockIndexesCourt2
                  .map(
                    (timeBlockIndex) =>
                      timeBlocks[timeBlockIndex] +
                      "-" +
                      timeBlocks[timeBlockIndex + 1]
                  )
                  .join(", ")}
              </Text>
            )}
            {selectedTimeBlockIndexesCourt3.length > 0 && (
              <Text style={styles.text}>
                Court 3:{" "}
                {selectedTimeBlockIndexesCourt3
                  .map(
                    (timeBlockIndex) =>
                      timeBlocks[timeBlockIndex] +
                      "-" +
                      timeBlocks[timeBlockIndex + 1]
                  )
                  .join(", ")}
              </Text>
            )}
            {selectedTimeBlockIndexesCourt4.length > 0 && (
              <Text style={styles.text}>
                Court 4:{" "}
                {selectedTimeBlockIndexesCourt4
                  .map(
                    (timeBlockIndex) =>
                      timeBlocks[timeBlockIndex] +
                      "-" +
                      timeBlocks[timeBlockIndex + 1]
                  )
                  .join(", ")}
              </Text>
            )}
            {Object.entries(selectedServices).length > 0 && (
              <View style={styles.servicesContainer}>
                <Text style={styles.text}>Additional Services:</Text>
                {Object.entries(selectedServices).map(([serviceId, quantity]) => (
                  <Text key={serviceId} style={styles.text}>
                    {services[serviceId as keyof typeof services]?.name}: {quantity}x
                  </Text>
                ))}
              </View>
            )}
          </Animated.View>

          <Button
            mode="contained"
            style={styles.button}
            onPress={handleContinue}
          >
            <Text style={styles.text}>
              {!isExtended ? "Continue" : "Check Out"}
            </Text>
          </Button>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    flexDirection: "column",
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 1000,
  },

  detailsBox: {
    backgroundColor: colors.bolderPrimary,
    padding: 16,
    borderRadius: 10,
    marginTop: 16,

    width: "100%",
  },

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.lightGray,
    opacity: 0.5,
    zIndex: 999,
  },

  dash: {
    height: 2,
    backgroundColor: "white",
    width: 20,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },

  text: {
    color: "white",
    ...textStyles.bodyBold,
  },

  button: {
    backgroundColor: colors.button,
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 16,
  },

  servicesContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 8,
  },
});

export default BottomSheet;
