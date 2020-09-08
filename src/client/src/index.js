import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import {BrowserRouter as Router} from "react-router-dom";
import Auth0ProviderWithHistory from "./providers/Auth0ProviderWithHistory";


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Auth0ProviderWithHistory>
                <App/>
            </Auth0ProviderWithHistory>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
