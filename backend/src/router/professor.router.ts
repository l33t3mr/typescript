import { Router } from 'express';
import { getProfessors, getProfessor, postProfessor, patchProfessor, deleteProfessor } from '../controller/professor.controller';

export const professorRouter = Router({ mergeParams: true });

professorRouter.get('/professors', getProfessors);
professorRouter.get('/professors/:id', getProfessor);
professorRouter.post('/professors/', postProfessor);
professorRouter.patch('/professors/:id', patchProfessor);
professorRouter.delete('/professors/:id', deleteProfessor);