import React from "react";
import "../../styles/global_searchbar.sass"

export const GlobalSearchBar = ({style, handleClick}) => {

    return (<>
        <div className="navbar-margin globalsearch" style={style}>
            <i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
            <input className='search-input' type="text" name="search" id="search" placeholder="Search" />
            <button onClick={handleClick}>Cerrar Barra</button>
        </div>
    </>)
}
