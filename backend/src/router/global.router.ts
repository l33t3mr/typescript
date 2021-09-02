import { Router } from 'express';
import { professorRouter } from './professor.router';

export const globalRouter = Router({ mergeParams: true });

globalRouter.use('/api', professorRouter);