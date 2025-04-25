import { View } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";
import { Link, router } from "expo-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useLogin } from "@/libs/auth/hooks";

const loginSchema = Yup.object().shape({
  email: Yup.string().required("User name is required"),
  pass: Yup.string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

const Login = () => {
  const theme = useTheme();
  const { mutate } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: loginSchema,
    onSubmit: (value) => {
      mutate(value, {
        onSuccess: (response) => {
          router.push("/(protected)/home");
        },
        onError: (error) => {
          console.error(error);
        },
      });
    },
  });

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
        <Link href="/(protected)/home">Login</Link>
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
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        left={<TextInput.Icon icon="email" />}
        error={!!formik.errors.email && formik.touched.email}
      />

      {formik.touched.email && formik.errors.email && (
        <Text
          variant="bodySmall"
          style={{
            color: theme.colors.error,
            marginTop: 8,
            marginLeft: 4,
          }}
        >
          {formik.errors.email}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={formik.values.pass}
        onChangeText={formik.handleChange("pass")}
        left={<TextInput.Icon icon="lock" />}
        error={!!formik.errors.pass && formik.touched.pass}
      />

      {formik.touched.pass && formik.errors.pass && (
        <Text
          variant="bodySmall"
          style={{
            color: theme.colors.error,
            marginTop: 8,
            marginLeft: 4,
          }}
        >
          {formik.errors.pass}
        </Text>
      )}

      <Button
        mode="contained"
        style={{ marginTop: 40 }}
        onPress={() => formik.handleSubmit()}
      >
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

      <Text style={{ alignSelf: "center", marginTop: 24 }}>
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
