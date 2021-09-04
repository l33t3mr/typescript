import { Router } from 'express';
import { getUsers, getUser, postUser, patchUser, deleteUser } from '../controller/user.controller';

export const userRouter = Router({ mergeParams: true });

userRouter.get('/users', getUsers);
userRouter.get('/users/:email', getUser);
userRouter.post('/users/', postUser);
userRouter.patch('/users/:id', patchUser);
userRouter.delete('/users/:id', deleteUser);