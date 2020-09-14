import {getConnection} from "typeorm";
import {Day} from "../entity/Day";
import * as moment from "moment";
import {DATE_FORMAT} from "../constants";


const daysRepository = getConnection().getRepository(Day)

const DayService = {

    async FindOrCreateByDate (date: string, user: string): Promise<Day> {
        const day = await this.FindByDate(date, user);
        if (!day)
            return await daysRepository.save(new Day(date, user));

        return day;
    },

    async FindByDate(date: string, user: string): Promise<Day | undefined> {
        return await daysRepository.findOne({date: date, user: user}, {relations: ["entries"]});
    },

    async FindByDateOrDefault(date: string, user: string): Promise<Day> {
        const day = await this.FindByDate(date, user);
        if (!day) {
            const defaultDay = new Day(date, "");
            defaultDay.entries = [];
            return defaultDay;
        }

        return day;
    },

    async GetDays(firstDay: string, user: string, n: number): Promise<Day[]> {
        const daysDates = [moment(firstDay, DATE_FORMAT)];

        for (let i = 0; i < n - 1; ++i)
            daysDates.push(daysDates[i].clone().add(1, 'day'));

        return await Promise.all(
            daysDates.map(async (date) =>
                await this.FindByDateOrDefault(date.format(DATE_FORMAT), user))
        );
    }
}

export default DayService;