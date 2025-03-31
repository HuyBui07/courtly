import { View, Alert } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";
import { useState } from "react";
import { Link } from "expo-router";

const SignUp = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái tải

  const handleSignUp = async () => {
    // Kiểm tra dữ liệu nhập vào
    if (!email || !contactNumber || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true); // Bắt đầu tải

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contactNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Registration successful!");
      } else {
        Alert.alert("Error", data.error || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to the server.");
    } finally {
      setLoading(false); // Dừng tải
    }
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
          marginBottom: 40,
          fontWeight: "bold",
        }}
      >
        Signup
      </Text>
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon="email" />}
        autoCapitalize="none"
      />

      <TextInput
        mode="outlined"
        label="Contact Number"
        style={{ marginTop: 16 }}
        value={contactNumber}
        onChangeText={setContactNumber}
        left={<TextInput.Icon icon="phone" />}
        keyboardType="phone-pad"
      />

      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={password}
        onChangeText={setPassword}
        left={<TextInput.Icon icon="lock" />}
      />

      <TextInput
        mode="outlined"
        label="Confirm Password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        left={<TextInput.Icon icon="lock" />}
      />

      <Button
        mode="contained"
        style={{ marginTop: 40 }}
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
      >
        <Text
          variant="bodyLarge"
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          {loading ? "Signing up..." : "Sign up"}
        </Text>
      </Button>

      <Text style={{ alignSelf: "center", marginTop: 24 }}>
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
