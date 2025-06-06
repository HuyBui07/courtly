interface PickupModel {
  id: string;
  court_booking_id: string;
  maximum_pickup: number;
  participant_ids: string[];
  message: string;
  pickup_level: string;
}

export default PickupModel;