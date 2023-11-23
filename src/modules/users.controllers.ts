import { Request, Response } from 'express';
import userValidation from './users.validation';
import { usersServices } from './users.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodParseData = userValidation.parse(userData);
    const result = await usersServices.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error: {
        code: 404,
        description: 'Users not found!',
        error,
      },
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'Something went wrong',
      error: error,
    });
  }
};
export const usersController = { createUser, getAllUsers };
