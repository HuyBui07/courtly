export type AdditionalService = {
  service_id: string;
  quantity: number;
};

export type BookingOrder = {
  courts: {
    court_id: number;
    start_time: string;
    end_time: string;
  }[];
  additional_services?: AdditionalService[];
  total_price: number;
};
