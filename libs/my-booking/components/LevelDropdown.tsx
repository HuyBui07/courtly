import React, { useCallback, useState } from "react";

import Feather from "@expo/vector-icons/Feather";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { AnimatedTouchableOpacity } from "@/libs/commons/design-system/components/AnimatedComponents";

type FilterOption = {
  value: string | number;
  label: string;
  color: string;
  icon: string;
};

interface FilterDropdownProps {
  onSelect: (item: FilterOption) => void;
  initialValues?: FilterOption;
}

export const LevelFilterDropdown = ({
  onSelect,
  initialValues,
}: FilterDropdownProps) => {
  const data = [
    { value: "A", label: "Level A", color: "#ffb3ba", icon: "zap" }, // Pastel red, highest intensity
    { value: "B", label: "Level B", color: "#bae1ff", icon: "activity" }, // Pastel blue
    { value: "C", label: "Level C", color: "#ffffba", icon: "trending-down" }, // Pastel yellow
    { value: "D", label: "Level D", color: "#baffc9", icon: "shield" }, // Pastel green, lowest intensity
  ];

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValues ?? data[0]);

  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);
  const handleSelect = (item: FilterOption) => {
    setSelectedValue(item);
    onSelect(item);
    setDropdownVisible(false);
  };

  const onLayout = (event: {
    nativeEvent: { layout: { width: number; height: number } };
  }) => {
    const { width, height } = event.nativeEvent.layout;
    setDropdownWidth(width);
    setDropdownHeight(height);
  };

  const renderItem = useCallback(
    ({ item }: { item: FilterOption }) => (
      <TouchableOpacity
        style={[
          styles.option,
          {
            width: dropdownWidth,
            backgroundColor: item.color,
            opacity: item.value === selectedValue.value ? 1 : 0.7,
            borderBottomWidth: 1,
            borderColor: "#d3d3d3",
            borderRadius: 0,
          },
        ]}
        onPress={() => handleSelect(item)}
      >
        <View style={styles.optionContent}>
          <Feather name={item.icon as any} size={16} color="black" />
          <Text style={styles.optionText}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    ),
    [dropdownWidth, selectedValue.value, handleSelect]
  );

  return (
    <>
      <TouchableOpacity
        onLayout={onLayout}
        style={[styles.button, { backgroundColor: selectedValue.color }]}
        onPress={toggleDropdown}
      >
        <Feather name={selectedValue.icon as any} size={20} color="black" />
        <Text style={styles.buttonText}>{selectedValue.label}</Text>
      </TouchableOpacity>
      {isDropdownVisible && (
        <Animated.FlatList
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={[styles.dropdown, { top: dropdownHeight * 1.6 }]}
          data={data}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    paddingVertical: 16,
    borderWidth: 0.7,
    borderRadius: 4,
    position: "relative",
    flex: 1,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    marginTop: 5,
    borderRadius: 8,
    zIndex: 1,
    borderWidth: 0.6,
    backgroundColor: "white",
  },
  option: {
    padding: 10,
    borderColor: "#d3d3d3",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionText: {
    fontSize: 16,
  },
});
