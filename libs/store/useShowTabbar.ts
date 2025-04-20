import { create } from "zustand";

const useShowTabbarStore = create((set) => ({
  showTabbar: false,
  setShowTabbar: (showTabbar: boolean) => set({ showTabbar }),
}));

export default useShowTabbarStore;
