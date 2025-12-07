import express, { Request, Response } from "express";
import initDB from "./config/config.db.js";
import authRouter from "./modules/auth/auth.route.js";
import vehicleRouter from "./modules/vehicles/vehicle.route.js";
import userRouter from "./modules/users/user.route.js";
import bookingRouter from "./modules/bookings/booking.route.js";

const app = express();

// json parser
app.use(express.json());

// database config
initDB();

// user route
app.use('/api/v1/auth/', authRouter);

// vehicle router
app.use('/api/v1/vehicles', vehicleRouter);

// user router
app.use('/api/v1/users', userRouter);

//booking router
app.use('/api/v1/bookings', bookingRouter);


// 404 page
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found"
  });
});

export default app;
