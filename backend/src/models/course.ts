import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, Timestamp } from 'typeorm';
import * as yup from 'yup';
import { User } from './user'
import { Material } from './material';

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
  startsOn!: Date;

  @Column({ type: 'datetime', nullable: false })
  endsOn!: Date;

  @Column({ nullable: false })
  maxCapacity!: number;

  @ManyToMany(() => Material)
  @JoinTable()
  materials: Material[];
  
  @ManyToMany(() => User, user => user.courses )
  users: User[];
}
