export type AdditionalService = {
  service_id: string;
  quantity: number;
};

export type BookingOrder = {
  courts: {
    court_id: number;
    start_time: string;
    end_time: string;
    allow_pickup: boolean;
  }[];
  additional_services: {
    service_id: string;
    quantity: number;
  }[];
  total_price: number;
};
