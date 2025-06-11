import { QueryClient } from "@tanstack/react-query";

export const formatDate = (date: string) => {
  // Create date object and adjust for Vietnam timezone (UTC+7)
  const dateObj = new Date(date);
  const vietnamDate = new Date(dateObj.getTime() - (7 * 60 * 60 * 1000));
  return vietnamDate.toLocaleDateString("en-US", {
    weekday: "long", 
    month: "long",
    day: "numeric",
  });
};

export const queryClient = new QueryClient();
