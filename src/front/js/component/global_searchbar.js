import React, { useState } from "react";
import "../../styles/global_searchbar.sass"
import { useSpring, animated } from '@react-spring/web'

const listas = ["Home", "Dashboard", "Profile", "About Us"]

export const GlobalSearchBar = ({ style, handleClick }) => {
    const springs = useSpring({
        from: 
            { x: -10, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: {
            duration: 750
        },
    })
    const [query, setQuery]= useState('')
    return (<>
        <animated.div className="navbar-margin globalsearch" style={{...style, ...springs}}> 

            <div className="d-flex flex-row justify-content-center align-items-center" style={{ marginBottom: "15em" }}>

                <i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
                <input className='search-input' type="text" name="search" id="search" placeholder="Search" onChange={(e)=> setQuery(e.target.value)}/>
                <button className=" button-close-search" onClick={handleClick}><i class="fa-solid fa-xmark"></i></button>
                <ul>
                    {listas.filter((lista) => lista.toLocaleLowerCase().includes(query)).map((lista)=> (
                    <li>{lista}</li>   
                    ))}
                </ul>
            </div>
           
        </animated.div>
    </>)
}
