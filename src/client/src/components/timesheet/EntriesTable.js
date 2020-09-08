import React from "react";
import {useTimesheet} from "../../providers/TimesheetProvider";
import * as moment from "moment";
import {DISPLAY_DATE_FORMAT} from "../../constants";
import {TimeOptions} from "../../enums/EntryOptions";


const EntriesList = () => {
    const {days, nationalHolidays} = useTimesheet();
    return (
        <>
            <ul className="list-group mt-3">
                {nationalHolidays.map(d =>
                    d.map(holiday =>
                        <li key={holiday.name} className="list-group-item">{holiday.name}</li>
                    )
                )}
            </ul>
            {days.map((day) => {
                if (day.entries.length === 0)
                    return "";
                return (
                    <ul key={day.date} className="list-group my-3">
                        <li key={day.date}
                            className="list-group-item active d-flex justify-content-between align-items-center">
                            <h3 className="m-0">{moment(day.date).format(DISPLAY_DATE_FORMAT)}</h3>
                            <span>Entries count: {day.entries.length}</span>
                        </li>
                        {day.entries.map(entity => {
                                const option = TimeOptions[entity.type];
                                return <li
                                    key={entity.id}
                                    className={`list-group-item d-flex justify-content-between ${option.color} text-white`}>
                                    <span>{`Entry from ${entity.start} to ${entity.end}`}</span>
                                    <span>{`${option.name} ${option.paid ? "is" : "is not"} paid`}</span>
                                </li>;
                            }
                        )}
                    </ul>
                )
            })}
        </>
    )
}

export default EntriesList;