import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


export const LogoffButton = () => {


    const { logout } = useAuth0();

    const logoffClick = () => {
        logout({
            logoutParams: {
                returnTo: process.env.REACT_APP_LOGOFF_URL,
            },
        })
        console.log('logoff clicked')
    }
    return (<>
        <button onClick={logoffClick} className='light-gray--button'>Log Off</button>
    </>)
} 