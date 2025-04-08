import React from "react";

import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { colors } from "../colors";
import { textStyles } from "../styles";
import Ionicons from "@expo/vector-icons/Ionicons";

type HeaderProps = {
  title: string;
  mode?: "small" | "medium" | "large" | "center-aligned";
};

const Header = ({ title, mode = "small" }: HeaderProps) => {
  const navigation = useRouter();

  const _goBack = () => {
    navigation.back();
  };

  return (
    <Appbar.Header
      mode={mode}
      style={{ backgroundColor: colors.primary, elevation: 0 }}
    >
      {navigation.canGoBack() && (
        <Appbar.BackAction onPress={_goBack} color="white" />
      )}
      <Appbar.Content
        title={title}
        titleStyle={{ ...textStyles.titleSmall, color: "white" }}
      />
    </Appbar.Header>
  );
};

export default Header;
