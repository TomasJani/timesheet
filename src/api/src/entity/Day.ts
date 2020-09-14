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
    id: number | undefined;

    @OneToMany(() => Entry, entry => entry.day)
    entries: Entry[] | undefined;

    @Column()
    user: string;

    @Column()
    date: string;
}