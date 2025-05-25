import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import { timeBlocks } from "../constants";

const BookingCalendar = ({
  selectedTimeBlockIndexesCourt1,
  selectedTimeBlockIndexesCourt2,
  selectedTimeBlockIndexesCourt3,
  selectedTimeBlockIndexesCourt4,
  setSelectedTimeBlockIndexesCourt1,
  setSelectedTimeBlockIndexesCourt2,
  setSelectedTimeBlockIndexesCourt3,
  setSelectedTimeBlockIndexesCourt4,
  bookedCourt1,
  bookedCourt2,
  bookedCourt3,
  bookedCourt4,
}: {
  selectedTimeBlockIndexesCourt1: number[];
  selectedTimeBlockIndexesCourt2: number[];
  selectedTimeBlockIndexesCourt3: number[];
  selectedTimeBlockIndexesCourt4: number[];
  setSelectedTimeBlockIndexesCourt1: React.Dispatch<
    React.SetStateAction<number[]>
  >;
  setSelectedTimeBlockIndexesCourt2: React.Dispatch<
    React.SetStateAction<number[]>
  >;
  setSelectedTimeBlockIndexesCourt3: React.Dispatch<
    React.SetStateAction<number[]>
  >;
  setSelectedTimeBlockIndexesCourt4: React.Dispatch<
    React.SetStateAction<number[]>
  >;
  bookedCourt1: number[];
  bookedCourt2: number[];
  bookedCourt3: number[];
  bookedCourt4: number[];
}) => {
  console.log("BookingCalendar: ", bookedCourt1);

  const courts = [
    { name: "Court 1" },
    { name: "Court 2" },
    { name: "Court 3" },
    { name: "Court 4" },
  ];

  const handleTimeBlockPress = (court: number, index: number) => {
    let selectedTimeBlockIndexesCourt;
    let setSelectedTimeBlockIndexesCourt;
    switch (court) {
      case 1:
        selectedTimeBlockIndexesCourt = selectedTimeBlockIndexesCourt1;
        setSelectedTimeBlockIndexesCourt = setSelectedTimeBlockIndexesCourt1;
        break;
      case 2:
        selectedTimeBlockIndexesCourt = selectedTimeBlockIndexesCourt2;
        setSelectedTimeBlockIndexesCourt = setSelectedTimeBlockIndexesCourt2;
        break;
      case 3:
        selectedTimeBlockIndexesCourt = selectedTimeBlockIndexesCourt3;
        setSelectedTimeBlockIndexesCourt = setSelectedTimeBlockIndexesCourt3;
        break;
      case 4:
        selectedTimeBlockIndexesCourt = selectedTimeBlockIndexesCourt4;
        setSelectedTimeBlockIndexesCourt = setSelectedTimeBlockIndexesCourt4;
        break;
      default:
        return;
    }

    if (selectedTimeBlockIndexesCourt.length > 0) {
      const newSelectedTimeBlockIndexes = [...selectedTimeBlockIndexesCourt];
      if (newSelectedTimeBlockIndexes.includes(index)) {
        newSelectedTimeBlockIndexes.splice(
          newSelectedTimeBlockIndexes.indexOf(index),
          1
        );
      } else {
        newSelectedTimeBlockIndexes.push(index);
      }
      setSelectedTimeBlockIndexesCourt(newSelectedTimeBlockIndexes);
    } else {
      setSelectedTimeBlockIndexesCourt([index]);
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        style={{ position: "relative" }}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <View style={{ ...styles.calendarRow }}>
            <View
              style={{
                width: 80,
                height: 60,
                backgroundColor: colors.lightPrimary,
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            ></View>
            {timeBlocks.map((time, index) => (
              <View
                key={index}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.lightPrimary,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    ...textStyles.body,
                    position: "absolute",
                    left: -19,
                  }}
                >
                  {time}
                </Text>
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    height: "10%",
                    width: 0.5,
                    backgroundColor: "red",
                    zIndex: 1,
                  }}
                ></View>
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    height: "10%",
                    width: 0.5,
                    backgroundColor: "red",
                    zIndex: 1,
                  }}
                ></View>
              </View>
            ))}
          </View>

          {/* Court 1 */}
          <View style={styles.calendarRow}>
            <View style={styles.limitBlock}></View>
            {timeBlocks.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  ...styles.timeBlock,
                  backgroundColor: bookedCourt1?.includes(index)
                    ? "red"
                    : selectedTimeBlockIndexesCourt1?.includes(index)
                    ? colors.primary
                    : "white",
                }}
                onPress={() => handleTimeBlockPress(1, index)}
                disabled={bookedCourt1?.includes(index)}
              ></TouchableOpacity>
            ))}
          </View>

          {/* Court 2 */}
          <View style={styles.calendarRow}>
            <View style={styles.limitBlock}></View>
            {timeBlocks.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  ...styles.timeBlock,
                  backgroundColor: selectedTimeBlockIndexesCourt2?.includes(
                    index
                  )
                    ? colors.primary
                    : "white",
                }}
                onPress={() => handleTimeBlockPress(2, index)}
              ></TouchableOpacity>
            ))}
          </View>

          {/* Court 3 */}
          <View style={styles.calendarRow}>
            <View style={styles.limitBlock}></View>
            {timeBlocks.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  ...styles.timeBlock,
                  backgroundColor: selectedTimeBlockIndexesCourt3?.includes(
                    index
                  )
                    ? colors.primary
                    : "white",
                }}
                onPress={() => handleTimeBlockPress(3, index)}
              ></TouchableOpacity>
            ))}
          </View>

          {/* Court 4 */}
          <View style={styles.calendarRow}>
            <View style={styles.limitBlock}></View>
            {timeBlocks.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  ...styles.timeBlock,
                  backgroundColor: selectedTimeBlockIndexesCourt4?.includes(
                    index
                  )
                    ? colors.primary
                    : "white",
                }}
                onPress={() => handleTimeBlockPress(4, index)}
              ></TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "column",
          position: "absolute",
        }}
      >
        {courts.map((court, index) => (
          <View
            key={index}
            style={{
              position: "absolute",
              left: 0,
              top: (index + 1) * 60,
              backgroundColor: colors.lightPrimary,
              width: 80,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", ...textStyles.body }}>
              {court.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeBlock: {
    width: 60,
    height: 60,
    borderWidth: 0.5,
  },

  limitBlock: {
    width: 80,
    height: 60,
    backgroundColor: colors.lightGray,
  },

  calendarRow: {
    flexDirection: "row",
  },
});

export default React.memo(BookingCalendar);
