import React from 'react';
import {useTimesheet} from "../providers/TimesheetProvider";

const TableControl = () => {
    const {nextLeading, prevLeading} = useTimesheet();

    return (
        <div className="d-flex justify-content-between mb-2">
            <button onClick={prevLeading} type="button" className="btn btn-primary">&lt; Previous</button>
            <button onClick={nextLeading} type="button" className="btn btn-primary">Next &gt;</button>
        </div>
    )
}

export default TableControl