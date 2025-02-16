import { model, Schema } from 'mongoose';
import Tuser from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<Tuser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },

  isBlocked: { type: Boolean, default: false },
});

UserSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.saltrounds));
  next();
});

// UserSchema.pre('findOneAndUpdate', async function (next) {
//   const update = this.getUpdate() as Partial<Tuser>;

//   update.password = await bcrypt.hash(
//     update.password as string,
//     Number(config.saltrounds),
//   );
//   this.setUpdate(update);
//   next();
// });

export const userModel = model<Tuser>('user-collection', UserSchema);
