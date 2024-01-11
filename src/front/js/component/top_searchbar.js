import React, { useContext, useState } from 'react'
import '../../styles/top_searchbar.sass'
import '../../styles/shared.sass'
import { Context } from '../store/appContext.js'
import { GlobalSearchBar } from "../component/global_searchbar.js"


export const TopBar = () => {

    const { store } = useContext(Context)
    const [searchState, setSearchState] = useState(false)

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
                <button onClick={handleClick}>ver barra</button>
                <div className="d-flex flex-row gap-3 align-items-center justify-content-center" style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: '#444', cursor: 'pointer' }}>
                    <i className="fa-regular fa-bell" style={{ "color": "#ffffff" }}></i>
                </div>
                <img src="https://picsum.photos/id/64/200/200" alt="profile picture" style={{ height: '3em', width: '3em', objectFit: 'contain', borderRadius: '50%', cursor: 'pointer' }} />
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h5 className="m-0">Sarah Paul</h5>
                    <h6 className="m-0 text-secondary">Account Details</h6>
                </div>
            </div>
        </div>
    </>)
}