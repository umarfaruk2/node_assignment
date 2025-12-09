import express from 'express';
import { createBooking, getBooking, updateBooking } from './booking.controller.js';
import auth from '../../middlewares/auth.jwt.js';

const bookingRouter = express.Router();

bookingRouter.post('/', createBooking);
bookingRouter.get('/', auth('admin', 'customer'), getBooking);
bookingRouter.put('/:bookingId', auth('admin', 'customer'), updateBooking);

export default bookingRouter;
