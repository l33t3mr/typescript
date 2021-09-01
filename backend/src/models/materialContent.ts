import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Material } from "./material";
import * as yup from 'yup';
import { Blob } from "buffer";

export const materialContentSchema = yup.object().shape(
    {
        // tslint:disable-next-line:object-literal-sort-keys
        content: yup.string().required(),
        path: yup.string().required(),
        // tslint:disable-next-line:only-arrow-functions
        createdAt: yup.date().default(function () {
            return new Date();
        }),
        // tslint:disable-next-line:only-arrow-functions
        modifiedAt: yup.date().default(function () {
            return new Date();
        }),
    }
);

@Entity()
export class MaterialContent {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({type: 'blob', nullable: false })
    content!: Blob;

    @Column({ nullable: false })
    path!: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    modifiedAt: string;
}