import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";
import { Link, router } from "expo-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useLogin } from "@/libs/auth/hooks";
import { NotificationModalController } from "@/libs/commons/stores/useNotificationModalStore";
import { LoadingStateController } from "@/libs/commons/stores/useLoadingState";
import { TokenManager } from "@/libs/store/persistStore";
import { useEffect } from "react";

const loginSchema = Yup.object().shape({
  email: Yup.string().required("User name is required"),
  pass: Yup.string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

const Login = () => {
  const checkUserSignIn = async () => {
    const token = await TokenManager.get();
    if (token) {
      console.log("token", token);
      return router.dismissTo("/(protected)/home");
    }
  };

  useEffect(() => {
    checkUserSignIn();
  }, []);

  const theme = useTheme();
  const { mutate } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: loginSchema,
    onSubmit: (value) => {
      LoadingStateController.setLoading(true);
      mutate(value, {
        onSuccess: (response) => {
          LoadingStateController.setLoading(false);
          router.dismissTo("/(protected)/home");
        },
        onError: (error) => {
          LoadingStateController.setLoading(false);
          NotificationModalController.show({
            title: "Error",
            message: error.message,
            type: "error",
          });
        },
      });
    },
  });

  const handleSubmit = () => {
    Keyboard.dismiss();
    formik.handleSubmit();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          autoCapitalize="none"
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
          autoCapitalize="none"
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
          onPress={handleSubmit}
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Text variant="bodyMedium" style={{ fontFamily: "Poppins-Regular" }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text
              variant="bodyMedium"
              style={{
                fontFamily: "Poppins-Bold",
                color: theme.colors.primary,
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
