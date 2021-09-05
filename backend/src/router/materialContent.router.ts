import { Router } from 'express';
import { getMaterialContents, getMaterialContent } from '../controller/materialContent.controller';

export const materialContentRouter = Router({ mergeParams: true });

materialContentRouter.get('/materialContents', getMaterialContents);
materialContentRouter.get('/materialContents/:id', getMaterialContent);