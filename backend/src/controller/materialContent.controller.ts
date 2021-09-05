import { getRepository } from 'typeorm';
import { Material } from '../models/material';
import { MaterialContent } from '../models/materialContent';
import {Request, Response} from "express";

export const getMaterialContents = async (req, res) => {
  try {
    const materialContRepo = await getRepository(MaterialContent);
    const materialConts: MaterialContent[] = await materialContRepo.find();
    res.send({ status: 'success', data: materialConts });
  } catch (e) {
    // @ts-ignore
    res.status(404).send({ status: 'not_found' });
  }
};
export const getMaterialContent = async (req, res) => {
  const id = req.params.id;
  try {
    const materialContRepo = await getRepository(MaterialContent);
    const materialContent = await materialContRepo.findOneOrFail(id);
    res.send({ status: 'success', data: materialContent });
  } catch (e) {
    // @ts-ignore
    res.status(404).send({ status: 'not_found' });
  }
};
