import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Entry} from "./Entry";

@Entity()
@Unique(["date"])
export class Day {


    constructor(date: string) {
        this.date = date;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Entry, entry => entry.day)
    entries: Entry[];

    @Column()
    date: string;
}