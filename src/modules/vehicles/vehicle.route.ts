import express from "express";
import auth from "../../middlewares/auth.jwt.js";
import { createVehicle, getAllVehicle, getSingleVehicle, updateVehicle } from "./vehicle.controller.js";

const vehicleRouter = express.Router();

vehicleRouter.post('/', auth("admin"), createVehicle);
vehicleRouter.get('/', getAllVehicle);
vehicleRouter.get('/:vehicleId', getSingleVehicle);
vehicleRouter.put('/:vehicleId', updateVehicle);

export default vehicleRouter
