import { TOrder, TUser } from './users.interface';
import { userModel } from './users.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await userModel.create(userData);
  const { _id, password, ...restOfResult } = result.toJSON();
  return restOfResult;
};
const getAllUsersFromDB = async () => {
  const result = await userModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  );
  return result;
};
const getUserDetailsFromDB = async (userId: number) => {
  const userInstance = new userModel();
  if ((await userInstance.isUserExist(userId)) === null) {
    throw new Error('User does not exists');
  }
  const result = await userModel.find(
    { userId },
    {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
      orders: 1,
      _id: 0,
    },
  );
  return result[0];
};
const updateUserFromDB = async (userId: number, updatePayload: TUser) => {
  const userInstance = new userModel();

  const existingUser = await userInstance.isUserExist(userId);

  if (existingUser === null) {
    throw new Error('User does not exists');
  }
  const result = await userModel.findOneAndUpdate(
    { userId },
    { $set: updatePayload },
    { new: true },
  )!;
  if (result === null) {
    throw new Error('Something went wrong with update');
  }
  const { _id, password, ...restOfResult } = result.toJSON();
  return restOfResult;
};
const deleteUserFromDB = async (userId: number) => {
  const userInstance = new userModel();
  const existingUser = await userInstance.isUserExist(userId);
  if (existingUser === null) {
    throw new Error('User does not exists');
  }
  const result = await userModel.deleteOne({ userId: Number(userId) });
  return result;
};
const addOrderIntoDB = async (userId: number, newOrder: TOrder) => {
  const userInstance = new userModel();
  const existingUser = await userInstance.isUserExist(userId);
  if (existingUser === null) {
    throw new Error('User does not exists');
  }

  if (!existingUser.orders) {
    existingUser.orders = [];
  }
  const result = await userModel.updateOne(
    { userId },
    {
      $push: { orders: newOrder },
    },
  );
  return result;
};
const getUsersOrdersFromDB = async (userId: number) => {
  const userInstance = new userModel();
  const existingUser = await userInstance.isUserExist(userId);
  if (existingUser === null) {
    throw new Error('User does not exists');
  }
  const result = await userModel.find(
    { userId },
    {
      orders: 1,
      _id: 0,
    },
  );

  return result[0];
};
const getTotalPriceOfOrdersFromDB = async (userId: number) => {
  const userInstance = new userModel();
  const existingUser = await userInstance.isUserExist(userId);
  if (existingUser === null) {
    throw new Error('User does not exists');
  }

  if (!existingUser.orders) {
    throw new Error('No order is placed');
  }
  const result = await userModel.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.quantity', '$orders.price'] },
        },
      },
    },
    {
      $project: { totalPrice: 1, _id: 0 },
    },
  ]);
  return result[0];
};

export const usersServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  deleteUserFromDB,
  getUserDetailsFromDB,
  updateUserFromDB,
  addOrderIntoDB,
  getUsersOrdersFromDB,
  getTotalPriceOfOrdersFromDB,
};
