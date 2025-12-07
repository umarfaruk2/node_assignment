import { Request, Response } from "express";
import { getAllUserService, updateUserService } from "./user.service.js";


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


export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    if(req.user!.role === "admin") {
      const result = await updateUserService(req.body, id!);

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result
      })
    } else {
      if(req.user!.id !== Number(id!)) {
        res.status(200).json({
          success: true,
          message: "You can just update own profile only",
        })
      } else {
        const result = await updateUserService(req.body, id!);
        res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: result
        })
      }
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


// delete user
