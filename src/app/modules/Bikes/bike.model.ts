import { model, Schema } from 'mongoose';
import { Bike } from './bike.interface';

const BikeSchema = new Schema<Bike>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
    image: { type: String, require: true },
  },
  { timestamps: true },
);

const BikeModel = model<Bike>('bike-collection', BikeSchema);
export default BikeModel;
