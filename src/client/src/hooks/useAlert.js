import React, {useState} from "react";


export const useAlert = (text, classes) => {
    const [showAlert, setShowAlert] = useState(false);
    const alert = showAlert ? (
        <div className={`alert alert-dismissible fade w-100 mt-3 show ${showAlert} ${classes}`} role="alert">
            <strong>{text}</strong>
            <button type="button" className="close" onClick={() => setShowAlert(false)}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    ) : "";

    return [setShowAlert, alert];
}