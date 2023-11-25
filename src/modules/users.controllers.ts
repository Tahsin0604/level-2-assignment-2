import { Request, Response } from 'express';
import { orderValidation, userValidation } from './users.validation';
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
      message: 'Error Occurred',
      error: error,
    });
  }
};
const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await usersServices.getUserDetailsFromDB(Number(userId));
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error instanceof Error ? error.message : 'Error occurred',
      error: {
        code: 404,
        description: error instanceof Error ? error.message : 'Error occurred',
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
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    const result = await usersServices.updateUserFromDB(
      Number(userId),
      updatedData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error instanceof Error ? error.message : 'Error occurred',
      error: {
        code: 404,
        description: error instanceof Error ? error.message : 'Error occurred',
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await usersServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error instanceof Error ? error.message : 'Error occurred',
      error: {
        code: 404,
        description: error instanceof Error ? error.message : 'Error occurred',
      },
    });
  }
};

const addUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    const zodParseData = orderValidation.parse(order);
    const result = await usersServices.addOrderIntoDB(
      Number(userId),
      zodParseData,
    );
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error instanceof Error ? error.message : 'Error occurred',
      error: {
        code: 404,
        description: error instanceof Error ? error.message : 'Error occurred',
      },
    });
  }
};
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await usersServices.getUsersOrdersFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error instanceof Error ? error.message : 'Error occurred',
      error: {
        code: 404,
        description: error instanceof Error ? error.message : 'Error occurred',
      },
    });
  }
};
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await usersServices.getTotalPriceOfOrdersFromDB(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error instanceof Error ? error.message : 'Error occurred',
      error: {
        code: 404,
        description: error instanceof Error ? error.message : 'Error occurred',
      },
    });
  }
};
export const usersController = {
  createUser,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  addUserOrder,
  getUserOrders,
  getTotalPrice,
};
