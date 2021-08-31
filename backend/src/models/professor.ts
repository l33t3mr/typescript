import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as yup from 'yup';

export const professorSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  // tslint:disable-next-line:object-literal-sort-keys
  email: yup.string().email(),
  address: yup.string().required(),
  // tslint:disable-next-line:only-arrow-functions
  dateOfBirth: yup.date().default(function () {
    return new Date();
  }),

  department: yup.string().required(),
});

@Entity()
export class Professor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  address!: string;

  @Column({ type: 'date' })
  dateOfBirth!: string;

  @Column()
  department!: string;
}
