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
  const total_price = Math.round(calculateTotalPrice * vehicle_info.rows[0].daily_rent_price);
  const status = 'active';

  const result = await pool.query(`INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]); 

  return {...result.rows[0], vechile: {vehicle_name: vehicle_info.rows[0].vehicle_name, daily_rent_price: vehicle_info.rows[0].daily_rent_price}};
}



export const getBookingService = async (id: number, role: string) => {

    if (role === "admin") {
      const query = `
        SELECT
          b.*,
          u.name as customer_name,
          u.email as customer_email,
          v.vehicle_name,
          v.registration_number
        FROM bookings b
        LEFT JOIN users u ON b.customer_id = u.id
        LEFT JOIN vehicles v ON b.vehicle_id = v.id
      `;

        const result = await pool.query(query);

        for (const booking of result.rows) {
        const check_rent_end_date = Date.parse(booking.rent_end_date) - Date.now();

        if (check_rent_end_date < 0 && booking.status !== 'returned') {
        await pool.query(`UPDATE bookings SET status = 'returned' WHERE id = $1`, [booking.id]);

        booking.status = 'returned';
        }
      }

      return result.rows.map(booking => ({
        ...booking,
        customer: {
          name: booking.customer_name,
          email: booking.customer_email
        },
        vehicle: {
          vehicle_name: booking.vehicle_name,
          registration_number: booking.registration_number
        },
        customer_name: undefined,
        customer_email: undefined,
        vehicle_name: undefined,
        registration_number: undefined
      }));

    } else {
      const query = `
        SELECT
          b.*,
          v.vehicle_name,
          v.registration_number,
          v.type
        FROM bookings b
        LEFT JOIN vehicles v ON b.vehicle_id = v.id
        WHERE b.customer_id = $1
      `;

      const result = await pool.query(query, [id]);

      const booking = result.rows[0];

      const check_rent_end_date = Date.parse(booking.rent_end_date) - Date.now();

      if(check_rent_end_date < 0) {
        await pool.query(`UPDATE bookings SET status = 'returned' WHERE id = $1`, [booking.id]);
      }

      return {
        ...booking,
        vehicle: {
          vehicle_name: booking.vehicle_name,
          registration_number: booking.registration_number,
          type: booking.type
        },
        vehicle_name: undefined,
        registration_number: undefined,
        type: undefined
      };
    }
}


export const updateBookingService = async (id: string, role: string) => {
  const booking = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
  const vehicle_info = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [booking.rows[0].vehicle_id]);

  if(role === "admin") {
    const result = await pool.query(`UPDATE bookings SET status = 'returned' WHERE id = $1 RETURNING *`, [id]);
    const vehicle_result = await pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING *`, [vehicle_info.rows[0].id]);

    const final_result = {...result.rows[0], vehicle: {availability_status: vehicle_result.rows[0].availability_status}};
    await pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);
    return final_result;

  } else {
    const check_start_date = Date.parse(booking.rows[0].rent_start_date) - Date.now();

    if(check_start_date > 0) {
      const result = await pool.query(`UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *`, [id]);
      return result.rows[0];
    } else {
      return {
        success: false,
        message: "You can't cancel the booking, it has already started"
      }
    }
  }
}
