import React, {useEffect, useState} from "react";
import {EntryOptions} from "../enums/EntryOptions";
import {useTimesheet} from "../providers/TimesheetProvider";
import moment from "moment";
import {TIME_FORMAT} from "../constants";
import {useAlert} from "../hooks/useAlert";


const NewEntryForm = () => {
    const {addEntry, intersectingAlert, leadingDate} = useTimesheet();
    const [date, setDate] = useState(leadingDate);
    const [start, setStart] = useState(moment().format(TIME_FORMAT));
    const [end, setEnd] = useState(moment().format(TIME_FORMAT));
    const [type, setType] = useState(0)

    const [setShowAlert, formatAlert] = useAlert("Wrong time entry format. Check your start/end time.", "alert-danger");

    useEffect(() => {
        setDate(leadingDate);
    }, [leadingDate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (moment(start, TIME_FORMAT).isSameOrAfter(moment(end, TIME_FORMAT))) {
            setShowAlert(true);
            return;
        }

        const newEntry = {type, start, end, date}
        await addEntry(newEntry);
    }

    return (
        <form className="form-inline justify-content-between my-4" onSubmit={handleSubmit}>
            <label htmlFor="default-picker">New entry:</label>
            <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)}/>
            <input type="time" className="form-control" placeholder="Select start time" value={start}
                   onChange={e => setStart(e.target.value)}
            />
            <input type="time" className="form-control" placeholder="Select end time" value={end}
                   onChange={e => setEnd(e.target.value)}
            />
            <select className="custom-select" value={type} onChange={e => setType(+e.target.value)}>
                {EntryOptions.map(({name}, i) => <option key={i} value={i}>{name}</option>)}
            </select>
            <button type="submit" className="btn btn-primary mb-2">Submit</button>

            {formatAlert}
            {intersectingAlert}

        </form>

    )
}

export default NewEntryForm;