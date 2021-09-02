import { Router } from 'express';
import { Request, Response } from 'node-fetch';
import { getProfessors, postProfessor, patchProfessor, deleteProfessor } from '../controller/professor.controller';

export const professorRouter = Router({ mergeParams: true });

professorRouter.get('/professors', getProfessors);
professorRouter.post('/professors/', postProfessor);
professorRouter.patch('/professors/:id', patchProfessor);
professorRouter.delete('/professors/:id', deleteProfessor);