import React, { useState, useContext, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from '../store/appContext.js'
import { Link } from 'react-router-dom';
import { LogoffButton } from './Auth0/logoff_button.js';
import '../../styles/user_collapsable_dropdown.sass'




export const UserSpinner = () => {

    const { store, actions } = useContext(Context)
    const [ searchState, setSearchState ] = useState(false)
    const { isAuthenticated, user } = useAuth0();
    const [visible, setVisible] = useState();

    const showCollapsable = (event) => {
        event.stopPropagation()
        actions.switchVisible();
    };

    const hideCollapsable  = () => {
        actions.switchVisible();
    };

    useEffect(()=>{
        
        setVisible(store.collapsableState)
    }, [])

    return (<>
        <div className={store.collapsableState ? "collapsable collapsable--active" : "collapsable"} id='collapsable'>
            <div className='collapsable--list'  onMouseLeave={hideCollapsable}>
                
                <div className="collapsable--hr"  />
                <Link className="collapsable--list-link"  to="/login">Profile</Link>
                <div className="collapsable--hr"  />
                <Link className="collapsable--list-link"  to="/portfolio">Portfolio</Link>
                <div className="collapsable--hr"  />
                <Link className="collapsable--list-link"  to="/subscription">Settings</Link>
                <div className="collapsable--hr"  />
                <LogoffButton style={{height: '3em', width: '3em', borderRadius: '50%', padding: 0}} />            </div>
        </div>
        <img className="navbar-profilepicture" src={user.picture} onClick={showCollapsable} />
    </>)
}