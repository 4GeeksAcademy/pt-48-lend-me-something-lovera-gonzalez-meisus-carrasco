import React, { useContext, useState } from 'react'
import '../../styles/top_searchbar.sass'
import '../../styles/shared.sass'
import { Context } from '../store/appContext.js'
import { GlobalSearchBar } from "../component/global_searchbar.js"
import { LogginButton } from '../component/Auth0/loggin_button.js'
import { LogoffButton } from '../component/Auth0/logoff_button.js'

import { useAuth0 } from "@auth0/auth0-react";
import { UserWidget } from './user_widget.js'

export const TopBar = () => {



    const { store } = useContext(Context)
    const [searchState, setSearchState] = useState(false)
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();

    const handleClick = () => {

        setSearchState(!searchState);
        console.log(searchState)
    }

    return (<>
        <GlobalSearchBar style={searchState ? { display: "flex" } : { display: "none" }} handleClick={handleClick} />

        <div className="dashboard-bar p-3 navbar-margin">
            <h3>{store.title}</h3>
            <div className="d-flex flex-row gap-3 align-items-center">
                {/*<i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
                <input className='search-input' type="text" name="search" id="search" placeholder="Search" />*/}
                {!isAuthenticated && <LogginButton />}
                {isAuthenticated && <LogoffButton />}
                <button onClick={handleClick}>ver barra</button>
                {isAuthenticated && <div className="d-flex flex-row gap-3 align-items-center justify-content-center" style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: '#444', cursor: 'pointer' }}>
                    <i className="fa-regular fa-bell" style={{ "color": "#ffffff" }}></i>
                </div>}
                {user && <UserWidget />}
            </div>
        </div>
    </>)
}