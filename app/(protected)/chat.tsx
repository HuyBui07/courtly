import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, FlatList } from "react-native";
import { TextInput } from "react-native-paper";
import ChatBubble from "@/libs/chat/components/ChatBubble";
import DateBreakline from "@/libs/chat/components/DateBreakline";
import { useChat } from "././../../libs/chat/hooks/useChatMessages";
import { User } from "@/libs/auth/types";

const conversationId = "test-chat-01"; // Bạn có thể truyền vào prop nếu cần động

const Chat = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(80);
  const [text, setText] = useState("");
  const { messages, sendMessage } = useChat(conversationId);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOffset(10);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(80);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage({
       text: text.trim(),
      
      createdAt: Date.now(),
      user: {
        _id: "user-123", // Chắc chắn có trường _id
        name: "Gia Huy",
        email: "giahuy@123"
      },
      _id: ""
    });
    
    
    
    setText("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <>
            {/* Nếu muốn có DateBreakline thì xử lý thêm theo ngày ở đây */}
            <ChatBubble message={item.text} avatarUrl={item.user.avatar} />
          </>
        )}
      />

      <TextInput
        mode="outlined"
        placeholder="Nhập tin nhắn..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
        style={[styles.input, { marginBottom: keyboardOffset }]}
        right={<TextInput.Icon icon="send" onPress={handleSend} />}
        outlineStyle={{ borderRadius: 50 }}
        outlineColor="rgba(0, 0, 0, 0.1)"
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  input: {
    marginTop: "auto",
    backgroundColor: "white",
    paddingLeft: 20,
  },
});
