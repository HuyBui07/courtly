import { View, Text } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";

const CheckOut = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

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
      {/* <WebView
        webviewDebuggingEnabled
        source={{ uri: paymentUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
      /> */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
        <LottieView
          source={require("../../../assets/images/party_popper.json")}
          autoPlay
          loop={false}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Text style={{fontSize: 24, marginTop: 20}}>Successful!</Text>
      </View>
    </>
  );
};

export default CheckOut;
