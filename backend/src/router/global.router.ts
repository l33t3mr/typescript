import { Router } from 'express';
import { professorRouter } from './professor.router';
import { courseRouter } from './course.router';

export const globalRouter = Router({ mergeParams: true });

globalRouter.use('/api', professorRouter);
globalRouter.use('/api', courseRouter)