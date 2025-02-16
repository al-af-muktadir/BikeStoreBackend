import express from 'express';
import { userController } from './user.controller';
import { auth } from '../../middlewares/auth';
const route = express.Router();
route.get('/user', userController.getUser);
route.get('/user/:id', userController.getSpeceficUser);
route.patch('/user/:id', auth('admin'), userController.updateUser);
export const UserRouter = route;
