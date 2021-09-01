import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import * as yup from 'yup';
import { Course } from './course';

export const studentSchema = yup.object().shape(
  {
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    // tslint:disable-next-line:object-literal-sort-keys
    email: yup.string().email(),
    address: yup.string().required(),
    // tslint:disable-next-line:only-arrow-functions
    dateOfBirth: yup.date().required(),
    isTutor: yup.boolean().default(() => {
      return false
    }),
    department: yup.string().required(),
    currentEducationLevel: yup.string().required(),
    currentStudySemester: yup.number().required().positive().integer(),
  }
);
export type educationLevel = 'bachelor' | 'master' | 'diploma';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  address!: string;

  @Column({ type: 'date', nullable: false })
  dateOfBirth!: string;

  @Column({ nullable: false })
  department!: string;

  @Column({ nullable: false })
  isTutor!: boolean;

  @Column({
    type: 'enum',
    // tslint:disable-next-line:object-literal-sort-keys
    enum: ['bachelor', 'master', 'diploma'],
    default: 'bachelor',
    nullable: false
  })
  currentEducationLevel!: educationLevel;

  @Column({ nullable: false })
  currentStudySemester!: number;

  @ManyToMany(() => Course, course => course.students)
  courses: Course[];
}
