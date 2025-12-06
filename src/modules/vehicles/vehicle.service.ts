import { pool } from "../../config/config.db.js";

interface Ipayload {
  vehicle_name: string;
  type: string;
  registration_number: string;
  daily_rent_price: number;
  availability_status: string
}


export const createVehicleService = async (payload: Ipayload) => {
  const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;
  const result = await pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

  return result.rows[0];
}


export const getAllVehicleService = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);

  return result.rows;
}

export const getSingleVehicleService = async (id: string)=> {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);

  return result.rows[0];
}
