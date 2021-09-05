import { Router } from 'express';
import { userRouter } from './user';
import { courseRouter } from './course.router';
import { materialRouter } from './material.router';

export const globalRouter = Router({ mergeParams: true });

globalRouter.use('/api', userRouter);
globalRouter.use('/api', courseRouter);
globalRouter.use('/api', materialRouter);
