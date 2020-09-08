import React from 'react';
import Timesheet from "./components/Timesheet";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Navbar/>
            <div className="container">
                <Timesheet/>
            </div>
            <Footer/>
        </>
    );
}

export default App;
