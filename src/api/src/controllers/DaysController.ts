import {Day} from "../entity/Day";
import * as moment from 'moment';
import {Repository} from "typeorm";
import {DATE_FORMAT} from "../constants";

class DaysController {
    static FindOrCreateByDate = async (daysRepository: Repository<Day>, date: string): Promise<Day> => {
        const day = await DaysController.FindByDate(daysRepository, date);
        if (!day) {
            const newDay = await daysRepository.save(new Day(date));
            newDay.entries = [];
            return newDay;
        }
        return day;
    }

    static FindByDate = async (daysRepository: Repository<Day>, date: string): Promise<Day> =>
        await daysRepository.findOne({date: date}, {relations: ["entries"]});

    static FindByDateOrDefault = async (daysRepository: Repository<Day>, date: string): Promise<Day> => {
        const day = await DaysController.FindByDate(daysRepository, date);
        if (!day) {
            const defaultDay = new Day(date);
            defaultDay.entries = [];
            return defaultDay;
        }

        return day;
    }


    static GetDays = async (daysRepository: Repository<Day>, firstDay: string, n: number): Promise<Day[]> => {
        const daysDates = [moment(firstDay, DATE_FORMAT)];

        for (let i = 0; i < n - 1; ++i)
            daysDates.push(daysDates[i].clone().add(1, 'day'));

        return Promise.all(
            daysDates.map(async (date) => await DaysController.FindByDateOrDefault(daysRepository, date.format(DATE_FORMAT)))
        );
    }
}

export default DaysController;