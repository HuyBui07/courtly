import { AdditionalService } from "@/libs/my-booking/types/BookingOrder";
import { create } from "zustand";

interface CourtDetailsModalState {
  isVisible: boolean;
  onClose: () => void;
  details: {
    court: string;
    date: string;
    time: string;
    duration: string;
    price: string;
    status: string;
    additionalServices?: AdditionalService[];
    onCancel?: () => void;
  };
}

export const useCourtDetailsModalStore = create<CourtDetailsModalState>(
  (set) => ({
    isVisible: false,
    onClose: () => {
      useCourtDetailsModalStore.setState({ isVisible: false });
    },
    details: {
      court: "",
      date: "",
      time: "",
      duration: "",
      price: "",
      status: "",
      additionalServices: [],
      onCancel: undefined,
    },
  })
);

export const CourtDetailsModalController = {
  show: (details: {
    court: string;
    date: string;
    time: string;
    duration: string;
    price: string;
    status: string;
    additionalServices?: AdditionalService[];
    onCancel?: () => void;
  }) => useCourtDetailsModalStore.setState({ isVisible: true, details }),
  hide: () => useCourtDetailsModalStore.setState({ isVisible: false }),
};
