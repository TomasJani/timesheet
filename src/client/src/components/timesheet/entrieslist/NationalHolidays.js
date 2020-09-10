import React from "react";
import {useTimesheet} from "../../../providers/TimesheetProvider";


const NationalHolidays = () => {
    const {nationalHolidays} = useTimesheet();

    return <ul className="list-group mt-3">
        {nationalHolidays.map(d =>
            d.map(holiday =>
                <li key={holiday.name} className="list-group-item">{holiday.name}</li>
            )
        )}
    </ul>;
}

export default NationalHolidays;