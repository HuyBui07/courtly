import { View, Text } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";

const CheckOut = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [paymentUrl, setPaymentUrl] = useState("");
  // const paymentUrl = "http://192.168.1.21:8080/create-payment";

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;

    if (url.includes("/success")) {
      // Handle successful payment
      // router.replace("/booking/booking-success");
      setVisible(true);
      console.log("Payment successful");
    }

    if (url.includes("/cancel")) {
      // Handle failed payment
      // router.replace("/booking/booking-failed");
      router.back();
      console.log("Payment failed");
    }
  };

  return (
    <>
      <WebView
        webviewDebuggingEnabled
        source={{ uri: paymentUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
      />
      <Portal>
        <Modal visible={visible}>
          <LottieView
            source={require("../../../assets/images/party_popper.json")}
            autoPlay
            loop={false}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 2,
            }}
          />
          <View>
            <Text>Successful!</Text>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default CheckOut;
