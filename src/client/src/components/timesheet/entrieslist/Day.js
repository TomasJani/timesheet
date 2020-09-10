import * as moment from "moment";
import {DISPLAY_DATE_FORMAT} from "../../../constants";
import React from "react";
import Entry from "./Entry";


const Day = ({day}) => {
    return (
        <ul key={day.date} className="list-group my-3">
            <li key={day.date}
                className="list-group-item active d-flex justify-content-between align-items-center">
                <h3 className="m-0">{moment(day.date).format(DISPLAY_DATE_FORMAT)}</h3>
                <span>Entries count: {day.entries.length}</span>
            </li>
            {day.entries.map(entry => <Entry entry={entry}/>)}
        </ul>
    )
}

export default Day;