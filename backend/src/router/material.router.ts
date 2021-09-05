import { Router } from 'express';
import { getMaterials, getMaterial, postMaterial, patchMaterial, deleteMaterial } from '../controller/material.controller';

// tslint:disable-next-line:no-var-requires
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()})

export const materialRouter = Router({ mergeParams: true });

materialRouter.get('/materials', getMaterials);
materialRouter.get('/materials/:id', getMaterial);
materialRouter.post('/materials/:id', upload.single('file') , postMaterial);
materialRouter.patch('/materials/:id', upload.single('file') , patchMaterial);
materialRouter.delete('/materials/:id', deleteMaterial);