// libs/chat/components/ChatBubble.tsx
import { colors } from "@/libs/commons/design-system/colors";
import { View, Text, StyleSheet } from "react-native";

interface ChatBubbleProps {
  email: string;
  message: string;
  isOwnMessage?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  email,
  message,
  isOwnMessage,
}) => {
  console.log(isOwnMessage);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.emailText,
          { alignSelf: isOwnMessage ? "flex-end" : "flex-start" },
        ]}
      >
        {email}
      </Text>
      <View
        style={[
          styles.bubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        <Text>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "column",
  },
  emailText: {
    fontSize: 12,
    fontWeight: "200",
    alignSelf: "flex-start",
    marginHorizontal: 8,
    marginBottom: 4,
  },
  bubble: {
    borderRadius: 20,
    padding: 14,
    maxWidth: "80%",
  },
  ownBubble: {
    backgroundColor: colors.lightPrimary,
    alignSelf: "flex-end",
  },
  otherBubble: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
});

export default ChatBubble;
