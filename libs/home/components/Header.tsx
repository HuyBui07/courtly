import { StyleSheet, View } from "react-native";
import { Text, IconButton, Badge } from "react-native-paper";
import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";

const Header = ({
  headTitle,
  description,
}: {
  headTitle: string;
  description?: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <Text
          variant="titleMedium"
          style={{ ...textStyles.title, fontSize: 20, color: "white" }}
        >
          {headTitle}
        </Text>
        {description && (
          <Text
            variant="titleMedium"
            style={{ ...textStyles.body, color: "white" }}
          >
            {description}
          </Text>
        )}
      </View>

      <View>
        <IconButton
          icon="bell"
          iconColor="white"
          size={24}
          onPress={() => console.log("Pressed")}
          style={{ borderWidth: 1, borderColor: "white", borderRadius: 10 }}
        />
        <Badge
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            ...textStyles.body,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          3
        </Badge>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: "100%",
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "space-between",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
});
