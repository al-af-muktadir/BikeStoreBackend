import BikeModel from '../Bikes/bike.model';
import { Orders } from './order.interface';
import OrderModel from './order.model';
import { ObjectId } from 'mongodb';

const CreateOrderInDb = async (orders: Orders) => {
  const result3 = await BikeModel.findOne({
    _id: new ObjectId(orders.product),
  });
  try {
    if (!result3) {
      return {
        success: false,
        message: 'Product not found in inventory',
      };
    }
    if (result3?.quantity < orders.quantity) {
      return {
        success: false,
        message: 'Product is out of stock or insufficient quantity available',
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }

  const result = await OrderModel.create(orders);

  const result2 = await BikeModel.updateOne(
    { _id: new ObjectId(orders.product) },
    { $inc: { quantity: -orders.quantity } },
  );

  try {
    if (result3?.quantity === 0) {
      await BikeModel.updateOne(
        { _id: new ObjectId(orders.product) },
        { inStock: false },
      );
      return {
        error: 'Insufficient stock available',
        success: true,
        message: 'Insuffucient',
        data: orders,
      };
    }
  } catch (err) {
    console.log(err, 'errorhappening');
  }

  return {
    success: true,
    message: 'Order Placed succesfully',
    data: { result, orders, result2 },
  };
};

const OrderRevenue = async () => {
  const result = await OrderModel.aggregate([
    {
      $project: {
        revenue: { $multiply: ['$quantity', '$totalPrice'] }, // Multiply quantity and price for each document
      },
    },
    {
      $group: {
        _id: null, // No grouping key, aggregate for all documents
        totalRevenue: { $sum: '$revenue' }, // Sum up all revenue fields
      },
    },
  ]);
  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  return totalRevenue;
};

export const OrderServices = {
  CreateOrderInDb,
  OrderRevenue,
};
