import { Column, OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import * as yup from 'yup';
import { Professor } from './professor';
import { MaterialContent } from './materialContent';

export const materialSchema = yup.object().shape(
  {
    type: yup.string().required(),
    name: yup.string().required(),

  }
);

@Entity()
export class Material {
  @OneToOne(type => MaterialContent, { primary: true, cascade: ["update", "insert", "remove"] })
  @JoinColumn({ name: "contentID" })
  id!: MaterialContent;

  @Column({ nullable: false })
  type!: string;

  @Column({ nullable: false })
  name!: string;

  @ManyToOne(() => Professor, professor => professor.materials, {nullable: false})
  @JoinColumn({ name: "profID" })
  professor: Professor;
}
