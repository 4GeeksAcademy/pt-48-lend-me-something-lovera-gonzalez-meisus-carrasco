import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


export const LogoffButton = () => {


	const { logout } = useAuth0();

    const logoffClick = () => {
        logout({
            logoutparams: {
                returnTo: window.location.origin,
            },
        })
        console.log('logoff clicked')
    }
    return (<>
        <button onClick={logoffClick}>Log Off</button>
    </>)
} 