import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../util/CatchAsync';
import sendRespose from '../../../util/sendResponse';
import { userServices } from './user.service';

const getUser = catchAsync(async (req, res) => {
  const result = await userServices.getUserFromDb();
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'USer Retrieved Succesfulyy',
    data: result,
  });
});

const getSpeceficUser = catchAsync(async (req, res) => {
  const result = await userServices.getUserById(req.params.id);

  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Id User Found',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const result = await userServices.UpdateStatusById(req.params.id, req.body);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Status Updated',
    data: result,
  });
});

export const userController = {
  getUser,
  getSpeceficUser,
  updateUser,
};
