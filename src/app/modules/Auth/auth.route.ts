import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import {
  updateValidation,
  userLoginValidation,
  userValidation,
} from '../User/userValidation';
import { authController } from './auth.controller';
import { auth } from '../../middlewares/auth';

const route = express.Router();

route.post(
  '/auth/register',
  validateRequest(userValidation.userValidationSchema),
  authController.createUser,
);
route.post(
  '/auth/login',
  validateRequest(userLoginValidation),
  authController.loginUser,
);
route.post(
  '/auth/refreshToken',
  // validateRequest(refreshTokenValidation),
  authController.refreshToken,
);
route.patch(
  '/auth/:email',
  auth('customer'),
  validateRequest(updateValidation),
  authController.updatePassword,
);
route.post(
  '/auth/logout',

  authController.logOut,
);
route.get(
  '/auth/:email',
  auth('admin', 'customer'),

  authController.GetUserByemail,
);
route.get('/auth/all', authController.GetUserAll);
export const AuthRouter = { route };
