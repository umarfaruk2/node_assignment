import { pool } from "../../config/config.db.js";


interface Ipayload {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

export const createBookingService = async (payload: Ipayload) => {
  const {customer_id, vehicle_id, rent_start_date, rent_end_date} = payload;
  const vehicle_info = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicle_id]);

  if(vehicle_info.rows[0].availability_status === "booked") {
    return {
      success: false,
      message: "This vehicle is already booked"
    }
  }
  const calculateTotalPrice = (Date.parse(rent_end_date) - Date.parse(rent_start_date)) / (1000 * 60 * 60 * 24);

  await pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`, [vehicle_id]);
  const total_price = calculateTotalPrice * vehicle_info.rows[0].daily_rent_price;
  const status = 'active';
  const result = await pool.query(`INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]); 

  return {...result.rows[0], vechile: {vehicle_name: vehicle_info.rows[0].vehicle_name, daily_rent_price: vehicle_info.rows[0].daily_rent_price}};
}


export const getBookingService = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result.rows;
}
