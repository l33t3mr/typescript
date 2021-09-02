import { getRepository } from "typeorm";
import { Professor } from "../models/professor";
import { Request, Response } from "express";
import { Course } from "../models/course";
import { Material } from "../models/material";

export const getProfessors = async (req: Request, res: Response) => {
    try {
        const profRepo = await getRepository(Professor);
        let prof = await profRepo.find();

        if (prof.length != 0) {
            res.status(200).send(JSON.stringify(prof));
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

export const getProfessor = async (req: Request, res: Response) => {
    try {
        const profID = req.params.id;

        const profRepo = await getRepository(Professor);
        let prof = await profRepo.findOneOrFail(profID);

        res.status(200).send(JSON.stringify(prof))
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const postProfessor = async (req: Request, res: Response) => {
    try {
        let { firstName, lastName, password, email, address, dob, dep } = req.body

        const profRepo = await getRepository(Professor);
        const prof = new Professor();

        prof.firstName = firstName;
        prof.lastName = lastName;
        prof.password = password;
        prof.email = email;
        prof.address = address
        prof.dateOfBirth = new Date(dob);
        prof.department = dep;

        let createdProf = await profRepo.save(prof);

        res.send({
            'status': 'success',
            'id': createdProf.id
        })
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}

export const deleteProfessor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const profRepo = await getRepository(Professor);
        const prof = await profRepo.findOneOrFail(id);
        
        profRepo.remove(prof);

        res.send({
            'status': 'success'
        })
    } catch (error) {
        res.send(error)
    }
}

export const patchProfessor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        let { firstName, lastName, password, email, address, dob, dep } = req.body

        const profRepo = await getRepository(Professor);
        const prof = await profRepo.findOneOrFail(id);

        prof.firstName = firstName;
        prof.lastName = lastName;
        prof.password = password;
        prof.email = email;
        prof.address = address
        prof.dateOfBirth = new Date(dob);
        prof.department = dep;

        profRepo.save(prof);

        res.send({
            'status': 'success'
        })
    } catch (error) {
        res.status(500).send({
            "error": error
        })
    }
}