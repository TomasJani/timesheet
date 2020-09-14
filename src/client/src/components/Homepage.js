import React from 'react';
import {Link} from "react-router-dom";

const Homepage = () => {
    return (
        <>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-5">
                        Time Sheet Application
                    </h1>
                    <p>
                        Simple time sheet app for adding time entries into your calendar and calculating
                        paid hours from that.
                    </p>
                    <p>Start by logging in.</p>
                    <p><Link to="/app" className="btn btn-primary btn-md" href="#" role="button">Go to app »</Link></p>
                </div>
            </div>
        </>
    )
}

export default Homepage;