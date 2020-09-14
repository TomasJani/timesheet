import {Entry} from "../entity/Entry";
import {getConnection} from "typeorm";
import {Day} from "../entity/Day";
import ResultType from "../enums/ResultType";
import {TIME_FORMAT} from "../constants";
import * as moment from "moment";
import DayService from "./DayService";


const EntryService =  {
    daysRepository: () => getConnection().getRepository(Day),
    entriesRepository: () => getConnection().getRepository(Entry),

    async GetEntries(): Promise<Entry[]> {
        return await this.entriesRepository().find({relations: ["day"]});
    },

    async NewEntry(type: number, start: string, end: string, date: string, user: string): Promise<[ResultType, Day]>  {
        const entry = new Entry(type, start, end);
        const day = await DayService.FindOrCreateByDate(date, user);
        if (!day.entries)
            day.entries = []

        if (this.validateDates(entry, day)) {
            return [ResultType.ERROR, day];
        }
        const result = await this.entriesRepository().save(entry);
        day.entries.push(result);
        await this.daysRepository().save(day);
        return [ResultType.SUCCESS, day];
    },

    validateDates (entry: Entry, day: Day): boolean {
        const checkStartEnd = moment(entry.start, TIME_FORMAT).isAfter(moment(entry.end, TIME_FORMAT));
        const doesIntercept = day.entries!.find(({start, end}) =>
            !(moment(entry.start, TIME_FORMAT).isSameOrAfter(moment(end, TIME_FORMAT)) ||
                moment(entry.end, TIME_FORMAT).isSameOrBefore(moment(start, TIME_FORMAT)))
        )

        return (checkStartEnd || (doesIntercept !== undefined));
    }
}

export default EntryService;