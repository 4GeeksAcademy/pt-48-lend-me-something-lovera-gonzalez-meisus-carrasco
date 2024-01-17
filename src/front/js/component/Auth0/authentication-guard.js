import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Spinner } from '../spinner'

export const AuthenticationGuard = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="v-100 w-100 d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        ),
    });

    return <Component />;
};