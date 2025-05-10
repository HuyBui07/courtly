import { create } from "zustand"

interface LoadingState {
  isLoading: boolean
  setLoading: (value: boolean) => void
}

export const useLoadingState = create<LoadingState>(set => ({
  isLoading: false,
  setLoading: loading => {
    console.log("loading", loading)
    set({ isLoading: loading })
  },
}))

export const LoadingStateController = {
  setLoading: (value: boolean) => {
    useLoadingState.getState().setLoading(value);
  },
};
