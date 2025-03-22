import { View } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";

import { useState } from "react";
import { Link } from "expo-router";

const SignUp = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
      }}
    >
      <Text variant="titleLarge" style={{ alignSelf: "center" }}>
        Sign Up
      </Text>
      <TextInput
        label="Email"
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        placeholder="password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        label="Confirm Password"
        placeholder="confirm password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button mode="contained" style={{ marginTop: 16 }} onPress={() => {}}>
        Sign Up
      </Button>
      <Text style={{ alignSelf: "center", marginTop: 16 }}>
        Already have an account? <Link href="/(auth)/login">Click here</Link>
      </Text>
    </View>
  );
};

export default SignUp;
