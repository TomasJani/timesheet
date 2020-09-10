import React from "react";
import {useTimesheet} from "../../../providers/TimesheetProvider";
import NationalHolidays from "./NationalHolidays";
import Day from "./Day";


const EntriesList = () => {
    const {days} = useTimesheet();

    return (
        <>
            <NationalHolidays/>

            {days.map((day) => {
                if (day.entries.length === 0)
                    return "";
                return (
                    <Day day={day} />
                )
            })}
        </>
    )
}

export default EntriesList;