import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Entry} from "./Entry";


@Entity()
@Unique(["date", "user"])
export class Day {


    constructor(date: string, user: string) {
        this.date = date;
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Entry, entry => entry.day)
    entries: Entry[];

    @Column()
    user: string;

    @Column()
    date: string;
}