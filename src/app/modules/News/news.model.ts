import { model, Schema } from 'mongoose';
import { news } from './news.interface';

const newsSchmea = new Schema<news>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export const newsModel = model<news>('news0collection', newsSchmea);
