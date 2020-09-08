import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
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

    @ManyToOne(() => User, user => user.entries)
    manager: User;

    @ManyToOne(() => Day, day => day.entries)
    day: User;
    
    @Column()
    type: number;

    @Column()
    start: string;

    @Column()
    end: string;
}