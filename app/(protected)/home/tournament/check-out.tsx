import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";
import { API_BASE_URL } from "@/libs/commons/constants";
import { useTournamentPaymentSuccess } from "@/libs/my-booking/hooks/mutations/useTournamentPaymentSuccess";
import { textStyles } from "@/libs/commons/design-system/styles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/libs/commons/design-system/colors";

const CheckOut = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [visible, setVisible] = useState(false);

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
            source={require("../../../../assets/gifs/success_pay.json")}
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
