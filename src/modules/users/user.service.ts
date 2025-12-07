import { pool } from "../../config/config.db.js";


export const getAllUserService = async () => {
  const result = await pool.query(`SELECT id, name, email, phone, role FROM users`);

  return result.rows;
}

interface Ipayload {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  [key: string]: any
}

export const updateUserService = async (payload: Ipayload, id: string) => {
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
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING id, name, email, phone, role
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
}
