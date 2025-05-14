import { View, Keyboard, TouchableOpacity } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";
import * as Yup from "yup";
import { router } from "expo-router";
import { useFormik } from "formik";

import { useSignup } from "@/libs/auth/hooks";
import { LoadingStateController } from "@/libs/commons/stores/useLoadingState";
import { NotificationModalController } from "@/libs/commons/stores/useNotificationModalStore";

const signupSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  contactNumber: Yup.string().required("Contact number is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignUp = () => {
  const theme = useTheme();
  const { mutate } = useSignup();

  const formik = useFormik({
    initialValues: {
      email: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (value) => {
      LoadingStateController.setLoading(true);
      mutate(
        {
          email: value.email,
          contactNumber: value.contactNumber,
          pass: value.password,
        },
        {
          onSuccess: () => {
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
        }
      );
    },
  });

  const handleSubmit = () => {
    Keyboard.dismiss();
    formik.handleSubmit();
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
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        left={<TextInput.Icon icon="email" />}
        error={!!formik.errors.email && formik.touched.email}
        autoCapitalize="none"
      />

      {formik.touched.email && formik.errors.email && (
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.error, marginTop: 8, marginLeft: 4 }}
        >
          {formik.errors.email}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Contact Number"
        style={{ marginTop: 16 }}
        value={formik.values.contactNumber}
        onChangeText={formik.handleChange("contactNumber")}
        left={<TextInput.Icon icon="phone" />}
        error={!!formik.errors.contactNumber && formik.touched.contactNumber}
        inputMode="numeric"
      />

      {formik.touched.contactNumber && formik.errors.contactNumber && (
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.error, marginTop: 8, marginLeft: 4 }}
        >
          {formik.errors.contactNumber}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        left={<TextInput.Icon icon="lock" />}
        error={!!formik.errors.password && formik.touched.password}
        autoCapitalize="none"
      />

      {formik.touched.password && formik.errors.password && (
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.error, marginTop: 8, marginLeft: 4 }}
        >
          {formik.errors.password}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Confirm Password"
        secureTextEntry
        style={{ marginTop: 16 }}
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange("confirmPassword")}
        left={<TextInput.Icon icon="lock" />}
        error={
          !!formik.errors.confirmPassword && formik.touched.confirmPassword
        }
        autoCapitalize="none"
      />

      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.error, marginTop: 8, marginLeft: 4 }}
        >
          {formik.errors.confirmPassword}
        </Text>
      )}

      <Button mode="contained" style={{ marginTop: 40 }} onPress={handleSubmit}>
        <Text
          variant="bodyLarge"
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Sign up
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
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)")}>
          <Text
            variant="bodyMedium"
            style={{
              fontFamily: "Poppins-Bold",
              color: theme.colors.primary,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
