import { Request, Response } from "express";
import { createVehicleService } from "./vehicle.service.js";


export const createVehicle = async (req: Request, res: Response) => {

 try {
  const result = await createVehicleService(req.body) ;

  res.status(201).json({
    success: true,
    message: "Vehicle created successfully",
    data: result
  })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
