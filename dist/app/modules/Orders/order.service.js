'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require('http-status-codes');
const AppError_1 = require('../../../Error/AppError');
const bike_model_1 = __importDefault(require('../Bikes/bike.model'));
const order_model_1 = __importDefault(require('./order.model'));
const mongodb_1 = require('mongodb');
const user_model_1 = require('../User/user.model');
const order_utils_1 = require('./order.utils');
const CreateOrderInDb = (orders, client_ip) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { products, User } = orders;
    // //console.log('pds', products);
    if (!products || products.length === 0) {
      throw new AppError_1.AppError(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'No Order Yet',
      );
      // //console.log('sdada');
    }
    let totalPrice = 0;
    //console.log('tt', totalPrice);
    const productDetails = yield Promise.all(
      products?.map((item) =>
        __awaiter(void 0, void 0, void 0, function* () {
          const product = yield bike_model_1.default.findById(item.product);
          if (product) {
            const subtotal = product ? (product.price || 0) * item.quantity : 0;
            totalPrice += subtotal;
            return item;
          }
        }),
      ),
    );
    const specUser = yield user_model_1.userModel.findById(User);
    //console.log('hoisenaki');
    const order = yield order_model_1.default.create({
      User,
      products: productDetails,
      totalPrice,
    });
    //console.log(order);
    const shurjopayPayload = {
      amount: totalPrice,
      order_id: order._id,
      currency: 'BDT',
      customer_name: specUser.name,
      customer_email: specUser.email,
      customer_address: 'N/A',
      customer_phone: 'N/A',
      customer_city: 'N/A',
      client_ip,
    };
    // //console.log(shurjopayPayload);
    // //console.log('payment er age ');
    const payment =
      yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    //console.log('payment', payment);
    if (
      payment === null || payment === void 0
        ? void 0
        : payment.transactionStatus
    ) {
      yield order_model_1.default.findByIdAndUpdate(
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
      const bike = yield bike_model_1.default.findById(product);
      // //console.log(bike);
      if (!bike) {
        throw new AppError_1.AppError(
          http_status_codes_1.StatusCodes.NOT_FOUND,
          'Not Found',
        );
      }
      // Check if requested quantity is available
      if (quantity > bike.quantity) {
        throw new AppError_1.AppError(
          http_status_codes_1.StatusCodes.NOT_FOUND,
          'inSufficient stock',
        );
        // //console.log('notstocl');
      }
      // Reduce bike stock and set inStock to false if stock reaches 0
      bike.quantity -= quantity;
      if (bike.quantity === 0) {
        bike.inStock = false;
      }
      yield bike.save();
    }
    return payment.checkout_url;
  });
const getOrder = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
  });
const verifyPayment = (order_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment =
      yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
      yield order_model_1.default.findOneAndUpdate(
        {
          'transaction.id': order_id,
        },
        {
          'transaction.bank_status': verifiedPayment[0].bank_status,
          'transaction.sp_code': verifiedPayment[0].sp_code,
          'transaction.sp_message': verifiedPayment[0].sp_message,
          'transaction.transaction_status':
            verifiedPayment[0].transaction_status,
          'transaction.method': verifiedPayment[0].method,
        },
      );
    }
    return verifiedPayment;
  });
const OrderRevenue = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    //console.log('kirevaaiwtf');
    const totalRevenue = yield order_model_1.default.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);
    //console.log('galimmarumkintu');
    //console.log(totalRevenue);
    return totalRevenue;
  });
const getEmailOrderFromDb = (email) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: email });
    const result = yield order_model_1.default.find({
      User: new mongodb_1.ObjectId(
        user === null || user === void 0 ? void 0 : user._id,
      ),
    });
    return result;
  });
const updateOrderStatus = (id, status) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findByIdAndUpdate(id, status);
    //console.log('result', result);
    return result;
  });
exports.OrderServices = {
  CreateOrderInDb,
  OrderRevenue,
  getEmailOrderFromDb,
  verifyPayment,
  getOrder,
  updateOrderStatus,
};
