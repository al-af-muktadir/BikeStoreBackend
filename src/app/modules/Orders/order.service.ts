/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../../Error/AppError';
import BikeModel from '../Bikes/bike.model';
import { Orders } from './order.interface';
import OrderModel from './order.model';
import { ObjectId } from 'mongodb';
import { userModel } from '../User/user.model';
import { orderUtils } from './order.utils';

const CreateOrderInDb = async (orders: Orders, client_ip: string) => {
  const { products, User } = orders;
  // //console.log('pds', products);

  if (!products || products.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No Order Yet');
    // //console.log('sdada');
  }

  let totalPrice = 0;
  //console.log('tt', totalPrice);
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await BikeModel.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );
  const specUser = await userModel.findById(User);
  //console.log('hoisenaki');
  const order = await OrderModel.create({
    User,
    products: productDetails,
    totalPrice,
  });

  //console.log(order);

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: specUser!.name,
    customer_email: specUser!.email,
    customer_address: 'N/A',
    customer_phone: 'N/A',

    customer_city: 'N/A',
    client_ip,
  };
  // //console.log(shurjopayPayload);
  // //console.log('payment er age ');
  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  //console.log('payment', payment);

  if (payment?.transactionStatus) {
    await OrderModel.findByIdAndUpdate(
      order._id,
      {
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      },
      { new: true },
    );
  }

  for (const item of products) {
    const { product, quantity } = item;
    // //console.log(product, 'pdscss');

    const bike = await BikeModel.findById(product);
    // //console.log(bike);
    if (!bike) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Not Found');
    }

    // Check if requested quantity is available
    if (quantity > bike.quantity) {
      throw new AppError(StatusCodes.NOT_FOUND, 'inSufficient stock');
      // //console.log('notstocl');
    }

    // Reduce bike stock and set inStock to false if stock reaches 0
    bike.quantity -= quantity;
    if (bike.quantity === 0) {
      bike.inStock = false;
    }

    await bike.save();
  }
  return payment.checkout_url;
};

const getOrder = async () => {
  const result = await OrderModel.find();
  return result;
};
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transaction_status': verifiedPayment[0].transaction_status,

        'transaction.method': verifiedPayment[0].method,
      },
    );
  }
  return verifiedPayment;
};

const OrderRevenue = async () => {
  //console.log('kirevaaiwtf');
  const totalRevenue = await OrderModel.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
  ]);
  //console.log('galimmarumkintu');
  //console.log(totalRevenue);
  return totalRevenue;
};

const getEmailOrderFromDb = async (email: string) => {
  const user = await userModel.findOne({ email: email });

  const result = await OrderModel.find({ User: new ObjectId(user?._id) });

  return result;
};
const updateOrderStatus = async (id: string, status: any) => {
  const result = await OrderModel.findByIdAndUpdate(id, status);
  //console.log('result', result);
  return result;
};
export const OrderServices = {
  CreateOrderInDb,
  OrderRevenue,
  getEmailOrderFromDb,
  verifyPayment,
  getOrder,
  updateOrderStatus,
};
