import { StatusCodes } from 'http-status-codes';
import Tuser from '../User/user.interface';
import { userModel } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { AppError } from '../../../Error/AppError';

import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
// import sendRespose from '../../../util/sendResponse';
import { VerifyToken } from './auth.utils';

const createUserIntoDb = async (user: Tuser) => {
  const result = await userModel.create(user);

  const token = jwt.sign(
    {
      email: result.email,
      role: result.role,
      name: result.name,
    },
    config.access_token_secret as string,
    { expiresIn: '200d' },
  );
  const refreshToken = jwt.sign(
    {
      email: user.email,
      role: user.role,
      name: result.name,
    },
    config.refresh_token_secret as string,
    { expiresIn: '200d' },
  );
  return { token, refreshToken, result };
};

const logInUserFromDb = async (user: TLoginUser) => {
  const userData = await userModel.findOne({ email: user.email });
  console.log(userData, 'userData');
  const isPasswordMatched = await bcrypt.compare(
    user.password,
    userData?.password as string,
  );

  console.log(isPasswordMatched, 'isPasswordMatched');
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
  } else if (!userData) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found');
  } else if (userData.isBlocked === true) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is Blocked');
  } else {
    const token = jwt.sign(
      {
        email: userData.email,
        role: userData.role,
        name: userData.name,
      },
      config.access_token_secret as string,
      { expiresIn: '200d' },
    );
    const refreshToken = jwt.sign(
      {
        email: userData.email,
        role: userData.role,
        name: userData.name,
      },
      config.refresh_token_secret as string,
      { expiresIn: '200d' },
    );
    console.log(token, 'token');
    return { token, refreshToken };
  }
};

const sendrefreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
  }

  const decoded = VerifyToken(token, config.refresh_token_secret as string);
  const { email } = decoded as JwtPayload;

  const user = await userModel.findOne({ email: email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not Found');
  }
  const accesstoken = jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    config.access_token_secret as string,
    { expiresIn: '200d' },
  );
  return {
    accesstoken,
  };
};

const updatePassfromDb = async (
  email: string,
  OldPass: string,
  password: string,
) => {
  // const decodedPass = await bcrypt.compare(password,)
  const result = await userModel.findOne({ email: email });
  // ////console.log('Oold', OldPass);
  const decodedPass = await bcrypt.compare(OldPass, result?.password as string);
  if (!decodedPass) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'PassWord Not MAtched');
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const result2 = await userModel.updateOne(
    { email: email },
    { $set: { password: hashedPass } },
  );
  return result2;
};

const getUserFromDb = async (email: string) => {
  const result = await userModel.findOne({ email: email });
  return result;
};

const getAllUserFromDb = async () => {
  const result = await userModel.find();
  console.log(result, 'result');
  return result;
};
export const authService = {
  createUserIntoDb,
  logInUserFromDb,
  sendrefreshToken,
  updatePassfromDb,
  getUserFromDb,
  getAllUserFromDb,
};
