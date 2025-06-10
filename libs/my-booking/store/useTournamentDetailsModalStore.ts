import { AdditionalService } from "@/libs/my-booking/types/BookingOrder";
import { create } from "zustand";

interface TournamentDetailsModalState {
  isVisible: boolean;
  onClose: () => void;
  details: {
    name: string;
    description: string;
    type: string;
    period: [string, string];
    number_of_players: number;
    scale: number;
  };
}

export const useTournamentDetailsModalStore =
  create<TournamentDetailsModalState>((set) => ({
    isVisible: false,
    onClose: () => {
      useTournamentDetailsModalStore.setState({ isVisible: false });
    },
    details: {
      name: "",
      description: "",
      type: "",
      period: ["", ""],
      number_of_players: 0,
      scale: 0,
    },
  }));

export const TournamentDetailsModalController = {
  show: (details: {
    name: string;
    description: string;
    type: string;
    period: [string, string];
    number_of_players: number;
    scale: number;
  }) => useTournamentDetailsModalStore.setState({ isVisible: true, details }),
  hide: () => {
    useTournamentDetailsModalStore.setState({
      isVisible: false,
      details: {
        name: "",
        description: "",
        type: "",
        period: ["", ""],
        number_of_players: 0,
        scale: 0,
      },
    });
  },
};
