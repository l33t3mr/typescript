import { Router } from 'express';
import { getMaterials, getMaterial, postMaterial, patchMaterial, deleteMaterial } from '../controller/material.controller';

export const materialRouter = Router({ mergeParams: true });

materialRouter.get('/materials', getMaterials);
materialRouter.get('/materials/:id', getMaterial);
materialRouter.post('/materials', postMaterial);
materialRouter.patch('/materials/:id', patchMaterial);
materialRouter.delete('/materials/:id', deleteMaterial);