import { Router } from 'express';
import { getCourses, getCourse, postCourse, patchCourse, deleteCourse, addMaterial, addStudent, removeStudent } from '../controller/course.controller';

export const courseRouter = Router({ mergeParams: true });

courseRouter.get('/courses', getCourses);
courseRouter.get('/courses/:id', getCourse);
courseRouter.post('/courses', postCourse);
courseRouter.post('/courses/:id/students/:uid', addStudent);
courseRouter.delete('/courses/:id/students/:uid', removeStudent);
courseRouter.post('/courses/:id/materials/:mid', addMaterial);
courseRouter.patch('/courses/:id', patchCourse);
courseRouter.delete('/courses/:id', deleteCourse);