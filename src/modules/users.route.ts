import express from 'express';
import { usersController } from './users.controllers';

const router = express.Router();

router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserDetails);
router.put('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);

router.put('/:userId/orders', usersController.addUserOrder);
router.get('/:userId/orders', usersController.getUserOrders);
router.get('/:userId/orders/total-price', usersController.getTotalPrice);

export const userRouter = router;
