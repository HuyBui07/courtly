import React, { useState, memo, useMemo, useCallback } from "react";

import Feather from "@expo/vector-icons/Feather";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { AnimatedTouchableOpacity } from "@/libs/commons/design-system/components/AnimatedComponents";

type FilterOption = {
  value: string | number;
  label: string;
};

interface FilterDropdownProps {
  onSelect: (item: FilterOption) => void;
  initialValues?: FilterOption;
}

export const MaximumFilterDropdown = memo(
  ({ onSelect, initialValues }: FilterDropdownProps) => {
    const data = useMemo(
      () => [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
      ],
      []
    );

    const [state, setState] = useState({
      isDropdownVisible: false,
      selectedValue: initialValues ?? data[0],
      dropdownWidth: 0,
      dropdownHeight: 0,
    });

    const toggleDropdown = () =>
      setState((prev) => ({
        ...prev,
        isDropdownVisible: !prev.isDropdownVisible,
      }));

    const handleSelect = (item: FilterOption) => {
      setState((prev) => ({
        ...prev,
        selectedValue: item,
        isDropdownVisible: false,
      }));
      onSelect(item);
    };

    const onLayout = (event: {
      nativeEvent: { layout: { width: number; height: number } };
    }) => {
      const { width, height } = event.nativeEvent.layout;
      setState((prev) => ({
        ...prev,
        dropdownWidth: width,
        dropdownHeight: height,
      }));
    };

    const renderItem = useCallback(
      ({ item }: { item: FilterOption }) => (
        <TouchableOpacity
          activeOpacity={0.95}
          style={[
            styles.option,
            {
              width: state.dropdownWidth,
              borderBottomWidth: 1,
              borderColor: "#d3d3d3",
              borderRadius: 0,
              backgroundColor:
                item.value === state.selectedValue.value ? "#f0f0f0" : "white",
            },
          ]}
          onPress={() => handleSelect(item)}
        >
          <Text style={styles.optionText}>{item.label}</Text>
        </TouchableOpacity>
      ),
      [state.dropdownWidth, state.selectedValue.value, handleSelect]
    );

    return (
      <>
        <TouchableOpacity
          onLayout={onLayout}
          style={styles.button}
          onPress={toggleDropdown}
        >
          <Feather name="filter" size={20} color="black" />
          <Text style={styles.buttonText}>{state.selectedValue.label}</Text>
        </TouchableOpacity>
        {state.isDropdownVisible && (
          <Animated.FlatList
            entering={FadeInUp}
            exiting={FadeOutUp}
            style={[
              styles.dropdown,
              {
                top: state.dropdownHeight * 1.6,
                height: state.dropdownHeight * 3,
              },
            ]}
            data={data}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    paddingVertical: 16,
    backgroundColor: "white",
    borderWidth: 0.7,
    borderRadius: 4,
    flex: 0,
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
    top: 50,
    borderWidth: 0.6,
  },
  option: {
    padding: 10,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
  },
});
