import React, { useContext } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from '../../store/appContext'



export const LogginButton = () => {

    const { store, actions } = useContext(Context)

    const { loginWithRedirect } = useAuth0();
    const { user } =  useAuth0();

    const loginClick = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: '/dashboard'
            },
        });
        console.log('loggin clicked');
    }
    return (<>
        <button onClick={loginClick}>Log In</button>
    </>)
} 