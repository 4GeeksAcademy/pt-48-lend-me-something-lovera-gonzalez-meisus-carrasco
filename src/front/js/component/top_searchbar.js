import React, { useContext, useState } from 'react'
import '../../styles/top_searchbar.sass'
import '../../styles/shared.sass'
import { Context } from '../store/appContext.js'
import { GlobalSearchBar } from "../component/global_searchbar.js"
import { LogginButton } from '../component/Auth0/loggin_button.js'

import { useAuth0 } from "@auth0/auth0-react";
import { UserWidget } from './user_widget.js'
import { Link } from 'react-router-dom'

export const TopBar = () => {



    const { store, actions } = useContext(Context)
    const [searchState, setSearchState] = useState(false)
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();

    const handleClick = () => {

        actions.switchSearchState(); 
        // console.log(searchState)
    }

    return (<>
        <GlobalSearchBar style={store.searchState ? { display: "flex" } : { display: "none" }} handleClick={handleClick} />

        <div className={isAuthenticated ? "dashboard-bar p-3 navbar-margin" : "dashboard-bar p-3"}>
            <h3>{store.title}</h3>
            <div className="d-flex flex-row gap-3 align-items-center">
                {/*<i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
                <input className='search-input' type="text" name="search" id="search" placeholder="Search" />*/}
                <div className="d-flex flex-row gap-3 align-items-center justify-content-center noti-bell" style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: '#444', cursor: 'pointer' }}>
                    <button className='button-bar' onClick={handleClick} style={{ "color": "#ffffff" }}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                {!isAuthenticated && <LogginButton />}
                {isAuthenticated &&
                    <Link to="/notifications" className="text-decoration-none">
                        <div className="d-flex flex-row gap-3 align-items-center justify-content-center noti-bell" style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: '#444', cursor: 'pointer' }}>
                            <i className="fa-regular fa-bell " style={{ "color": "#ffffff" }}></i>
                        </div>
                    </Link>
                }
                {user && <UserWidget />}
                {user &&
				<Link to="login">
					<img className="navbar-profilepicture" src={user.picture} />
				</Link>
			}
                
            </div>
        </div>
    </>)
}