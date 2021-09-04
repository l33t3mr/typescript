import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import * as yup from 'yup';
import { Material } from './material';
import { Course } from './course';

export const userSchema = yup.object().shape(
  {
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    // tslint:disable-next-line:object-literal-sort-keys
    email: yup.string().email().required(),
    address: yup.string().required(),
    // tslint:disable-next-line:only-arrow-functions
    dob: yup.date().required(),
    dep: yup.string().required(),
  }
);


export type role = 'student' | 'tutor' | 'prof';


@Entity()
export class User {

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
  dob!: Date;

  @Column({ nullable: false })
  dep!: string;

  @OneToMany(() => Material, material => material.user, { cascade: true })
  materials: Material[];

  /* 
  cascade will take care of saving the entity, but deleting deletes only 
  the intermediate table, that's why the user has to take care of deleting 
  the courses manually. See users.controller.ts.deleteUser
  */
  @ManyToMany(() => Course, course => course.users, {
    cascade: true,
  })
  @JoinTable()
  courses: Course[];

  @Column({
    type: 'enum',
    // tslint:disable-next-line:object-literal-sort-keys
    enum: ['student', 'prof', 'tutor'],
    default: 'student',
    nullable: false
  })
  role!: role;
}
