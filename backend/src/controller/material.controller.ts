import { RequestHandler, Request, Response } from 'express';
import { Material } from '../models/material';
import { getRepository } from 'typeorm';
import { User } from '../models/user';
import { MaterialContent } from '../models/materialContent';
import { Blob } from 'buffer';
import { connect } from 'http2';
import { create } from 'domain';

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
  // @ts-ignore
  const { type, name, content, path } = req.body;
  try {
    const materialRepo = await getRepository(Material);
    const material = await materialRepo.findOneOrFail(id);
    const materialContentRepo = await getRepository(MaterialContent);
    if (type != null) {
      material.type = type;
    }
    if (name != null) {
      material.name = name;
    }
    material.materialContent.content = content;
    await materialContentRepo.save(material.materialContent);
    await materialRepo.save(material);
    // @ts-ignore
    res.send({ status: 'success' });
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ "error": error });
  }
};

export const postMaterial = async (req, res) => {
  try {
    // @ts-ignore
    const { userID } = req.params.id;
    const file = req.file;

    const userRepo = await getRepository(User);
    const user = await userRepo.findOneOrFail(userID, {relations: ['materials']});

    const materialRepo = await getRepository(Material);

    const material = new Material();
    material.type = file.mimetype;
    material.name = file.originalname;
    const content = new MaterialContent();
    content.content = file.buffer;
    content.createdAt = new Date();
    content.modifiedAt = new Date();
    material.materialContent = content;
    
    const createdMaterial = await materialRepo.save(material);
    
    await user.materials.push(material);
    await userRepo.save(user);


    res.send({
      'status': 'successful',
      'id': createdMaterial.id
    })

  } catch (error) {
    res.send(error)
  }



  // // tslint:disable-next-line:no-shadowed-variable
  // const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });
  // try {
  //   const userRepo = await getRepository(User);
  //   const user = await userRepo.findOneOrFail(userID, { relations: ['materials'] });
  //   const materialRepo = await getRepository(Material);
  //   if (user.role !== 'prof') {
  //     throw ('User does not have permissions to create a course');
  //   }
  //   const material = new Material();
  //   const materialContentRepo = await getRepository(MaterialContent);

  //   material.type = type;

  //   material.name = name;

  //   // @ts-ignore
  //   material.materialContent.content = await fileToBlob(req.files, name, { type });
  //   // @ts-ignore
  //   console.log(await fileToBlob(req.files, name, { type }));
  //   // material.materialContent.path = req.filepath;
  //   material.materialContent.path = path;
  //   await materialContentRepo.save(material.materialContent);
  //   user.materials.push(material);
  //   const createdUser = await userRepo.save(user);
  //   const  createdMaterial =  await materialRepo.save(material);
  //   // @ts-ignore
  //   res.send({ status: 'success', id: createdUser.courses.pop()?.id});
  // } catch (error) {
  //   // @ts-ignore
  //   res.status(500).send({ "error": error });
  // }
};
export const deleteMaterial = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const materialRepo = await getRepository(Material);
    const material = await materialRepo.findOneOrFail(id);
    await materialRepo.remove(material);
    res.send({ status: 'success' });
  } catch (error) {
    res.send(error);
  }
};
