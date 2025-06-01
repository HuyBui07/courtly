import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import CheckBox from "@/libs/commons/design-system/components/Checkbox";

interface Service {
  id: string;
  name: string;
  price: number;
  unit: string;
}

const services: Service[] = [
  { id: "water", name: "Water Bottle", price: 10000, unit: "bottle" },
  { id: "soda", name: "Soda", price: 15000, unit: "can" },
  { id: "shuttlecock", name: "Shuttlecock", price: 50000, unit: "tube" },
  { id: "towel", name: "Towel", price: 20000, unit: "piece" },
];

interface AdditionalServicesProps {
  onServicesChange: (selectedServices: { [key: string]: number }) => void;
}

const AdditionalServices = ({ onServicesChange }: AdditionalServicesProps) => {
  const [selectedServices, setSelectedServices] = useState<{
    [key: string]: number;
  }>({});

  const handleServiceToggle = useCallback(
    (service: Service) => {
      console.log("Toggling service:", service.id);
      setSelectedServices((prevServices) => {
        const newSelectedServices = { ...prevServices };
        if (newSelectedServices[service.id]) {
          delete newSelectedServices[service.id];
        } else {
          newSelectedServices[service.id] = 1;
        }
        console.log("New services state:", newSelectedServices);
        onServicesChange(newSelectedServices);
        return newSelectedServices;
      });
    },
    [onServicesChange]
  );

  const handleQuantityChange = useCallback(
    (service: Service, quantity: number) => {
      if (quantity < 1) {
        // If quantity becomes 0, remove the service
        setSelectedServices((prevServices) => {
          const newSelectedServices = { ...prevServices };
          delete newSelectedServices[service.id];
          onServicesChange(newSelectedServices);
          return newSelectedServices;
        });
        return;
      }

      setSelectedServices((prevServices) => {
        const newSelectedServices = { ...prevServices };
        newSelectedServices[service.id] = quantity;
        onServicesChange(newSelectedServices);
        return newSelectedServices;
      });
    },
    [onServicesChange]
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Additional Services</Text>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {services.map((service) => (
            <View key={service.id} style={styles.serviceItem}>
              <Pressable
                style={styles.serviceInfo}
                onPress={() => handleServiceToggle(service)}
              >
                <CheckBox
                  checked={selectedServices[service.id] > 0}
                  onPress={() => {
                    handleServiceToggle(service);
                  }}
                  size={24}
                />
                <View style={styles.serviceDetails}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>
                    {service.price.toLocaleString("vi-VN")} VND/{service.unit}
                  </Text>
                </View>
              </Pressable>
              {selectedServices[service.id] && (
                <View style={styles.quantityControls}>
                  <IconButton
                    icon="minus"
                    size={16}
                    onPress={() =>
                      handleQuantityChange(
                        service,
                        selectedServices[service.id] - 1
                      )
                    }
                  />
                  <Text style={styles.quantityText}>
                    {selectedServices[service.id]}
                  </Text>
                  <IconButton
                    icon="plus"
                    size={16}
                    onPress={() =>
                      handleQuantityChange(
                        service,
                        selectedServices[service.id] + 1
                      )
                    }
                  />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "white",
  },
  content: {
    padding: 16,
  },
  title: {
    ...textStyles.title,
    marginBottom: 16,
  },
  scrollView: {
    maxHeight: 300,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  serviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
  },
  serviceDetails: {
    marginLeft: 8,
  },
  serviceName: {
    ...textStyles.body,
    fontWeight: "500",
  },
  servicePrice: {
    ...textStyles.bodySmall,
    color: colors.lightGray,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantityText: {
    color: colors.primary,
    fontSize: 16,
  },
});

export default AdditionalServices;
