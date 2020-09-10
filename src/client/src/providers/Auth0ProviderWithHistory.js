import React from "react";
import {useHistory} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import config from "../auth_config.json";

const Auth0ProviderWithHistory = ({children}) => {
    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={config.domain}
            clientId={config.clientId}
            audience={config.audience}
            redirectUri={config.redirectUri}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;