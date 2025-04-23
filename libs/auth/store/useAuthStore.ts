import { create } from "zustand";
import { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  login: ({ _id, name, email, avatar, phone, role }: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: ({ _id, name, email, avatar, phone, role }: User) => {
    set({ user: { _id, name, email, avatar, phone, role }, token: "123" });
  },
  logout: () => set({ token: null, user: null }),
}));

export default useAuthStore;
