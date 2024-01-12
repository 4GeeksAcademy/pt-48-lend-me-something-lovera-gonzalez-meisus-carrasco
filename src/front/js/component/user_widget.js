import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext.js'
import { useAuth0 } from "@auth0/auth0-react";

export const UserWidget = () => {

    const { store, actions } = useContext(Context)
    const { user } = useAuth0();


    if (!user) return null;
    return (<>
        <img src={user.picture} alt="profile picture" style={{ height: '3em', width: '3em', objectFit: 'contain', borderRadius: '50%', cursor: 'pointer' }} />
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h5 className="m-0">{user.name}</h5>
            <h6 className="m-0 text-secondary">Account Details</h6>
        </div>
    </>)
}