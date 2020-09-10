import React from 'react';
import {useTimesheet} from "../../providers/TimesheetProvider";


const TableControl = () => {
    const {moveLeadingDate} = useTimesheet();

    return (
        <div className="d-flex justify-content-between mb-2">
            <button onClick={() => moveLeadingDate('decrement')} type="button" className="btn btn-primary">&lt; Previous</button>
            <button onClick={() => moveLeadingDate('increment')} type="button" className="btn btn-primary">Next &gt;</button>
        </div>
    )
}

export default TableControl