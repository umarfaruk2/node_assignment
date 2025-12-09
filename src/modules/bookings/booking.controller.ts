import { Request, Response } from "express";
import { createBookingService, getBookingService } from "./booking.service.js";
import { JwtPayload } from "jsonwebtoken";


export const createBooking = async (req: Request, res: Response) => {
  try {
  const result = await createBookingService(req.body);

  if(result.success !== false) {
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result
    })
  } else {
      res.status(403).json(result);
    }

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


export const getBooking = async (req: Request, res: Response) => {
  const {id, role} = req.user as JwtPayload;
  try {
    const result = await getBookingService(id, role);

    res.status(201).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


export const updateBooking = async (req: Request, res: Response) => {
  const {id, role} = req.user as JwtPayload;
  try {
    const result = await getBookingService(id, role);

    res.status(201).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
