import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";

const BookingCalendar = () => {
  const timeBlocks = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const [selectedTimeBlockIndexesCourt1, setSelectedTimeBlockIndexesCourt1] = useState<
    number[] | null
  >(null);

  const handleTimeBlockPress = (index: number) => {
    if (selectedTimeBlockIndexesCourt1) {
      const newSelectedTimeBlockIndexes = [...selectedTimeBlockIndexesCourt1];
      if (newSelectedTimeBlockIndexes.includes(index)) {
        newSelectedTimeBlockIndexes.splice(
          newSelectedTimeBlockIndexes.indexOf(index),
          1
        );
      } else {
        newSelectedTimeBlockIndexes.push(index);
      }
      setSelectedTimeBlockIndexesCourt1(newSelectedTimeBlockIndexes);
    } else {
      setSelectedTimeBlockIndexesCourt1([index]);
    }
  };

  return (
    <ScrollView horizontal>
      <View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
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
              <Text style={{ color: "white", ...textStyles.body }}>{time}</Text>
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

        <View
          style={{
            flexDirection: "row",
          }}
        >
          {timeBlocks.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: 60,
                height: 60,
                backgroundColor: selectedTimeBlockIndexesCourt1?.includes(index)
                  ? colors.primary
                  : "white",
                borderWidth: 0.5,
              }}
              onPress={() => handleTimeBlockPress(index)}
            ></TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default BookingCalendar;
