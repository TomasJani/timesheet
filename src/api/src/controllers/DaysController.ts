import {Day} from "../entity/Day";
import * as moment from 'moment';
import {Repository} from "typeorm";
import {DATE_FORMAT} from "../constants";

class DaysController {
    static daysRepository;

    constructor(daysRepository: Repository<Day>) {
        DaysController.daysRepository = daysRepository;
    }

    static FindOrCreateByDate = async (date: string, user: string): Promise<Day> => {
        const day = await DaysController.FindByDate(date, user);
        if (!day) {
            const day = await DaysController.daysRepository.save(new Day(date, user));
            day.entries = [];
            return day;
        }

        return day;
    }

    static FindByDate = async (date: string, user: string): Promise<Day> =>
        await DaysController.daysRepository.findOne({date: date, user: user}, {relations: ["entries"]});

    static FindByDateOrDefault = async (date: string, user: string): Promise<Day> => {
        const day = await DaysController.FindByDate(date, user);
        if (!day) {
            const defaultDay = new Day(date, "");
            defaultDay.entries = [];
            return defaultDay;
        }

        return day;
    }


    static GetDays = async (firstDay: string, user: string, n: number): Promise<Day[]> => {
        const daysDates = [moment(firstDay, DATE_FORMAT)];

        for (let i = 0; i < n - 1; ++i)
            daysDates.push(daysDates[i].clone().add(1, 'day'));

        return await Promise.all(
            daysDates.map(async (date) =>
                await DaysController.FindByDateOrDefault(date.format(DATE_FORMAT), user))
        );
    }
}

export default DaysController;