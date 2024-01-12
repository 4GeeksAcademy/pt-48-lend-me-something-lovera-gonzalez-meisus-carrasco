import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


export const LogginButton = () => {

    const { loginWithRedirect } = useAuth0();

    const loginClick = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: '/dashboard'
            },
        });
        console.log('loggin clicked')
    }
    return (<>
        <button onClick={loginClick}>Log In</button>
    </>)
} 