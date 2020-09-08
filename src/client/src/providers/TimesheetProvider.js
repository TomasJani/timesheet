import React, {createContext, useContext, useEffect, useState} from "react";
import {DATE_FORMAT, HOLIDAY_API, SERVER_BASE_URL, TIME_FORMAT} from "../constants";
import moment from "moment";
import {EntryOptions} from "../enums/EntryOptions";
import {useAlert} from "../hooks/useAlert";


const TimesheetContext = createContext();
export const useTimesheet = () => useContext(TimesheetContext);

export default function TimesheetProvider({children}) {
    const [leadingDate, setLeadingDate] = useState(moment().format(DATE_FORMAT)); // reducer
    const [days, setDays] = useState([]);
    const [paidHours, setPaidHours] = useState(0);
    const [timeSpan, setTimeSpan] = useState(1);
    const [nationalHolidays, setNationalHolidays] = useState([]);
    const [setShowAlert, intersectingAlert] = useAlert("Intersecting time spans.", "alert-danger");

    useEffect(() => {
        (async function () {
            await getDays();
        })()
    }, [leadingDate, timeSpan])

    useEffect(() => {
        (async function () {
            await getPaidHours();
            await getNationalHoliday();
        })()
    }, [days])

    const addEntry = async entry => {
        const response = await fetch(`${SERVER_BASE_URL}/entries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });
        if (response.status === 500) {
            setShowAlert(true);
            return;
        }

        const newDay = await response.json();
        setDays(days.map(day => day.date === newDay.date ? newDay : day));
    }

    const getDays = async () => {
        const changesResponse = await fetch(`${SERVER_BASE_URL}/days/${timeSpan}?date=${leadingDate}`);
        const newEntries = await changesResponse.json();
        setDays([...newEntries]);
    }

    const nextLeading = async () => {
        const day = moment(leadingDate).add(timeSpan, 'day').format(DATE_FORMAT);
        setLeadingDate(day);
    }

    const prevLeading = async () => {
        const day = moment(leadingDate).subtract(timeSpan, 'day').format(DATE_FORMAT);
        setLeadingDate(day);
    }

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

    const getNationalHoliday = async () => {
        const holidays = await Promise.all(days.map(async (day) => {
            const date = moment(day.date, DATE_FORMAT);
            const holidayResponse = await fetch(`${HOLIDAY_API}&year=${date.year()}&month=${date.month()+1}&day=${date.date()}`);
            return await holidayResponse.json();
        }));
        setNationalHolidays(holidays);
    }

    return (
        <TimesheetContext.Provider
            value={{days, setDays, timeSpan, setTimeSpan, paidHours, nationalHolidays, intersectingAlert, leadingDate,
                addEntry, getEntries: getDays, nextLeading, prevLeading}}>
            {children}
        </TimesheetContext.Provider>
    );
};