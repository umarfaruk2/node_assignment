import express, { Request, Response } from "express";
import auth from "../../middlewares/auth.jwt.js";
import { createVehicle } from "./vehicle.controller.js";

const vehicleRouter = express.Router();


vehicleRouter.post('/', auth("admin"), createVehicle)
vehicleRouter.get('/', auth(), (req: Request, res: Response) => {
  res.send("this is get vehicle");
})


export default vehicleRouter;
