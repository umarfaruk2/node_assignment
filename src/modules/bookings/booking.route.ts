import express from 'express';
import { createBooking } from './booking.controller.js';

const bookingRouter = express.Router();

bookingRouter.post('/', createBooking);

export default bookingRouter;
