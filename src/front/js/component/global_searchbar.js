import React, { useEffect, useState, useRef } from "react";
import "../../styles/global_searchbar.sass"
import { useSpring, animated } from '@react-spring/web'
import { element } from "prop-types";

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
    const [autoCompletado, setAutoCompletado] = useState('')
    const [listaFiltrada, setListaFiltrada] = useState([])
    const inputRef = useRef()

    const handleChange = (e) => {
        if (e.keyCode === 8) {
            setQuery(e.target.value);
        }
        else {
            setQuery(e.target.value);
            setListaFiltrada(listas.filter((lista) => lista.toLowerCase().startsWith(e.target.value.toLowerCase())))
            const [firstelement] = listas.filter((lista) => lista.toLowerCase().startsWith(e.target.value.toLowerCase()))

            setAutoCompletado(firstelement);
        }

    }

    const handleButtonClick = (e) => {
        setQuery(e.target.innerHTML);
    }

    // useEffect(() => {

    //}, [inputRef]) 
    return (<>
        <animated.div className="navbar-margin globalsearch flex-column justify-content-start" style={{ ...style, ...springs }}>

            <div className="d-flex flex-row justify-content-center align-items-center" style={{ marginTop: "10em" }}>

                <i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
                <input className='search-input' autoComplete="off" type="text" name="search" id="search" placeholder="Search" onChange={(e) => handleChange(e)} value={query} />
                <button className=" button-close-search" onClick={handleClick}><i className="fa-solid fa-xmark"></i></button>

            </div>
            <div className=" ">

                {listaFiltrada.length > 0 && <ul style={query != "" ? { display: "unset" } : { display: "none" }} >
                    {listaFiltrada.map((element, index) => (
                        <li key={index}><button onClick={(e) => handleButtonClick(e)}>{element}</button></li>
                    ))}
                </ul>}
            </div>

        </animated.div>
    </>)
}
