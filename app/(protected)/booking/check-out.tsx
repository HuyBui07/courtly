import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";
import { API_BASE_URL } from "@/libs/commons/constants";
import { usePaymentSuccess } from "@/libs/my-booking/hooks/mutations/usePaymentSuccess";
import { textStyles } from "@/libs/commons/design-system/styles";
import { colors } from "@/libs/commons/design-system/colors";
import { Ionicons } from "@expo/vector-icons";

const CheckOut = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [visible, setVisible] = useState(false);
  const { mutate: handlePaymentSuccess } = usePaymentSuccess();
  // Parse the booking order from the URL params
  const bookingOrder = params.bookingOrder
    ? JSON.parse(params.bookingOrder as string)
    : null;
  console.log(bookingOrder);

  // Construct the payment URL with the booking order
  const paymentUrl = `${API_BASE_URL}/create-payment?bookingOrder=${encodeURIComponent(
    JSON.stringify(bookingOrder)
  )}`;

  const handleNavigationStateChange = async (navState: any) => {
    const { url } = navState;
    const urlObj = new URL(url);
    const orderCode = urlObj.searchParams.get("orderCode");
    const paymentStatus = urlObj.searchParams.get("status");

    if (url.includes("/success?code=00")) {
      // Handle successful payment

      // Only run once by checking visible state
      setVisible(true); // Set visible to prevent running again
      handlePaymentSuccess({
        orderCode: orderCode!,
        paymentStatus: paymentStatus!,
      });
    }

    if (url.includes("/cancel")) {
      // Handle failed payment
      router.back();
      console.log("Payment failed");
    }

    // if
  };

  return (
    <>
      {!visible && (
        <WebView
          webviewDebuggingEnabled
          source={{ uri: paymentUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          startInLoadingState={true}
        />
      )}

      {visible && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <LottieView
            source={require("../../../assets/gifs/success_pay.json")}
            autoPlay
            loop={false}
            style={{
              width: 200,
              height: 200,
            }}
          />
          <Text style={textStyles.title}>Successfully paid!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(protected)/booking")}
          >
            <Ionicons name="home" size={24} color="white" />
            <Text
              style={[
                textStyles.body,
                { color: "white", includeFontPadding: false },
              ]}
            >
              Back to booking
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
  },
});
