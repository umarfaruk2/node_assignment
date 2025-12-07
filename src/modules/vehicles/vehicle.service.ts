import { pool } from "../../config/config.db.js";

interface Ipayload {
  vehicle_name?: string;
  type?: string;
  registration_number?: string;
  daily_rent_price?: number;
  availability_status?: string;
  [key: string]: any;
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


export const updateVehicleService = async (payload: Ipayload, id: string)=> {

  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;


  for (const key in payload) {
    if (payload[key] !== undefined) {
      fields.push(`${key} = $${index}`);
      values.push(payload[key]);
      index++;
    }
  }

  values.push(id);

  const query = `
    UPDATE vehicles
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
}

export const deleteVehicleService = async (id: string)=> {
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);

  return result;
}
