import { RequestHandler, Request, Response, response } from 'express';
import { Material } from '../models/material';
import { getRepository } from 'typeorm';
import { User } from '../models/user';
import { MaterialContent } from '../models/materialContent';
import {Course} from "../models/course";
import {Buffer} from 'buffer';


export const getMaterials = async (req, res) => {
  try {
    const materialRepo = await getRepository(Material);
    const materials: Material[] = await materialRepo.find();
    res.send({ status: 'success', data: materials });
  } catch (e) {
    // @ts-ignore
    res.status(404).send({ status: 'not_found' });
  }
};
export const getMaterial = async (req, res) => {
  const id = req.params.id;
  try {
    const materialRepo = await getRepository(Material);
    const material = await materialRepo.findOneOrFail(id);
    res.send({ status: 'success', data: material });
  } catch (e) {
    // @ts-ignore
    res.status(404).send({ status: 'not_found' });
  }
};
export const patchMaterial = async (req, res) => {
  const id = req.params.id;
  const file = req.file;

  try {
    const materialRepo = await getRepository(Material);
    const material = await materialRepo.findOneOrFail(id);
    material.type = file.mimetype;
    material.name = file.originalname;
    const content = new MaterialContent();
    content.content = file.buffer;
    content.createdAt = new Date();
    content.modifiedAt = new Date();
    material.materialContent = content;
    const createdMaterial = await materialRepo.save(material);
    // @ts-ignore
    res.send({ status: 'success', id: createdMaterial.id });
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error });
  }
};

export const postMaterial = async (req, res) => {
  try {

    const userID = req.params.id;

    const file = req.file;

    const userRepo = await getRepository(User);
    const user = await userRepo.findOne(userID, { relations: ['materials'] });
  
    if (!user){
      return res.send('User not found')
    }

    const materialRepo = await getRepository(Material);

    const material = new Material();
    material.type = file.mimetype;
    material.name = file.originalname;

    const content = new MaterialContent();
    content.content = await file.buffer;
    content.createdAt = new Date();
    content.modifiedAt = new Date();
  
    material.materialContent = content;

    const createdMaterial = await materialRepo.save(material);

    await user.materials.push(material);
    await userRepo.save(user);

    res.send({
      status: 'successful',
      // tslint:disable-next-line:object-literal-sort-keys
      id: createdMaterial.id,
    });
  } catch (error) {
    res.send('Oops! Something went wrong!');
  }
};
export const deleteMaterial = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const materialRepo = await getRepository(Material);
    const material = await materialRepo.findOneOrFail(id, { relations: ['materialContent'] });
    const materialCoRepo = await getRepository(MaterialContent);
    //const content = material.materialContent;
    const content = await materialCoRepo.findOneOrFail(material.materialContent.id);
    await materialCoRepo.remove(content);
    await materialRepo.remove(material);
    res.send({ status: 'success' });
  } catch (error) {
    res.send(error);
  }
};
