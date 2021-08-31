import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as yup from 'yup';

export const materialSchema = yup.object().shape({
  type: yup.string().required(),
  // tslint:disable-next-line:object-literal-sort-keys
  content: yup.string().required(),
  path: yup.string().required(),
  // tslint:disable-next-line:only-arrow-functions
  createdAt: yup.date().default(function () {
    return new Date();
  }),
  // tslint:disable-next-line:only-arrow-functions
  modifiedAt: yup.date().default(function () {
    return new Date();
  }),
});

@Entity()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  type!: string;

  @Column()
  content!: string;

  @Column()
  path!: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  modifiedAt: string;
}
