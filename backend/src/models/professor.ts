import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as yup from 'yup';
import { Material } from './material';
import { Course } from './course';

export const professorSchema = yup.object().shape(
  {
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    // tslint:disable-next-line:object-literal-sort-keys
    email: yup.string().email().required(),
    address: yup.string().required(),
    // tslint:disable-next-line:only-arrow-functions
    dateOfBirth: yup.date().required(),
    department: yup.string().required(),
  }
);

@Entity()
export class Professor {
  // constructor({firstName, lastName, password,
  //   email, address, dob, dep }){
  //     this.firstName = firstName;
  //     this.lastName = lastName;
  //     this.password = password;
  //     this.email = email;
  //     this.address = address;
  //     this.dateOfBirth = dob;
  //     this.department = dep;
  // }

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
  dateOfBirth!: Date;

  @Column({ nullable: false })
  department!: string;

  @OneToMany(() => Material, material => material.professor, { eager: true })
  materials: Material[];

  @OneToMany(() => Course, course => course.professor, { eager: true })
  courses: Course[];
}
