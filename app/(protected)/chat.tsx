import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard } from "react-native";
import { TextInput } from "react-native-paper";
import { Image } from "expo-image";
import ChatBubble from "@/libs/chat/components/ChatBubble";
import DateBreakline from "@/libs/chat/components/DateBreakline";

const Chat = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(80); // Default margin

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardOffset(10); // Set margin to keyboard height
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOffset(80); // Reset margin when the keyboard is hidden
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ChatBubble
        message="hello, ten toi la GIa huy, hahahahahahahahahhahahahahhahahahahahahahakjsdksakdjsakdjkadkjskajkdjsk"
        avatarUrl="https://gravatar.com/avatar/25b4e345b680031a8c532599f1e9ad23?s=400&d=robohash&r=x"
      />

      <ChatBubble message="hello, ten toi la GIa huy, hahahahahahahahahhahahahahhahahahahahahahakjsdksakdjsakdjkadkjskajkdjsk" />

      <DateBreakline date="Monday" />

      <TextInput
        mode="outlined"
        style={[styles.input, { marginBottom: keyboardOffset }]}
        right={<TextInput.Icon icon="send" />}
        outlineStyle={{
          borderRadius: 50,
        }}
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
