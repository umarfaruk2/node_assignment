import express from 'express';
import { deleteUser, getAllUser, updateUser } from './user.controller.js';
import auth from '../../middlewares/auth.jwt.js';

const userRouter = express.Router();

userRouter.get('/', auth('admin'), getAllUser);
userRouter.put('/:userId', auth('admin', 'customer'), updateUser);
userRouter.delete('/:userId', auth('admin'), deleteUser);


export default userRouter;
