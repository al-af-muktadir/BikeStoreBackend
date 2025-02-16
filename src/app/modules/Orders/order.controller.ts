import { OrderServices } from './order.service';
import catchAsync from '../../../util/CatchAsync';

import sendRespose from '../../../util/sendResponse';
import { StatusCodes } from 'http-status-codes';

const PostOrder = catchAsync(async (req, res) => {
  const orders = req.body;

  const newOrder = {
    ...orders,
    User: req?.user?._id,
  };

  //console.log(newOrder, 'neworder');
  // ////console.log(newOrder);
  const result = await OrderServices.CreateOrderInDb(newOrder, req.ip!);
  // ////console.log(result);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Bike ordered Suceesfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrder();
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Order retrieved Succesfully',
    data: result,
  });
});
const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);
  res.send({
    data: order,
  });
});

const getREvenue = catchAsync(async (req, res) => {
  //console.log('kirevai');
  const result = await OrderServices.OrderRevenue();
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Revenue  Succesfully',
    data: result,
  });
});
const getEmailOrder = catchAsync(async (req, res) => {
  ////console.log(req.params.email);
  const result = await OrderServices.getEmailOrderFromDb(req.params.email);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Order Retrieved Succesfully',
    data: result,
  });
});

const updateStatus = catchAsync(async (req, res) => {
  ////console.log(req.params.id, req.body);

  const result = await OrderServices.updateOrderStatus(req.params.id, req.body);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Order Status Changed Succesfully',
    data: result,
  });
});

export const OrderController = {
  PostOrder,
  getREvenue,
  getEmailOrder,
  verifyPayment,
  getAllOrder,
  updateStatus,
};
