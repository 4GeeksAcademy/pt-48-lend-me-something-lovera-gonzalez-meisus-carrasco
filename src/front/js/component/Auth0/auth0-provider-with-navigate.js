import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { store, actions } = useContext(Context)

    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId && redirectUri)) {
        return null;
    }

    useEffect(() => {
        if (user) actions.setUser(user)
    }, [user])

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};