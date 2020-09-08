import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Entry} from "./Entry";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Entry, entry => entry.manager)
    entries: Entry[];

    @Column()
    name: string;

    @Column()
    admin: boolean;
}
