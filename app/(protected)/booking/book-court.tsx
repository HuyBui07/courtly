import { View, Text } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import InformationBar from "@/libs/my-booking/components/InformationBar";
import BookingCalendar from "@/libs/my-booking/components/BookingCalendar";
import BottomSheet from "@/libs/my-booking/components/BottomSheet";
import { colors } from "@/libs/commons/design-system/colors";
import { textStyles } from "@/libs/commons/design-system/styles";
import { BookingOrder } from "@/libs/my-booking/types";

const BookCourt = () => {
  const defaultStyles = useDefaultStyles("light");

  // Date picker
  const [date, setDate] = useState<DateType>(new Date());
  const [show, setShow] = useState(false);

  const selectDate = (date: DateType) => {
    setDate(date);
    setShow(false);
  };

  // Booking courts
  const [selectedTimeBlockIndexesCourt1, setSelectedTimeBlockIndexesCourt1] =
    useState<number[]>([]);
  const [selectedTimeBlockIndexesCourt2, setSelectedTimeBlockIndexesCourt2] =
    useState<number[]>([]);
  const [selectedTimeBlockIndexesCourt3, setSelectedTimeBlockIndexesCourt3] =
    useState<number[]>([]);
  const [selectedTimeBlockIndexesCourt4, setSelectedTimeBlockIndexesCourt4] =
    useState<number[]>([]);

  return (
    <GestureHandlerRootView>
      <View
        style={{ flex: 1, gap: 16, paddingTop: 24, backgroundColor: "white" }}
      >
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
          selectedTimeBlockIndexesCourt1={selectedTimeBlockIndexesCourt1}
          setSelectedTimeBlockIndexesCourt1={setSelectedTimeBlockIndexesCourt1}
          selectedTimeBlockIndexesCourt2={selectedTimeBlockIndexesCourt2}
          setSelectedTimeBlockIndexesCourt2={setSelectedTimeBlockIndexesCourt2}
          selectedTimeBlockIndexesCourt3={selectedTimeBlockIndexesCourt3}
          setSelectedTimeBlockIndexesCourt3={setSelectedTimeBlockIndexesCourt3}
          selectedTimeBlockIndexesCourt4={selectedTimeBlockIndexesCourt4}
          setSelectedTimeBlockIndexesCourt4={setSelectedTimeBlockIndexesCourt4}
        />

        <BottomSheet
          date={date?.toLocaleString("en-US", {}).split(",")[0]}
          selectedTimeBlockIndexesCourt1={selectedTimeBlockIndexesCourt1}
          selectedTimeBlockIndexesCourt2={selectedTimeBlockIndexesCourt2}
          selectedTimeBlockIndexesCourt3={selectedTimeBlockIndexesCourt3}
          selectedTimeBlockIndexesCourt4={selectedTimeBlockIndexesCourt4}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default BookCourt;
