import {Repository} from "typeorm";
import {Day} from "../entity/Day";
import {Entry} from "../entity/Entry";
import DaysController from "./DaysController";
import * as moment from "moment";
import {TIME_FORMAT} from "../constants";
import ResultType from "../enums/ResultType";

class EntriesController {
    static daysRepository;
    static entriesRepository;

    constructor(daysRepository: Repository<Day>, entriesRepository: Repository<Entry>) {
        EntriesController.daysRepository = daysRepository;
        EntriesController.entriesRepository = entriesRepository;
    }

    static GetEntries = async (): Promise<Entry[]> =>
        await EntriesController.entriesRepository.find({relations: ["day"]});

    static NewEntry = async (type: number, start: string, end: string, date: string, user: string): Promise<[ResultType, Day]> => {
        const entry = new Entry(type, start, end);
        const day = await DaysController.FindOrCreateByDate(date, user);

        if (EntriesController.validateDates(entry, day))
            return [ResultType.ERROR, day];

        const result = await EntriesController.entriesRepository.save(entry);
        day.entries.push(result);
        await EntriesController.daysRepository.save(day);
        return [ResultType.SUCCESS, day];
    }

    static validateDates = (entry: Entry, day: Day): boolean => {
        const checkStartEnd = moment(entry.start, TIME_FORMAT).isAfter(moment(entry.end, TIME_FORMAT));
        const doesIntercept = day.entries.find(({start, end}) =>
            !(moment(entry.start, TIME_FORMAT).isSameOrAfter(moment(end, TIME_FORMAT)) ||
                moment(entry.end, TIME_FORMAT).isSameOrBefore(moment(start, TIME_FORMAT)))
        )

        return (checkStartEnd || (doesIntercept !== undefined));
    }
}

export default EntriesController;