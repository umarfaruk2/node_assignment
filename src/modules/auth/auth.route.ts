import express from "express";
import { signinUser, signupUser } from "./auth.controllers.js";

const authRouter = express.Router();


authRouter.post('/signup', signupUser);
authRouter.post('/signin', signinUser);


export default authRouter;
