import { Request, Response } from "express";
import { signinUserService, signupUserService } from "./auth.services.js";



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


export const signinUser = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  try {
    const result = await signinUserService(email, password);

    if(result.success === false) {
      res.status(401).json(result)
    } else {
      res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    })
    }

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
