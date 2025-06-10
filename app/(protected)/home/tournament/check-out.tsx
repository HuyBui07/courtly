import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";
import { API_BASE_URL } from "@/libs/commons/constants";
import { useTournamentPaymentSuccess } from "@/libs/my-booking/hooks/mutations/useTournamentPaymentSuccess";

const CheckOut = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [visible, setVisible] = useState(false);
  const [isPopper, setIsPopper] = useState(false);

  // Call the hook at the top level
  const { mutate: handlePaymentSuccess } = useTournamentPaymentSuccess();

  // Parse the booking order from the URL params
  const tournament = params.tournament
    ? JSON.parse(params.tournament as string)
    : null;

  // Construct the payment URL with the booking order
  const paymentUrl = `${API_BASE_URL}/tournament-payment?tournament_id=${tournament?._id}`;

  const handleNavigationStateChange = async (navState: any) => {
    const { url } = navState;
    console.log(url);
    const urlObj = new URL(url);
    const newOrderCode = urlObj.searchParams.get("orderCode");
    const newPaymentStatus = urlObj.searchParams.get("status");

    if (url.includes("/tournament-success?code=00")) {
      setVisible(true);
      setIsPopper(true);
      // Handle successful payment

      if (newOrderCode && newPaymentStatus) {
        handlePaymentSuccess({
          tournamentId: tournament?._id,
          paymentStatus: newPaymentStatus,
        });
      }
    }

    if (url.includes("/tournament-cancel")) {
      // Handle failed payment
      router.back();
      console.log("Payment failed");
    }
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
      {isPopper && (
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
            source={require("../../../../assets/images/party_popper.json")}
            autoPlay
            loop={false}
            style={{
              width: 200,
              height: 200,
            }}
          />
          <Text>Thanh toán thành công!</Text>
        </View>
      )}
    </>
  );
};

export default CheckOut;
