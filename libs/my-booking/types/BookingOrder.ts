export type BookingOrder = {
  date: string;
  details: [
    {
      courtId: number;
      startTime: string;
      totalHours: number;
      price: number;
    }
  ];
};
