import React, { useContext, useState, useEffect } from 'react'
import '../../styles/top_searchbar.sass'
import '../../styles/shared.sass'
import { Context } from '../store/appContext.js'
import { GlobalSearchBar } from "../component/global_searchbar.js"
import { LogginButton } from '../component/Auth0/loggin_button.js'
import { useAuth0 } from "@auth0/auth0-react";
import { UserWidget } from './user_widget.js'
import { Link } from 'react-router-dom'
import { UserSpinner } from './user_collapsable_dropdown.js'
import { get_all_data } from '../store/forex_api.js'

export const TopBar = () => {

    const { isAuthenticated, isLoading, user } = useAuth0();
    const { store, actions } = useContext(Context);

    const handleClick = () => {

        actions.switchSearchState();
        // console.log(searchState)
    }

    useEffect(() => {
        !store.forexDB ? actions.setForexDB() : null
        !store.cryptoDB ? actions.setCryptoDB() : null
        !store.commoditiesDB ? actions.setCommoditiesDB() : null
    }, [])

    useEffect(() => {
        
					
        if (user) actions.setUser(user);

    }, [user])

    return (<>
        <GlobalSearchBar style={store.searchState ? { display: "flex" } : { display: "none" }} handleClick={handleClick} />

        <div className="dashboard-bar p-3">
            <h3>{store.title}</h3>
            <div className="d-flex flex-row gap-3 align-items-center">
                {/*<i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
                <input className='search-input' type="text" name="search" id="search" placeholder="Search" />*/}
                <div className="d-flex flex-row gap-3 align-items-center justify-content-center noti-bell" style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: '#444', cursor: 'pointer' }}>
                    <button className='button-bar' onClick={handleClick} style={{ "color": "#ffffff" }}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                {!isAuthenticated && <LogginButton />}
                {/* {isAuthenticated &&
                    <Link to="/notifications" className="text-decoration-none">
                        <div className="d-flex flex-row gap-3 align-items-center justify-content-center noti-bell" style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: '#444', cursor: 'pointer' }}>
                            <i className="fa-regular fa-bell " style={{ "color": "#ffffff" }}></i>
                        </div>
                    </Link>
                } */}
                {user && <UserWidget />}
                {user &&
                    <UserSpinner />
                }

            </div>
        </div>
    </>)
}