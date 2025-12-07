import { Request, Response } from "express";
import { getAllUserService } from "./user.service.js";


export const getAllUser = async (req: Request, res: Response) => {
  try {
  const result = await getAllUserService() ;

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: result
  })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
