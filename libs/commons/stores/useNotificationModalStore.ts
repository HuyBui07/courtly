import { create } from "zustand"

interface NotificationModalState {
  isVisible: boolean
  title: string
  message: string
  type: "success" | "error" | "info"
}

export const useNotificationModalStore = create<NotificationModalState>(
  set => ({
    isVisible: false,
    title: "",
    message: "",
    type: "info",
  }),
)

export const NotificationModalController = {
  show: ({
    title,
    message,
    type,
  }: {
    title: string
    message: string
    type: "success" | "error" | "info"
  }) =>
    useNotificationModalStore.setState(_state => ({
      isVisible: true,
      title,
      message,
      type,
    })),
  hide: () =>
    useNotificationModalStore.setState(_state => ({ isVisible: false })),
}
