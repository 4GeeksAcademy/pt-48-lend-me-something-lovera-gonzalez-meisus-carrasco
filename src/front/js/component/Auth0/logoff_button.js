import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


export const LogoffButton = (props) => {


    const { logout } = useAuth0();

    const logoffClick = () => {
        logout({
            logoutParams: {
                returnTo: process.env.REACT_APP_LOGOFF_URL,
            },
        })
        // console.log('logoff clicked')
    }
    return (<>
        <button style={{...props.style}} onClick={logoffClick} className='light-gray--button'><i className="fa-solid fa-right-from-bracket" style={{color: 'white'}}></i></button>
    </>)
} 