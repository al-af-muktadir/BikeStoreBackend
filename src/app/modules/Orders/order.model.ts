import { Schema, model } from 'mongoose';
import { Orders } from './order.interface';

const OrderSchema = new Schema<Orders>(
  {
    User: {
      type: Schema.Types.ObjectId,
      ref: 'user-collection',
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'bike-collection',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Delivered'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = model<Orders>('order-collection', OrderSchema);
export default OrderModel;
