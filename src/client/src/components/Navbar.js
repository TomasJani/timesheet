import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";

const Navbar = () => {
    const {loginWithRedirect, isAuthenticated, logout} = useAuth0();

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
            <Link to="/" className="navbar-brand">Timesheet</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/app" className="nav-link btn btn-outline-primary">App</Link>
                    </li>

                    {isAuthenticated ? (
                        <li className="nav-item">
                            <button className="nav-link btn btn-outline-primary" onClick={logout}>Log Out</button>
                        </li>

                    ) : (
                        <li className="nav-item">
                            <button className="nav-link btn btn-outline-primary" onClick={loginWithRedirect}>Log In</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;