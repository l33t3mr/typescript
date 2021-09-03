import { getRepository, Connection } from "typeorm";
import { User } from "../models/user";
import { Request, Response } from "express";
import { Course } from "../models/course";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepo = await getRepository(User);
        let user = await userRepo.find({ relations: ['materials', 'courses'] });

        if (user.length != 0) {
            res.status(200).send(JSON.stringify(user));
            return;
        }

        res.status(400).send({
            "error": "No Professors were found"
        });
    } catch (error) {
        res.status(500).send({
            "error": error
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const userID = req.params.id;

        const userRepo = await getRepository(User);
        let user = await userRepo.findOneOrFail(userID, { relations: ['material', 'course'] });

        res.status(200).send(JSON.stringify(user))
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const postUser = async (req: Request, res: Response) => {
    try {
        let { firstName, lastName, password, email, address, dob, dep, role } = req.body

        const userRepo = await getRepository(User);
        const user = new User();

        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
        user.email = email;
        user.address = address
        user.dob = new Date(dob);
        user.dep = dep;
        user.role = role;

        let createdUser = await userRepo.save(user);

        res.send({
            'status': 'success',
            'id': createdUser.id
        })
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const userRepo = await getRepository(User);
        const user = await userRepo.findOneOrFail(id, { relations: ['courses'] });

        if (user.role !== 'prof') {
            throw ('Only courses belonging to a professor can be deleted');
        }


        // although cascade is true,  deletion must be manual
        const courseRepo = await getRepository(Course);
        user.courses.forEach(async course => {
            let foundCourse = await courseRepo.findOneOrFail(course);
            await courseRepo.remove(foundCourse);
        })
        
        await userRepo.remove(user);

        res.send({
            'status': 'success'
        })
    } catch (error) {
        res.send(error)
    }
}

export const patchUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        let { firstName, lastName, password, email, address, dob, dep } = req.body

        const userRepo = await getRepository(User);
        const user = await userRepo.findOneOrFail(id);

        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
        user.email = email;
        user.address = address
        user.dob = new Date(dob);
        user.dep = dep;

        userRepo.save(user);

        res.send({
            'status': 'success'
        })
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}