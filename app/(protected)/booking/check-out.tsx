import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";
import { API_BASE_URL } from "@/libs/commons/constants";
import { usePaymentSuccess } from "@/libs/my-booking/hooks/mutations/usePaymentSuccess";

const CheckOut = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [visible, setVisible] = useState(false);
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
      if (!visible) {
        // Only run once by checking visible state
        setVisible(true); // Set visible to prevent running again
        usePaymentSuccess(orderCode!, paymentStatus!);
      }
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
      {/* <WebView
        webviewDebuggingEnabled
        source={{ uri: paymentUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
      /> */}

      {visible && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <LottieView
            source={require("../../../assets/images/party_popper.json")}
            autoPlay
            loop={false}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
      )}
    </>
  );
};

export default CheckOut;
