import { TUser } from './users.interface';
import { userModel } from './users.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await userModel.create(userData);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await userModel.find();
  return result;
};
export const usersServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
