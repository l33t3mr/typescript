import { Router } from 'express';
import { userRouter } from './user.router';
import { courseRouter } from './course.router';
import { materialRouter } from './material.router';
import { materialContentRouter } from './materialContent.router';
import { Authentication } from '../../middleware/authentication';

export const globalRouter = Router({ mergeParams: true });

globalRouter.use('/api', userRouter);
globalRouter.use('/api', Authentication.verifyAccess, courseRouter);
globalRouter.use('/api', Authentication.verifyAccess, materialRouter);
globalRouter.use('/api', Authentication.verifyAccess, materialContentRouter);
