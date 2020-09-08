import React from "react";


const ProgressBar = () => {
    return (
        <div className="progress my-2">
            <div className="progress-bar" role="progressbar" style={{width: "15%"}} aria-valuenow="15"
                 aria-valuemin="0" aria-valuemax="100">
                Work
            </div>
            <div className="progress-bar bg-success" role="progressbar" style={{width: "30%"}} aria-valuenow="30"
                 aria-valuemin="0" aria-valuemax="100">
                Holiday
            </div>
            <div className="progress-bar bg-info" role="progressbar" style={{width: "20%"}} aria-valuenow="20"
                 aria-valuemin="0" aria-valuemax="100">
                Doctor
            </div>
        </div>
    )
}

export default ProgressBar;