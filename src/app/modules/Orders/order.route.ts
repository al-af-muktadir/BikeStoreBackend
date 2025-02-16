import express from 'express';
import { OrderController } from './order.controller';
import { auth } from '../../middlewares/auth';

const orderRoute = express.Router();
orderRoute.get(
  '/orders/totalrevenue',
  auth('admin'),
  OrderController.getREvenue,
);
orderRoute.post('/orders', auth('customer'), OrderController.PostOrder);
orderRoute.get(
  '/orders/verify',
  auth('customer'),
  OrderController.verifyPayment,
);
orderRoute.get('/orders', auth('admin'), OrderController.getAllOrder);
orderRoute.get(
  '/orders/:email',
  auth('customer'),
  OrderController.getEmailOrder,
);
orderRoute.patch('/orders/:id', auth('admin'), OrderController.updateStatus);

export default orderRoute;
