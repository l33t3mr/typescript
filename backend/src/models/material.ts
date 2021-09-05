import { Column, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import * as yup from 'yup';
import { User } from './user';
import { MaterialContent } from './materialContent';

export const materialSchema = yup.object().shape(
  {
    type: yup.string().required(),
    name: yup.string().required(),

  }
);

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  type!: string;

  @Column({ nullable: false })
  name!: string;

  @OneToOne(() => MaterialContent, { cascade: true })
  @JoinColumn()
  materialContent: MaterialContent

  @ManyToOne(() => User, user => user.materials)
  @JoinColumn()
  user: User;
}
