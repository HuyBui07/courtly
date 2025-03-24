import { View } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";

import { useState } from "react";
import { Link, router } from "expo-router";

const Login = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.dismissAll();
    router.replace("/(protected)/home");
  };

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
          fontWeight: "bold",
        }}
      >
        Login
      </Text>

      <Text
        variant="headlineSmall"
        style={{
          alignSelf: "center",
          marginTop: 8,
          marginBottom: 40,
          fontWeight: "bold",
        }}
      >
        Have Fun with Friends!
      </Text>

      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        left={<TextInput.Icon icon="email" />}
      />

      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        left={<TextInput.Icon icon="lock" />}
      />

      <Button mode="contained" style={{ marginTop: 40 }} onPress={handleLogin}>
        <Text
          variant="bodyLarge"
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </Button>
      
      <Text style={{ alignSelf: "center", marginTop: 24}}>
        Don't have an account?{" "}
        <Link
          href="/(auth)/signup"
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

export default Login;
