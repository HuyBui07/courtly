import { View } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";

import { useState } from "react";
import { Link } from "expo-router";

const Login = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
      }}
    >
      <Text variant="headlineSmall" style={{ alignSelf: "center" }}>
        login
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
      <Button mode="contained" style={{ marginTop: 16 }} onPress={() => {}}>
        Sign in
      </Button>
      <Text style={{ alignSelf: "center", marginTop: 16 }}>
        Don't have an account? <Link href="/(auth)/signup">Click here</Link>
      </Text>
    </View>
  );
};

export default Login;
