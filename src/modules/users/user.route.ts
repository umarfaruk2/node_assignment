import express from 'express';
import { getAllUser } from './user.controller.js';
import auth from '../../middlewares/auth.jwt.js';

const userRouter = express.Router();

userRouter.get('/', auth('admin'), getAllUser);


export default userRouter;
