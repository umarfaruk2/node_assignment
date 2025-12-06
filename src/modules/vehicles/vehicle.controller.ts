import { Request, Response } from "express";
import { createVehicleService, getAllVehicleService, getSingleVehicleService, updateVehicleService } from "./vehicle.service.js";


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


export const getAllVehicle = async (req: Request, res: Response) => {

 try {
  const result = await getAllVehicleService() ;

  res.status(200).json({
    success: true,
    message: "Vehicles retrieved successfully",
    data: result
  })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const getSingleVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
 try {
  const result = await getSingleVehicleService(id!) ;

  res.status(200).json({
    success: true,
    message: "Vehicles retrieved successfully",
    data: result
  })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


export const updateVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
 try {
  const result = await updateVehicleService(req.body, id!) ;

  res.status(200).json({
    success: true,
    message: "Vehicles updated successfully",
    data: result
  })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
