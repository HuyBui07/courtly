import { QueryClient } from "@tanstack/react-query";

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export const queryClient = new QueryClient();
