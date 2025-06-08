import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { Icon, IconButton, TextInput } from "react-native-paper";

import Modal from "@/libs/commons/design-system/components/Modal";
import { InformationLine } from "./InformationLine";

import { textStyles } from "@/libs/commons/design-system/styles";
import {
  CourtDetailsModalController,
  useCourtDetailsModalStore,
} from "@/libs/commons/stores/useCourtDetailsModalStore";
import { colors } from "@/libs/commons/design-system/colors";
import { useEffect, useState } from "react";
import { StretchInY, StretchOutY } from "react-native-reanimated";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LevelFilterDropdown } from "./LevelDropdown";
import { MaximumFilterDropdown } from "./MaximumDropdown";
import { useCreatePickup } from "../hooks/mutations/useCreatePickup";

const pickupSchema = Yup.object().shape({
  pickup_level: Yup.string().required("Pickup level is required"),
  message: Yup.string().optional(),
  maximum_pickup: Yup.number().required("Maximum pickup is required"),
});

export const CourtDetailsModal = () => {
  const { isVisible, details } = useCourtDetailsModalStore();
  const [isPickupModalVisible, setIsPickupModalVisible] = useState(false);
  const { mutate: createPickup } = useCreatePickup();

  useEffect(() => {
    if (!isVisible) {
      setIsPickupModalVisible(false);
    }
  }, [isVisible]);

  const formik = useFormik({
    initialValues: {
      pickup_level: "A",
      message: "",
      maximum_pickup: 1,
    },
    validationSchema: pickupSchema,
    onSubmit: (values) => {
      createPickup({
        court_booking_id: details.court_booking_id,
        pickup_level: values.pickup_level,
        message: values.message,
        maximum_pickup: values.maximum_pickup,
      });
      CourtDetailsModalController.hide();
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={CourtDetailsModalController.hide}
      containerStyle={{ width: "80%", paddingVertical: 32 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <Text style={textStyles.titleSmall}>
          {isPickupModalVisible ? "Open for pickup" : "Details"}
        </Text>
        <Icon
          source={
            isPickupModalVisible ? "account-plus" : "file-document-outline"
          }
          size={24}
        />
      </View>

      {!isPickupModalVisible && (
        <View style={{ alignItems: "flex-start", width: "100%", gap: 8 }}>
          <InformationLine title="Court" value={details.court} />
          <InformationLine title="Date" value={details.date} />
          <InformationLine title="Time" value={details.time} />
          <InformationLine title="Duration" value={details.duration} />
          <InformationLine title="Price" value={details.price} />
          <InformationLine title="Status" value={details.status} />
          {details.additionalServices &&
            details.additionalServices.length > 0 && (
              <InformationLine
                title="Additional Services"
                value={details.additionalServices
                  .map(
                    (service) => service.service_id + " x " + service.quantity
                  )
                  .join(", ")}
              />
            )}
        </View>
      )}

      {!isPickupModalVisible && (
        <View style={{ gap: 16, flexDirection: "row", width: "100%" }}>
          {details.isJoinable && !details.isPickedUp && (
            <TouchableOpacity
              onPress={() => {
                setIsPickupModalVisible(true);
              }}
              style={{
                marginTop: 16,
                height: 50,
                flex: 1,
                backgroundColor: colors.primary,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon source="account-plus" size={20} color="white" />
              <Text style={{ ...textStyles.bodyBold, color: "white" }}>
                Pick up
              </Text>
            </TouchableOpacity>
          ) }

          <TouchableOpacity
            onPress={details.onCancel}
            disabled={!details.onCancel}
            style={{
              marginTop: 16,
              height: 50,
              flex: 1,
              backgroundColor: "red",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon source="close" size={20} color="white" />
            <Text style={{ ...textStyles.bodyBold, color: "white" }}>
              {details.isPickedUp ? "Cancel Pickup" : "Cancel Booking"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isPickupModalVisible && (
        <Animated.View
          style={{
            width: "100%",
            flexDirection: "column",
            gap: 16,
            marginVertical: 8,
            backgroundColor: colors.superLightPrimary,
            padding: 16,
            borderRadius: 12,
          }}
          entering={StretchInY}
          exiting={StretchOutY}
        >
          <View style={{ flexDirection: "row", gap: 16, width: "100%" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 8, ...textStyles.bodyBold }}>
                Level:
              </Text>
              <LevelFilterDropdown
                onSelect={(item) => {
                  formik.setFieldValue("pickup_level", item.value);
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 8, ...textStyles.bodyBold }}>
                Max Pickups:
              </Text>
              <MaximumFilterDropdown
                onSelect={(item) => {
                  formik.setFieldValue("maximum_pickup", item.value);
                }}
                initialValues={{ value: 1, label: "1" }}
              />
            </View>
          </View>

          <TextInput
            mode="outlined"
            label="Message"
            value={formik.values.message}
            onChangeText={formik.handleChange("message")}
            error={!!formik.errors.message && formik.touched.message}
            multiline
          />
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              onPress={() => setIsPickupModalVisible(false)}
              style={{
                flex: 1,
                backgroundColor: "red",
                paddingVertical: 16,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
              <Icon source="close" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => formik.handleSubmit()}
              style={{
                flex: 1,
                backgroundColor: colors.primary,
                paddingVertical: 16,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Open</Text>
              <Icon source="check" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <IconButton
        icon="close"
        size={24}
        onPress={() => {
          // setIsPickupModalVisible(false);
          CourtDetailsModalController.hide();
        }}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
        }}
      />
    </Modal>
  );
};
