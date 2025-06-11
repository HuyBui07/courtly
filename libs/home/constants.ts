import { API_BASE_URL } from '@/libs/commons/constants'

export const TOURNAMENT_URL = `${API_BASE_URL}/tournament/getAll`

// Pickup
export const PICKUP_URL = `${API_BASE_URL}/pickup/getAll`
export const JOIN_PICKUP_URL = `${API_BASE_URL}/pickup/join`
export const GET_USER_INFO_BY_ID_URL = `${API_BASE_URL}/getUserInfoByID`
export const GET_PICKUP_DETAILS_URL = `${API_BASE_URL}/pickup/getBookingDetails`