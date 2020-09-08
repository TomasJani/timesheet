import React from 'react';
import ProgressBar from "./ProgressBar";
import TimesheetHeader from "./TimesheetHeader";
import NewEntryForm from "./NewEntryForm";
import EntriesList from "./EntriesTable";
import TableControl from "./TableControll";
import TimesheetProvider from "../providers/TimesheetProvider";


const Timesheet = () => {
    return (
        <TimesheetProvider>
            <TimesheetHeader/>
            <ProgressBar/>
            <NewEntryForm/>
            <TableControl/>
            <EntriesList/>
        </TimesheetProvider>
    );
}

export default Timesheet;