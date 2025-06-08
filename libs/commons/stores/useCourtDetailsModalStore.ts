import { AdditionalService } from "@/libs/my-booking/types/BookingOrder";
import { create } from "zustand";

interface CourtDetailsModalState {
  isVisible: boolean;
  onClose: () => void;
  details: {
    court_booking_id: string;
    court: string;
    date: string;
    time: string;
    duration: string;
    price: string;
    status: string;
    additionalServices?: AdditionalService[];
    onCancel?: () => void;
    isJoinable?: boolean;
    isPickedUp?: boolean;
  };
}

export const useCourtDetailsModalStore = create<CourtDetailsModalState>(
  (set) => ({
    isVisible: false,
    onClose: () => {
      useCourtDetailsModalStore.setState({ isVisible: false });
    },
    details: {
      court_booking_id: "",
      court: "",
      date: "",
      time: "",
      duration: "",
      price: "",
      status: "",
      additionalServices: [],
      onCancel: undefined,
      isJoinable: false,
      isPickedUp: false,
    },
  })
);

export const CourtDetailsModalController = {
  show: (details: {
    court_booking_id: string;
    court: string;
    date: string;
    time: string;
    duration: string;
    price: string;
    status: string;
    additionalServices?: AdditionalService[];
    onCancel?: () => void;
    isJoinable?: boolean;
    isPickedUp?: boolean;
  }) => useCourtDetailsModalStore.setState({ isVisible: true, details }),
  hide: () => {
    useCourtDetailsModalStore.setState({
      isVisible: false,
      details: {
        court_booking_id: "",
        court: "",
        date: "",
        time: "",
        duration: "",
        price: "",
        status: "",
        additionalServices: [],
        onCancel: undefined,
        isJoinable: false,
        isPickedUp: false,
      },
    });
  },
};
