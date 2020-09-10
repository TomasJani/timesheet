import {Day} from "../entity/Day";
import * as moment from 'moment';
import {Repository} from "typeorm";
import {DATE_FORMAT} from "../constants";

class DaysController {
    static FindOrCreateByDate = async (daysRepository: Repository<Day>, date: string, user: string): Promise<Day> => {
        const day = await DaysController.FindByDate(daysRepository, date, user);
        if (!day) {
            const day = await daysRepository.save(new Day(date, user));
            day.entries = [];
            return day;
        }

        return day;
    }

    static FindByDate = async (daysRepository: Repository<Day>, date: string, user: string): Promise<Day> =>
        await daysRepository.findOne({date: date, user: user}, {relations: ["entries"]});

    static FindByDateOrDefault = async (daysRepository: Repository<Day>, date: string, user: string): Promise<Day> => {
        const day = await DaysController.FindByDate(daysRepository, date, user);
        console.log(`Date: ${date} User: ${user} Day: ${day}`);
        if (!day) {
            const defaultDay = new Day(date, "");
            defaultDay.entries = [];
            return defaultDay;
        }

        return day;
    }


    static GetDays = async (daysRepository: Repository<Day>, firstDay: string, user: string, n: number): Promise<Day[]> => {
        const daysDates = [moment(firstDay, DATE_FORMAT)];

        for (let i = 0; i < n - 1; ++i)
            daysDates.push(daysDates[i].clone().add(1, 'day'));

        return await Promise.all(
            daysDates.map(async (date) =>
                await DaysController.FindByDateOrDefault(daysRepository, date.format(DATE_FORMAT), user))
        );
    }
}

export default DaysController;