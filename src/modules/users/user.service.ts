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


export const deleteUserService = async (id: string) => {
  const bookingInfo = await pool.query(`SELECT * FROM bookings WHERE customer_id = $1`, [id]);

  if(bookingInfo.rows[0]?.status === "active") {
    return {
      success: false,
      message: "You can't delete this user,This user have active booking"
    }
  }
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

  return {
    success: true,
    result: result
  };
}
