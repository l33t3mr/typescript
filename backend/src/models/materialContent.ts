import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Material } from "./material";
import * as yup from 'yup';
import { Blob } from "node-fetch";

export const materialContentSchema = yup.object().shape(
    {
        // tslint:disable-next-line:object-literal-sort-keys
        content: yup.string().required(),
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

    @Column({ type:"mediumblob", nullable: false })
    content!: Uint8Array;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;
}