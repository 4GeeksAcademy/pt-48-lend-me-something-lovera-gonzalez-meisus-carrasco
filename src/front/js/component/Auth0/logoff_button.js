import React, {useContext} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from '../../store/appContext';


export const LogoffButton = (props) => {
    const {actions} = useContext(Context)


    const { logout } = useAuth0();

    const logoffClick = () => {
        logout({
            logoutParams: {
                returnTo: process.env.REACT_APP_LOGOFF_URL,
            },
        })
        actions.clearUser();
    }
    return (<>
        <button style={{...props.style}} onClick={logoffClick} className='light-gray--button'><i className="fa-solid fa-right-from-bracket" style={{color: 'white'}}></i></button>
    </>)
} 