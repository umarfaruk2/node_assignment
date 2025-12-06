import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/index.js";


const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

   try {
    if(!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user"
      })
    }

    const decode = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload;
    req.user = decode as JwtPayload;

    if(roles.length && !roles.includes(decode.role)) {
      res.status(402).json({
        success: false,
        message: "Your not authorized for this section"
      })
    }

    next();
   } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message
      })
   }
}
};


export default auth;



