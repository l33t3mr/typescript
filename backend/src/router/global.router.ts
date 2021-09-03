import { Router } from 'express';
import { userRouter } from './user';
import { courseRouter } from './course.router';

export const globalRouter = Router({ mergeParams: true });

globalRouter.use('/api', userRouter);
globalRouter.use('/api', courseRouter)