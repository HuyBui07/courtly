import React from "react";

import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { colors } from "../../commons/design-system/colors";
import { textStyles } from "../../commons/design-system/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

type HeaderProps = {
  navigation: any;
  title: string;
  mode?: "small" | "medium" | "large" | "center-aligned";
};

const Header = ({ navigation, title, mode = "small" }: HeaderProps) => {
  return (
    <Appbar.Header
      mode={mode}
      style={{ backgroundColor: colors.primary, elevation: 0 }}
    >
      {navigation.canGoBack() && (
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
      )}
      <Appbar.Content
        title={title}
        titleStyle={{ ...textStyles.titleSmall, color: "white" }}
      />
    </Appbar.Header>
  );
};

export default Header;
