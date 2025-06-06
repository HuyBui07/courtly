import { View, Text, ScrollView } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import React, { useState, useEffect, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import InformationBar from "@/libs/my-booking/components/InformationBar";
import BookingCalendar from "@/libs/my-booking/components/BookingCalendar";
import BottomSheet from "@/libs/my-booking/components/BottomSheet";
import AdditionalServices from "@/libs/my-booking/components/AdditionalServices";
import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import { useGetAllBookedCourts } from "@/libs/my-booking/hooks/queries/useGetAllBookedCourts";

const BookCourt = () => {
  const defaultStyles = useDefaultStyles("light");

  // Date picker
  const [date, setDate] = useState<DateType>(new Date());

  const [show, setShow] = useState(false);

  const selectDate = (date: DateType) => {
    setDate(date);
    setShow(false);
  };

  // Get all booked courts on specific date
  const dateString = date ? new Date(date as Date).toISOString().split("T")[0] : "";
  const { data: bookedCourts, isLoading } = useGetAllBookedCourts(
    dateString ?? ""
  );

  const createRange = (start: number, end: number) => {
    return Array.from({ length: end - start }, (_, i) => start + i); 
  };

  const [court1BookedIndex, setCourt1BookedIndex] = useState<number[]>([]);
  const [court2BookedIndex, setCourt2BookedIndex] = useState<number[]>([]);
  const [court3BookedIndex, setCourt3BookedIndex] = useState<number[]>([]);
  const [court4BookedIndex, setCourt4BookedIndex] = useState<number[]>([]);

  useEffect(() => {
    console.log("bookedCourts: ", bookedCourts);
    if (bookedCourts) {
      const court1: number[] = [];
      const court2: number[] = [];
      const court3: number[] = [];
      const court4: number[] = [];

      bookedCourts.forEach((booking: any) => {
        const range = createRange(booking.start_time_index, booking.end_time_index);
        switch (booking.court_id) {
          case 1:
            court1.push(...range);
            break;
          case 2:
            court2.push(...range);
            break;
          case 3:
            court3.push(...range);
            break;
          case 4:
            court4.push(...range);
            break;
        }
      });

      setCourt1BookedIndex(court1);
      setCourt2BookedIndex(court2);
      setCourt3BookedIndex(court3);
      setCourt4BookedIndex(court4);
    }
  }, [bookedCourts, date]);

  const [selectedTimeBlockIndexesCourt1, setSelectedTimeBlockIndexesCourt1] =
    useState<number[]>([]);
  const [selectedTimeBlockIndexesCourt2, setSelectedTimeBlockIndexesCourt2] =
    useState<number[]>([]);
  const [selectedTimeBlockIndexesCourt3, setSelectedTimeBlockIndexesCourt3] =
    useState<number[]>([]);
  const [selectedTimeBlockIndexesCourt4, setSelectedTimeBlockIndexesCourt4] =
    useState<number[]>([]);

  const [selectedServices, setSelectedServices] = useState<{ [key: string]: number }>({});

  const handleServicesChange = useCallback((services: { [key: string]: number }) => {
    setSelectedServices(services);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ gap: 16, paddingTop: 24, paddingBottom: 140 }}>
          <Button
            rippleColor={"white"}
            onPress={() => setShow(true)}
            mode="contained"
            icon="calendar"
            labelStyle={{ color: "black", ...textStyles.body }}
            style={{
              width: "40%",
              borderRadius: 5,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: colors.lightGray,
              justifyContent: "space-between",
            }}
          >
            {date?.toLocaleString("en-US", {}).split(",")[0]}
          </Button>

          <Portal>
            <Modal
              visible={show}
              dismissable={true}
              onDismiss={() => setShow(false)}
            >
              <DateTimePicker
                mode="single"
                minDate={new Date()}
                date={date}
                onChange={({ date }) => selectDate(date)}
                styles={{
                  ...defaultStyles,
                  day_label: { color: "black" },
                  selected: { backgroundColor: colors.primary },
                  selected_label: { color: "white" },
                  today: {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: colors.primary,
                  },
                  today_label: { color: colors.primary },
                  button_next_image: {
                    tintColor: "black",
                  },
                  button_prev_image: {
                    tintColor: "black",
                  },
                }}
                style={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  marginHorizontal: 16,
                  padding: 16,
                }}
                disableYearPicker
              />
            </Modal>
          </Portal>

          <InformationBar />
          <BookingCalendar
            isToday={date ? new Date(date as Date).toDateString() === new Date().toDateString() : false}
            selectedTimeBlockIndexesCourt1={selectedTimeBlockIndexesCourt1}
            setSelectedTimeBlockIndexesCourt1={setSelectedTimeBlockIndexesCourt1}
            bookedCourt1={court1BookedIndex}
            selectedTimeBlockIndexesCourt2={selectedTimeBlockIndexesCourt2}
            setSelectedTimeBlockIndexesCourt2={setSelectedTimeBlockIndexesCourt2}
            bookedCourt2={court2BookedIndex}
            selectedTimeBlockIndexesCourt3={selectedTimeBlockIndexesCourt3}
            setSelectedTimeBlockIndexesCourt3={setSelectedTimeBlockIndexesCourt3}
            bookedCourt3={court3BookedIndex}
            selectedTimeBlockIndexesCourt4={selectedTimeBlockIndexesCourt4}
            setSelectedTimeBlockIndexesCourt4={setSelectedTimeBlockIndexesCourt4}
            bookedCourt4={court4BookedIndex}
          />

          <AdditionalServices onServicesChange={handleServicesChange} />
        </View>
      </ScrollView>

      <BottomSheet
        date={date ? new Date(date as Date).toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: "2-digit",
        })
        : ""}
        selectedTimeBlockIndexesCourt1={selectedTimeBlockIndexesCourt1}
        selectedTimeBlockIndexesCourt2={selectedTimeBlockIndexesCourt2}
        selectedTimeBlockIndexesCourt3={selectedTimeBlockIndexesCourt3}
        selectedTimeBlockIndexesCourt4={selectedTimeBlockIndexesCourt4}
        selectedServices={selectedServices}
      />
    </GestureHandlerRootView>
  );
};

export default BookCourt;
