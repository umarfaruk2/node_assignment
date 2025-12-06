import {Pool} from 'pg';
import { config } from './index.js';


export const pool = new Pool({
  connectionString: config.db_url,
});


// init db

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL CHECK (email = LOWER(email)),
      password VARCHAR(100) NOT NULL CHECK (LENGTH(password) >= 6),
      phone VARCHAR(15) NOT NULL,
      role VARCHAR(10) CHECK (role IN ('admin', 'customer')) DEFAULT 'customer'
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(50) NOT NULL,
      type VARCHAR(20) CHECK (type IN ('car', 'bike', 'van', 'SUV')),
      registration_number VARCHAR(50) NOT NULL UNIQUE,
      daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
      availability_status VARCHAR(20) CHECK (availability_status IN ('available', 'booked')) DEFAULT 'available'
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price INT NOT NULL CHECK (total_price > 0),
      status VARCHAR(20) CHECK (status IN ('active', 'cancelled', 'returned')),
      CHECK (rent_end_date > rent_start_date)
    )
  `)
}


export default initDB;


