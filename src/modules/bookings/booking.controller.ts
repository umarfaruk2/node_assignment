import { Request, Response } from "express";


export const createBooking = async (req: Request, res: Response) => {
  try {
  const result = await (req.body) ;

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: result
  })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
