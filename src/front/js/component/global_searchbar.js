import React, { useEffect, useState, useRef } from "react";
import "../../styles/global_searchbar.sass"
import { useSpring, animated } from '@react-spring/web'
import { element } from "prop-types";
import { Link, redirect, useNavigate } from "react-router-dom";
import { get_search_results } from '../store/API'

const listas = [
    {
        "title": "Home",
        "link": "/",
    },
    {
        "title": "Dashboard",
        "link": "/dashboard",
    },
    {
        "title": "About Us",
        "link": "/aboutus",
    },
    {
        "title": "Profile",
        "link": "/login",
    },
    {
        "title": "Subscription",
        "link": "/subscription",
    },
    {
        "title": "Notifications",
        "link": "/notifications",
    },
    {
        "title": "Discover",
        "link": "/discover",
    },
]
export const GlobalSearchBar = ({ style, handleClick }) => {
    const springs = useSpring({
        from:
            { x: -10, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: {
            duration: 750
        },
    })
    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState([])
    const [selectedItem, setSelectedItem] = useState(-1);
    const navigate = useNavigate();
    const inputElement = useRef(null);
    const [valorStock, setValorStock] = useState('');
    const [result, setResult] = useState([...listas]);


    const getStockData = async (string) => {
        // console.log(string)
        const data = await get_search_results(string, '', 0);
        const data_with_links = data.data.map(element =>
            element.symbol ? ({ ...element, link: `/single/${element.symbol}` }) : { ...element, link: `/single/non-traceable` }
        )
        const newFilterData = listas.filter(element => {
            return element.title.toLowerCase().includes(string.toLowerCase())
        })
        setSearchData([...newFilterData, ...data_with_links])
    };

    const handleChange = async (e) => {
        setSearch(e.target.value)
        await getStockData(e.target.value)
        // console.log(search)
    }
    const handleClose = () => {
        setSearch("");
        setSearchData([]);
        setSelectedItem(-1);
    };
    const handleKeyDown = (e) => {
        // console.log(e.key)
        if (selectedItem < searchData.length) {

            if (e.key === "ArrowUp" && selectedItem > 0) {
                setSelectedItem(prev => prev - 1)
            }
            if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
                setSelectedItem(prev => prev + 1)
            }
            if (e.key === "Enter" && selectedItem >= 0) {
                cerrarBarra();
                navigate(`${searchData[selectedItem].link}`)
            }
            if (e.key === "Enter" && selectedItem == -1 && searchData[0]) {
                cerrarBarra();
                navigate(`${searchData[0].link}`)
            }
        }
        else {
            setSelectedItem(-1)
        }
    };

    const cerrarBarra = () => {
        setSearch('');
        setSearchData([])
        handleClick();
    }



    return (<>
        <animated.div className="navbar-margin-top-searchbar globalsearch flex-column justify-content-start" style={{ ...style, ...springs }}>
            <span style={{ marginTop: '1em', color: '#888' }}>You can launch this searchbar with Ctrl+Space shortcut!</span>
            <div className="d-flex flex-row justify-content-center align-items-center" style={{ marginTop: "10em" }}>

                <i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
                <input ref={inputElement => { if (inputElement) { inputElement.focus(); } }}
                    className='search-input'
                    autoComplete="off"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                    onChange={handleChange}
                    value={search}
                    onKeyDown={handleKeyDown} />
                <button className=" button-close-search" onClick={cerrarBarra}><i className="fa-solid fa-xmark"></i></button>

            </div>
            <div className="search-result">
                {searchData.map((element, index) => {
                    return (
                        <Link to={`${element.link}`}
                            key={index}
                            onClick={cerrarBarra}
                            className={`${selectedItem === index ? "search-suggestion-line active" : "search-suggestion-line"} ${element.title ? "app-link" : ""}`}
                        >
                    {
                        element.title ? element.title : (
                            <div className="d-flex justify-content-between" style={{ width: '20em' }}>
                                <span>
                                    {element.name}
                                </span>
                                <span>
                                    {element.symbol}
                                </span>
                            </div>
                        )
                    }
                        </Link>
            );
                })
                }
        </div>
    </animated.div >
    </>)
}
