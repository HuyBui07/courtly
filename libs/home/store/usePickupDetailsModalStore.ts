import { create } from "zustand";

interface PickupDetailsModalState {
  isVisible: boolean;
  onClose: () => void;
  details: {
    id: string;
    court_booking_id: string;
    user_id: string;
    maximum_pickup: number;
    participant_ids: string[];
    message: string;
    pickup_level: string;
  };
}

export const usePickupDetailsModalStore = create<PickupDetailsModalState>(
  (set) => ({
    isVisible: false,
    onClose: () => {
      usePickupDetailsModalStore.setState({ isVisible: false });
    },
    details: {
      id: "",
      court_booking_id: "",
      user_id: "",
      maximum_pickup: 0,
      participant_ids: [],
      message: "",
      pickup_level: "",
    },
  })
);

export const PickupDetailsModalController = {
  show: (details: {
    id: string;
    court_booking_id: string;
    user_id: string;
    maximum_pickup: number;
    participant_ids: string[];
    message: string;
    pickup_level: string;
  }) => usePickupDetailsModalStore.setState({ isVisible: true, details }),
  hide: () => usePickupDetailsModalStore.setState({ isVisible: false }),
};
