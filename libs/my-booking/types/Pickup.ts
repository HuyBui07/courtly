import { Booking } from "./Booking";

export type Pickup = Booking & {
  pickup_id: string;
};