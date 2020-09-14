import React from 'react';
import TimesheetHeader from "./TimesheetHeader";
import NewEntryForm from "./NewEntryForm";
import EntriesList from "./entrieslist/EntriesList";
import TableControl from "./TableControll";
import TimesheetProvider from "../../providers/TimesheetProvider";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../Loading";


const Timesheet = () => {
    return (
        <TimesheetProvider>
            <div className="container">
                <TimesheetHeader/>
                <NewEntryForm/>
                <TableControl/>
                <EntriesList/>
            </div>
        </TimesheetProvider>
    );
}

export default withAuthenticationRequired(Timesheet, {
    onRedirecting: () => <Loading/>,
});
