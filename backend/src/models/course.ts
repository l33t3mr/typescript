import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as yup from 'yup';

export const courseSchema = yup.object().shape({
  name: yup.string().required(),
  // tslint:disable-next-line:object-literal-sort-keys
  duration: yup.string().required(),
  maxCapacity: yup.number().required().positive().integer(),
});
@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  duration!: string;

  @Column()
  maxCapacity!: number;
}
