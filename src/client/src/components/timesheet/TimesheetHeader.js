import React from "react";
import {useTimesheet} from "../../providers/TimesheetProvider";
import {TimeSpans} from "../../enums/TimeSpans";


const TimesheetHeader = () => {
    const {timeSpan, setTimeSpan, paidHours} = useTimesheet();

    function getTimeSpans() {
        return <>
            {TimeSpans.map(({name, value}, i) =>
                <option key={i} value={value}>{name}</option>)}
        </>;
    }

    return (
        <div className="my-3 d-flex justify-content-between">
            <span>
                <select className="custom-select" value={timeSpan} onChange={(e) => setTimeSpan(+e.target.value)}>
                    {getTimeSpans()}
                </select>
            </span>

            <span className="btn btn-primary">
                Paid hours: <span className="badge badge-light">{Math.round(paidHours * 100) / 100}</span>
            </span>
        </div>
    )
}

export default TimesheetHeader;