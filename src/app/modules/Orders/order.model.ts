import { Schema, model } from 'mongoose';
import { Orders } from './order.interface';
import validator from 'validator';

const OrderSchema = new Schema<Orders>(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Email is empty',
      },
    },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

const OrderModel = model<Orders>('order-collection', OrderSchema);
export default OrderModel;
