import { pool } from "../../config/config.db.js";


interface Ipayload {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

export const createBookingService = (payload: Ipayload) => {

}
