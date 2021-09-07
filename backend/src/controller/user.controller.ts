import { getRepository, Connection } from "typeorm";
import { User } from "../models/user";
import { Request, Response, response } from "express";
import { Course } from "../models/course";
import { Authentication } from "../../middleware/authentication";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepo = await getRepository(User);
        let user = await userRepo.find({ relations: ['materials', 'courses'] });

        if (user.length != 0) {
            res.status(200).send(JSON.stringify(user));
            return;
        }

        res.status(400).send({
            "error": "No Users were found"
        });
    } catch (error) {
        res.status(500).send({
            "error": error
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const userRepo = await getRepository(User);
        const user = await userRepo.findOne(id, {
            relations: ['materials', 'courses']
        });
        if (!user) {
            throw ('User does not exist');
        }
        let returnUser = new User();
        returnUser.id = user.id;
        returnUser.firstName = user.firstName;
        returnUser.lastName = user.lastName;
        returnUser.address = user.address;
        returnUser.email = user.email
        returnUser.dob = user.dob;
        returnUser.dep = user.dep;
        returnUser.role = user.role;
        returnUser.courses = user.courses;
        returnUser.materials = user.materials;

        res.status(200).send({
            'user': returnUser
        })

    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userRepo = await getRepository(User);
        const user = await userRepo.findOne({
            where: {
                email: email
            },
            relations: ['materials', 'courses']
        });
        // if user already exists
        if (!user) {
            return res.status(401).send({
                'error': 'Unauthorized!'
            })
        }

        const matchingPassword: boolean = await Authentication.comparePasswordWithHash(password, user.password);
        if (!matchingPassword) {
            return res.status(401).send({
                'error': 'Unauthorized!'
            })
        }

        const token: string = await Authentication.generateToken({
            id: user.id,
            email: user.email
        })

        let returnUser = new User();
        returnUser.id = user.id;
        returnUser.firstName = user.firstName;
        returnUser.lastName = user.lastName;
        returnUser.address = user.address;
        returnUser.email = user.email
        returnUser.dob = user.dob;
        returnUser.dep = user.dep;
        returnUser.role = user.role;
        returnUser.courses = user.courses;
        returnUser.materials = user.materials;


        res.status(200).send({
            'user': returnUser,
            'token': token
        })

    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        let { firstName, lastName, password, email, address, dob, dep, role } = req.body

        const userRepo = await getRepository(User);

        // if user already exists
        let user = await userRepo.findOne({ where: { email: email } })
        if (user) {
            return res.status(400).send({
                'error': 'User already exists!'
            })
        }

        user = new User();

        user.firstName = firstName;
        user.lastName = lastName;
        user.password = await Authentication.hashPassword(password);
        user.email = email;
        user.address = address
        user.dob = new Date(dob);
        user.dep = dep;
        user.role = role;

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

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const userRepo = await getRepository(User);
        const user = await userRepo.findOneOrFail(id, { relations: ['courses'] });

        if (user.role === 'prof') {
            // although cascade is true,  deletion must be manual
            const courseRepo = await getRepository(Course);
            await courseRepo.remove(user.courses);
            // user.courses.forEach(async course => {
            //     let foundCourse = await courseRepo.findOneOrFail(course);
            //     await courseRepo.remove(foundCourse);
            // })
        }



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

        let { firstName, lastName, email, address, dob, dep } = req.body

        const userRepo = await getRepository(User);
        const user = await userRepo.findOneOrFail(id);

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.address = address
        user.dob = new Date(dob);
        user.dep = dep;

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