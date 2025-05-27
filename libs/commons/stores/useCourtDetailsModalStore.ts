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
  }) => useCourtDetailsModalStore.setState({ isVisible: true, details }),
  hide: () => useCourtDetailsModalStore.setState({ isVisible: false }),
};
