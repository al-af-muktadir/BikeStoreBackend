import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../util/CatchAsync';
import sendRespose from '../../../util/sendResponse';
import { authService } from './auth.service';
// import { NextFunction } from 'express';
// import { userModel } from '../User/user.model';
import config from '../../config';
import { AppError } from '../../../Error/AppError';

const createUser = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await authService.createUserIntoDb(user);
  const { refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendRespose(res, {
    message: 'User Created Succesfully',
    statusCode: StatusCodes.OK,
    data: result.token,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.logInUserFromDb(req.body);
  const { refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  res.status(StatusCodes.OK).send({
    success: true,
    StatusCode: StatusCodes.OK,
    message: 'User Logged in Succesfully',
    data: result.token,
  });
});

const logOut = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Refresh TOken Not FOund');
  }
  res.clearCookie('refreshToken', { httpOnly: true, secure: true });
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'LoggedOut',
    data: [],
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const result = await authService.sendrefreshToken(req.cookies.refreshToken);
  res.status(StatusCodes.OK).send({
    success: true,
    StatusCode: StatusCodes.OK,
    message: 'Token retrieevd in Succesfully',
    data: result,
  });
});
const updatePassword = catchAsync(async (req, res) => {
  const result = await authService.updatePassfromDb(
    req.params.email,
    req.body.OldPass,
    req.body.password,
  );
  // ////console.log(result);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Password Changed Succesfully',
    data: result,
  });
});

const GetUserByemail = catchAsync(async (req, res) => {
  const result = await authService.getUserFromDb(req.params.email);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'User Retireved Succesfully',
    data: result,
  });
});

const GetUserAll = catchAsync(async (req, res) => {
  const result = await authService.getAllUserFromDb();
  console.log(result);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'All User Retireved Succesfully',
    data: result,
  });
});
export const authController = {
  createUser,
  loginUser,
  refreshToken,
  updatePassword,
  GetUserByemail,
  logOut,
  GetUserAll,
};
