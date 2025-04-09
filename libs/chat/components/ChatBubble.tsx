import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";

interface ChatBubbleProps {
  message: string;
  avatarUrl?: string;
  senderName?: string;
}

const ChatBubble = ({ message, avatarUrl, senderName }: ChatBubbleProps) => {
  return (
    <View style={styles.container}>
      {avatarUrl && (
        <Image
          source={{
            uri: avatarUrl,
          }}
          style={{
            height: 40,
            width: 40,
            borderRadius: 999,
            marginTop: "auto",
          }}
          contentFit="cover"
        />
      )}
      <View
        style={[
          styles.bubble,
          avatarUrl
            ? { borderBottomLeftRadius: 5 }
            : { borderBottomRightRadius: 5, marginLeft: "auto" },
        ]}
      >
        <Text
          style={{
            ...textStyles.body,
            color: "white",
            fontSize: 16,
            padding: 10,
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  bubble: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    maxWidth: "80%",
  },
});
