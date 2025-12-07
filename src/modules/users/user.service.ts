import { pool } from "../../config/config.db.js";


export const getAllUserService = async () => {
  const result = await pool.query(`SELECT id, name, email, phone, role FROM users`);

  return result.rows;
}
