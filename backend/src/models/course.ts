import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Timestamp } from 'typeorm';
import * as yup from 'yup';
import { Professor } from './professor'
import { Material } from './material';
import { Student } from './student';

export const courseSchema = yup.object().shape(
  {
    name: yup.string().required(),
    // tslint:disable-next-line:object-literal-sort-keys
    startsOn: yup.date().required(),
    endsOn: yup.date().required(),
    maxCapacity: yup.number().required().positive().integer(),
  }
);

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ type: 'datetime', nullable: false })
  startsOn!: string;

  @Column({ type: 'datetime', nullable: false })
  endsOn!: string;

  @Column({ nullable: false })
  maxCapacity!: number;

  @ManyToOne(() => Professor, professor => professor.courses, { nullable: false })
  professor: Professor;

  @ManyToMany(() => Material, {onDelete: 'CASCADE'})
  @JoinTable()
  materials: Material[];

  @ManyToMany(() => Student)
  @JoinTable()
  students: Student[];
}
