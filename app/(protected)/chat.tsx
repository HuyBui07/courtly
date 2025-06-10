import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, FlatList } from "react-native";
import { TextInput } from "react-native-paper";
import ChatBubble from "@/libs/chat/components/ChatBubble";
import { IMessage } from "@/libs/chat/types";
import { firebase } from "@react-native-firebase/database";
import { useGetPersonalData } from "@/libs/commons/hooks/useGetPersonalData";

const Chat = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(80);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data: personalData } = useGetPersonalData();
  const messagesRef = firebase
    .app()
    .database(
      "https://courtly-5e320-default-rtdb.asia-southeast1.firebasedatabase.app/"
    )
    .ref();

  useEffect(() => {
    // Keyboard listeners
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOffset(10);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(80);
    });

    // Set up realtime listener
    const unsubscribe = messagesRef.on("value", (snapshot) => {
      const messagesData = snapshot.val();
      console.log(messagesData);
      if (messagesData) {
        // Convert object to array
        const messagesArray = Object.entries(messagesData).map(
          ([key, value]: [string, any]) => {
            return {
              _id: key,
              ...value,
            };
          }
        ).reverse();
        setMessages(messagesArray);
      }
    });

    return () => {
      showListener.remove();
      hideListener.remove();
      messagesRef.off("value", unsubscribe);
    };
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      messagesRef.push({
        text: text,
        email: personalData?.email,
        timestamp: Date.now(),
      });

      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ChatBubble
            email={item.email}
            message={item.text}
            isOwnMessage={item.email === personalData?.email}
          />
        )}
        inverted={false}
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
