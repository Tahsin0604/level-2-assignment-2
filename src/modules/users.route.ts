import express from 'express';
import { usersController } from './users.controllers';

const router = express.Router();

router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsers);

export const userRouter = router;
