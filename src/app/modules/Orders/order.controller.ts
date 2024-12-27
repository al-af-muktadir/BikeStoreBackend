import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const PostOrder = async (req: Request, res: Response) => {
  const orders = req.body.orders;
  try {
    const result = await OrderServices.CreateOrderInDb(orders);
    if (!result.success) {
      res.send({
        message: result.message,
        success: false,
        data: result,
      });
    } else {
      res.send({
        message: 'Order created succesfully',
        success: true,
        data: result.data,
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
};

const getREvenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.OrderRevenue();
    res.send({
      success: true,
      data: { totalRevenue: result },
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
};

export const OrderController = {
  PostOrder,
  getREvenue,
};
