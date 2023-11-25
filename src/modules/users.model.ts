import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TAddress,
  TOrder,
  TUser,
  TUserMethod,
  TUserModel,
  TUserName,
} from './users.interface';
import config from '../app/config';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const addressSchema = new Schema<TAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, TUserModel, TUserMethod>(
  {
    userId: {
      type: Number,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: userNameSchema,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    hobbies: {
      type: [String],
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    orders: {
      type: [orderSchema],
      default: undefined,
    },
  },
  { versionKey: false },
);
userSchema.pre('save', async function (next) {
  const user: TUser = this as TUser;
  user.password = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  next();
});

userSchema.methods.isUserExist = async function (userId: number) {
  const existingUser = await userModel.findOne({ userId });
  return existingUser;
};
export const userModel = model<TUser, TUserModel>('userModel', userSchema);
