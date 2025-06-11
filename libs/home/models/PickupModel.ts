interface PickupModel {
  id: string;
  court_booking_id: string;
  user_id: string;
  maximum_pickup: number;
  participant_ids: string[];
  message: string;
  pickup_level: string;
  start_time: string;
}

export default PickupModel;