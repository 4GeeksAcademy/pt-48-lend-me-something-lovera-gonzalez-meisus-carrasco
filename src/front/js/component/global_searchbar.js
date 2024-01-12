import React from "react";
import "../../styles/global_searchbar.sass"

export const GlobalSearchBar = ({ style, handleClick }) => {

    return (<>
        <div className="navbar-margin globalsearch" style={style}>
            <div className="d-flex flex-row justify-content-center align-items-center" style={{ marginBottom: "15em" }}>

                <i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
                <input className='search-input' type="text" name="search" id="search" placeholder="Search" />
                <button className=" button-close-search" onClick={handleClick}><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
    </>)
}
