import { create } from "zustand";
import { storage } from "./storage";

export const useNotifications = create((set) => ({
  notifications: storage.getString("notifications") ? JSON.parse(storage.getString("notifications")!) : [],
  pushNotification: (notification: any) => {
    const existingNotifications = storage.getString("notifications") ? JSON.parse(storage.getString("notifications")!) : [];
    const updatedNotifications = [...existingNotifications, notification];
    storage.set("notifications", JSON.stringify(updatedNotifications));
    set({ notifications: updatedNotifications });
  },
  clearNotifications: () => {
    storage.delete("notifications");
    set({ notifications: [] });
  },
}));