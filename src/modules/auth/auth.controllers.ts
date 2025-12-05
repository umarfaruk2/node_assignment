import { Request, Response } from "express";
import { signupUserService } from "./auth.services.js";



export const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await signupUserService(req.body);

   res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
