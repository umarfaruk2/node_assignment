import express from "express";
import { signupUser } from "./auth.controllers.js";

const authRouter = express.Router();


authRouter.post('/signup', signupUser);
//authRouter.post('/signin', )


export default authRouter;
