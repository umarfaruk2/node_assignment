import { pool } from "../../config/config.db.js";
import bcrypt from "bcryptjs";


interface Ipayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export const signupUserService = async (payload: Ipayload) => {
   const {name, email, password, phone, role} = payload;
   const hashPass = await bcrypt.hash(password as string, 10);
   const result = await pool.query(`INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`, [name, email, hashPass, phone, role]);

   return result.rows[0];
}
