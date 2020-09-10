import {useState} from "react";
import {EntryOptions} from "../enums/EntryOptions";
import moment from "moment";
import {TIME_FORMAT} from "../constants";

export const usePaidTime = (days) => {
    const [paidHours, setPaidHours] = useState(0);

    const getPaidHours = async () => {
        const paidHoursArray = days.map((day) => {
            return day.entries.reduce((acc, cv) => {
                if (EntryOptions[cv.type].paid) {
                    const duration = moment.duration(moment(cv.end, TIME_FORMAT).diff(moment(cv.start, TIME_FORMAT)));
                    return acc + duration.asHours();
                }
                return acc;
            }, 0)
        })

        setPaidHours(
            paidHoursArray.reduce((acc, cv) => acc + cv, 0)
        )
    }

    return {paidHours, getPaidHours}
}