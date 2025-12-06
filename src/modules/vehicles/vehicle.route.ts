import express, { Request, Response } from "express";
import auth from "../../middlewares/auth.jwt.js";

const vehicleRouter = express.Router();


vehicleRouter.get('/', auth(), (req: Request, res: Response) => {
  res.send("this is get vehicle");
})


export default vehicleRouter;
