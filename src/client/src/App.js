import React from 'react';
import Timesheet from "./components/timesheet/Timesheet";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import {Route, Switch} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import Loading from "./components/Loading";

function App() {
    const {isLoading} = useAuth0();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/app" component={Timesheet}/>
                </Switch>
            </div>
            <Footer/>
        </>
    );
}

export default App;
