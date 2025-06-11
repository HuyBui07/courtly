import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      containerStyle={styles.modalContainer}
    >
      <View style={styles.headerContainer}>
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
        <View style={styles.detailsContainer}>
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
        <View style={[styles.buttonContainer, { marginTop: 16 }]}>
          {details.isJoinable && !details.isPickedUp && (
            <TouchableOpacity
              onPress={() => {
                setIsPickupModalVisible(true);
              }}
              style={styles.pickupButton}
            >
              <Icon source="account-plus" size={20} color="white" />
              <Text style={[textStyles.bodyBold, styles.buttonText]}>
                Pick up
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              console.log("cancel");
              console.log(details.onCancel);
              details.onCancel?.();
              setIsPickupModalVisible(false);
            }}
            style={styles.cancelButton}
          >
            <Icon source="close" size={20} color="white" />
            <Text style={[textStyles.bodyBold, styles.buttonText]}>
              {details.isPickedUp ? "Cancel Pickup" : "Cancel"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isPickupModalVisible && (
        <Animated.View
          style={styles.pickupModalContainer}
          entering={StretchInY}
          exiting={StretchOutY}
        >
          <View style={styles.pickupInputRow}>
            <View style={styles.pickupInputColumn}>
              <Text style={[textStyles.bodyBold, styles.inputLabel]}>
                Level:
              </Text>
              <LevelFilterDropdown
                onSelect={(item) => {
                  formik.setFieldValue("pickup_level", item.value);
                }}
              />
            </View>
            <View style={styles.pickupInputColumn}>
              <Text style={[textStyles.bodyBold, styles.inputLabel]}>
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
          <View style={styles.pickupButtonRow}>
            <TouchableOpacity
              onPress={() => {
                setIsPickupModalVisible(false);
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
              <Icon source="close" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => formik.handleSubmit()}
              style={styles.openButton}
            >
              <Text style={styles.buttonText}>Open</Text>
              <Icon source="check" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <IconButton
        icon="close"
        size={24}
        onPress={() => {
          CourtDetailsModalController.hide();
        }}
        style={styles.closeButton}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "80%",
    paddingVertical: 32,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
    justifyContent: "space-between",
  },
  detailsContainer: {
    alignItems: "flex-start",
    width: "100%",
    gap: 8,
  },
  buttonContainer: {
    gap: 16,
    flexDirection: "row",
    width: "100%",
    marginTop: 16,
  },
  pickupButton: {
    height: 50,
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "red",
    height: 50,
    // paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  openButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pickupModalContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 16,
    marginVertical: 8,
    backgroundColor: colors.superLightPrimary,
    padding: 16,
    borderRadius: 12,
  },
  pickupInputRow: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  pickupInputColumn: {
    flex: 1,
  },
  inputLabel: {
    marginBottom: 8,
  },
  pickupButtonRow: {
    flexDirection: "row",
    gap: 8,
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 4,
  },
});
