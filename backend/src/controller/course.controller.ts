import { getRepository } from "typeorm";
import { Course } from "../models/course";
import { Request, Response } from "express";
import { User } from "../models/user";
import { Material } from "../models/material";

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courseRepo = await getRepository(Course);
        let course = await courseRepo.find({ relations: ['users'] });

        if (course.length != 0) {
            res.status(200).send(JSON.stringify(course));
            return;
        }

        res.status(400).send({
            "error": "No Courses were found"
        });
    } catch (error) {
        res.status(500).send({
            "error": error
        });
    }
}

export const getCourse = async (req: Request, res: Response) => {
    try {
        const courseID = req.params.id;

        const courseRepo = await getRepository(Course);
        let course = await courseRepo.findOneOrFail(courseID, { relations: ['users', 'materials'] });

        res.status(200).send(JSON.stringify(course))
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const postCourse = async (req: Request, res: Response) => {
    try {
        let { userID, name, startsOn, endsOn, maxCapacity } = req.body

        const userRepo = await getRepository(User);
        const user = await userRepo.findOneOrFail(userID, { relations: ['courses'] });

        if (user.role !== 'prof') {
            throw ('User does not have permissions to create a course')
        }

        const course = new Course();
        course.name = name;
        course.startsOn = new Date(startsOn);
        course.endsOn = new Date(endsOn);
        course.maxCapacity = maxCapacity;

        // cascade is on, so saving user saves course
        user.courses.push(course);

        const createdUser = await userRepo.save(user);

        res.send({
            'status': 'success',
            'id': createdUser.courses.pop()?.id
        })
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const courseRepo = await getRepository(Course);
        const course = await courseRepo.findOneOrFail(id);

        courseRepo.remove(course);

        res.send({
            'status': 'success'
        })
    } catch (error) {
        res.send(error)
    }
}

export const patchCourse = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        let { name, startsOn, endsOn, maxCapacity } = req.body

        const courseRepo = await getRepository(Course);
        const course = await courseRepo.findOneOrFail(id);

        course.name = name;
        course.startsOn = new Date(startsOn);
        course.endsOn = new Date(endsOn);
        course.maxCapacity = maxCapacity

        courseRepo.save(course);

        res.send({
            'status': 'success'
        })
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const addStudent = async (req: Request, res: Response) => { 
    try {
        const cID = req.params.id;
        const uID = req.params.uid;

        const courseRepo = await getRepository(Course);
        const course = await courseRepo.findOneOrFail(cID);

        const userRepo = await getRepository(User);
        const user = await userRepo.findOneOrFail(uID, {relations: ['courses']});

        if (user.role === 'prof'){
            throw('Only students or tutors could be added to a course')
        }

        user.courses.push(course);

        await userRepo.save(user);

        res.send({
            'status': 'success'
        })
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const removeStudent = async (req: Request, res: Response) => {
    try {
        const cID = req.params.id;
        const uID = req.params.uid;

        const userRepo = await getRepository(User);
        const user = await userRepo.findOneOrFail(uID, {relations: ['courses']});

        if (user.role === 'prof'){
            throw('Only students or tutors could be removed from a course')
        }

        user.courses = user.courses.filter(course => {
            course.id !== cID
        })

        await userRepo.save(user);

        res.send({
            'status': 'success'
        })
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const addMaterial = async (req: Request, res: Response) => {
    try {
        const cID = req.params.id;
        const mID = req.params.sid;

        const courseRepo = await getRepository(Course);
        const course = await courseRepo.findOneOrFail(cID, { relations: ['materials'] });

        const materialRepo = await getRepository(Material);
        const material = await materialRepo.findOneOrFail(mID);

        course.materials.push(material);

        courseRepo.save(course);

        res.send({
            'status': 'success'
        })
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}