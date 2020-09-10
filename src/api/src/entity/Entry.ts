import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Day} from "./Day";


@Entity()
export class Entry {
    constructor(type: number, start: string, end: string) {
        this.type = type;
        this.start = start;
        this.end = end;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Day, day => day.entries)
    day: Day;

    @Column()
    type: number;

    @Column()
    start: string;

    @Column()
    end: string;
}