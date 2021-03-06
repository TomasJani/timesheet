import moment from "moment";
import {DATE_FORMAT, HOLIDAY_API} from "../constants";
import {useState} from "react";

const useNationalHolidays = (days) => {
    const [nationalHolidays, setNationalHolidays] = useState([]);

    const getNationalHoliday = async () => {
        const holidays = await Promise.all(days.map(async (day) => {
            const date = moment(day.date, DATE_FORMAT);
            const holidayResponse = await fetch(
                `${HOLIDAY_API}&year=${date.year()}&month=${date.month()+1}&day=${date.date()}`
            );
            if (holidayResponse.status === 422) {
                console.warn("Holiday API reached its monthly limits.");
                return;
            }
            return await holidayResponse.json();
        }));
        setNationalHolidays(holidays);
    }

    return [nationalHolidays, getNationalHoliday];
}

export default useNationalHolidays;