import { Router } from 'express';
import { getCourses, getCourse, postCourse, patchCourse, deleteCourse, addMaterial, addStudent } from '../controller/course.controller';

export const courseRouter = Router({ mergeParams: true });

courseRouter.get('/courses', getCourses);
courseRouter.get('/courses/:id', getCourse);
courseRouter.post('/courses/', postCourse);
courseRouter.post('/courses/:id/students/:sid', addStudent);
courseRouter.post('/courses/:id/materials/:mid', addMaterial);
courseRouter.patch('/courses/:id', patchCourse);
courseRouter.delete('/courses/:id', deleteCourse);