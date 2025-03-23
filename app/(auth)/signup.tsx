import { View } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";

import { useState } from "react";
import { Link } from "expo-router";

const SignUp = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
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
      <Text
        variant="headlineLarge"
        style={{
          alignSelf: "center",
          color: theme.colors.primary,
          marginBottom: 40,
        }}
      >
        Signup
      </Text>
      <TextInput
        mode="outlined"
        label="Email"
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        left={<TextInput.Icon icon="email" />}
      />

      <TextInput
        mode="outlined"
        label="Contact Number"
        placeholder="contact number"
        style={{ marginTop: 16 }}
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
        left={<TextInput.Icon icon="phone" />}
      />

      <TextInput
        mode="outlined"
        label="Password"
        placeholder="password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        left={<TextInput.Icon icon="lock" />}
      />

      <TextInput
        mode="outlined"
        label="Confirm Password"
        placeholder="confirm password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        left={<TextInput.Icon icon="lock" />}
      />

      <Button mode="contained" style={{ marginTop: 32 }} onPress={() => {}}>
        Sign Up
      </Button>
      <Text style={{ alignSelf: "center", position: "absolute", bottom: 48 }}>
        Already have an account?{" "}
        <Link
          href="/(auth)/login"
          style={{
            color: theme.colors.primary,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Click here
        </Link>
      </Text>
    </View>
  );
};

export default SignUp;
