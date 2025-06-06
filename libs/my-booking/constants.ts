import { API_BASE_URL } from '@/libs/commons/constants'

export const timeBlocks = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export const GET_USER_BOOKINGS_URL = `${API_BASE_URL}/getUserBookings`;
export const GET_ALL_BOOKED_COURT_ON_SPECIFIC_DATE_URL = `${API_BASE_URL}/getAllBookingsOnASpecificDate`;
export const BOOK_COURT_URL = `${API_BASE_URL}/bookCourt`;