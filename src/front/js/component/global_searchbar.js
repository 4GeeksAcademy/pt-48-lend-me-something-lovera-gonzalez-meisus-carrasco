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
    const [query, setQuery] = useState('')
    const [] = useState()
    return (<>
        <animated.div className="navbar-margin globalsearch d-flex flex-column justify-content-start" style={{ ...style, ...springs }}>

            <div className="d-flex flex-row justify-content-center align-items-center" style={{ marginTop: "10em" }}>

                <i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
                <input className='search-input' autoComplete="off" type="text" name="search" id="search" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                <button className=" button-close-search" onClick={handleClick}><i class="fa-solid fa-xmark"></i></button>

            </div>
            <div className=" ">

                <ul style={query != "" ? {display:"unset"} : {display:"none"}} >
                    {listas.filter((lista) => lista.toLocaleLowerCase().includes(query)).map((lista) => (
                        <li>{lista}</li>
                    ))}
                </ul>
            </div>

        </animated.div>
    </>)
}
