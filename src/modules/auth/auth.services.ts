import { pool } from "../../config/config.db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";


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


export const signinUserService = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

  if(result.rows.length === 0) {
    return {
      success: false,
      message: "Email or Password is incorrect"
    };
  }

  const user = result.rows[0];
  const passComp = await bcrypt.compare(password, user.password);

  if(!passComp) {
    return {
      success: false,
      message: "Email or Password is incorrect"
    }
  }
  delete user.password;

  const token = jwt.sign({name: user.name, email: user.email, role: user.role}, config.jwt_secret as string, {
    expiresIn: "1d"
  });

  return {token, user};
}
