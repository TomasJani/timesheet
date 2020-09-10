import React, {createContext, useContext, useEffect, useState} from "react";
import {SERVER_BASE_URL} from "../constants";
import {useAlert} from "../hooks/useAlert";
import {useAuth0} from "@auth0/auth0-react";
import {usePaidTime} from "../hooks/usePaidTime";
import {useNationalHolidays} from "../hooks/useNationalHolidays";
import useLeadingDate from "../hooks/useLeadingDate";


const TimesheetContext = createContext();
export const useTimesheet = () => useContext(TimesheetContext);

export default function TimesheetProvider({children}) {
    const [days, setDays] = useState([]);

    const {paidHours, getPaidHours} = usePaidTime(days);
    const [nationalHolidays, getNationalHoliday] = useNationalHolidays(days);
    const [timeSpan, setTimeSpan] = useState(1);
    const [leadingDate, moveLeadingDate] = useLeadingDate(timeSpan);

    const [setShowAlert, intersectingAlert] = useAlert("Intersecting time spans.", "alert-danger");
    const {user} = useAuth0();

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
        const changesResponse = await fetch(`${SERVER_BASE_URL}/days/${timeSpan}?date=${leadingDate}&user=${user.sub}`);
        const newDays = await changesResponse.json();
        setDays([...newDays]);
    }

    return (
        <TimesheetContext.Provider
            value={{
                days, timeSpan, setTimeSpan, leadingDate, paidHours, nationalHolidays, intersectingAlert,
                addEntry, moveLeadingDate
            }}>
            {children}
        </TimesheetContext.Provider>
    );
};