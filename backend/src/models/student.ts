import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as yup from 'yup';

export const studentSchema = yup.object().shape({
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
  isTutor: yup.boolean().required(),
  department: yup.string().required(),
  currentEducationLevel: yup.string().required(),
  currentStudySemester: yup.number().required().positive().integer(),
});
export type educationLevel = 'bachelor' | 'master' | 'diploma';

@Entity()
export class Student {
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

  @Column()
  isTutor!: boolean;

  @Column({
    type: 'enum',
    // tslint:disable-next-line:object-literal-sort-keys
    enum: ['bachelor', 'master', 'diploma'],
    default: 'bachelor',
  })
  currentEducationLevel!: educationLevel;

  @Column()
  currentStudySemester!: number;
}
