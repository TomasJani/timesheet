import React from 'react';
import TimesheetHeader from "./TimesheetHeader";
import NewEntryForm from "./NewEntryForm";
import EntriesList from "./EntriesList";
import TableControl from "./TableControll";
import TimesheetProvider from "../../providers/TimesheetProvider";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../Loading";


const Timesheet = () => {
    return (
        <TimesheetProvider>
            <TimesheetHeader/>
            <NewEntryForm/>
            <TableControl/>
            <EntriesList/>
        </TimesheetProvider>
    );
}

export default withAuthenticationRequired(Timesheet, {
    onRedirecting: () => <Loading/>,
});
