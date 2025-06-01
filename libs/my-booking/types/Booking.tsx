import { AdditionalService } from './BookingOrder';

export type Booking = {
    _id: string;
    court_id: number;
    start_time: string;
    end_time: string;
    state: string;
    created_at: string;
    additional_services?: AdditionalService[];
}