import { create } from "zustand";
import { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  login: ({ id, name, email, image, phone, role }: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: ({ id, name, email, image, phone, role }: User) => {
    set({ user: { id, name, email, image, phone, role }, token: "123" });
  },
  logout: () => set({ token: null, user: null }),
}));

export default useAuthStore;