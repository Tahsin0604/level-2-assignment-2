import { TUser } from './users.interface';
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
  return result;
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
  if ((await userInstance.isUserExist(userId)) === null) {
    throw new Error('User does not exists');
  }
  const result = await userInstance.deleteOne({ userId });
  return result;
};

const getUsersOrdersFromDB = async (userId: number) => {
  const userInstance = new userModel();
  if ((await userInstance.isUserExist(userId)) === null) {
    throw new Error('User does not exists');
  }
  const result = await userModel.find(
    { userId },
    {
      orders: 1,
      _id: 0,
    },
  );
  return result;
};
export const usersServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  deleteUserFromDB,
  getUserDetailsFromDB,
  updateUserFromDB,
  getUsersOrdersFromDB,
};
