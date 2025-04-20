import { create } from "zustand";

const useBookingOrderStore = create((set) => ({
  date: "",
  details: [],
  setDate: (date: string) => set({ date }),
  setDetails: (
    details: { courtId: number; startTime: string; totalHours: number }[]
  ) => set({ details }),
  // addDetail: (detail: { courtId: number; startTime: string; totalHours: number }) =>
  //   set((state) => ({
  //     details: [...state.details, detail],
  //   })),
}));

export default useBookingOrderStore;
