import { Router } from 'express';
import { getUsers, getUser, loginUser, registerUser, patchUser, deleteUser } from '../controller/user.controller';
import { Authentication } from '../../middleware/authentication';

export const userRouter = Router({ mergeParams: true });

userRouter.get('/users', Authentication.verifyAccess, getUsers);
userRouter.get('/users/:id', Authentication.verifyAccess, getUser);
userRouter.post('/token', loginUser);
userRouter.post('/users/', registerUser);
userRouter.patch('/users/:id', Authentication.verifyAccess, patchUser);
userRouter.delete('/users/:id', Authentication.verifyAccess, deleteUser);