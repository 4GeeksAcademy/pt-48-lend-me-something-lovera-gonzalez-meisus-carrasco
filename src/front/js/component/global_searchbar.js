import React, { useEffect, useState} from "react";
import "../../styles/global_searchbar.sass"
import { useSpring, animated } from '@react-spring/web'
import { element } from "prop-types";
import { useNavigate } from "react-router-dom";

const listas = [
    {
        "title": "Home",
        "link": "https://humble-meme-wr7gjjg5p9vgc5pg5-3000.app.github.dev/",
    },
    {
        "title": "Dashboard",
        "link": "https://humble-meme-wr7gjjg5p9vgc5pg5-3000.app.github.dev/dashboard",
    },
    {
        "title": "About Us",
        "link": "https://humble-meme-wr7gjjg5p9vgc5pg5-3000.app.github.dev/aboutus",
    }
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
    const [selectedItem, setSelectedItem] = useState(-1)

    const handleChange = e => {
        setSearch(e.target.value)
    }
    const handleClose = () => {
        setSearch("");
        setSearchData([]);
        setSelectedItem(-1);
    };
    const handleKeyDown = (e) => {
        console.log(e.key)
        if (selectedItem < searchData.length) {

            if (e.key === "ArrowUp" && selectedItem > 0) {
                setSelectedItem(prev => prev - 1)
            }
            else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
                setSelectedItem(prev => prev + 1)
            }
            else if (e.key === "Enter" && selectedItem >= 0) {
                window.open(searchData[selectedItem].link)
            }
        }
        else {
            setSelectedItem(-1)
        }
    };
    // const [query, setQuery] = useState('')
    // const [autoCompletado, setAutoCompletado] = useState('')
    // const [listaFiltrada, setListaFiltrada] = useState([])
    // const inputRef = useRef()
    // const navigate = useNavigate()

    // const handleChange = (e) => {
    //     if (e.keyCode === 8) {
    //         setQuery(e.target.value);
    //     }
    //     else {
    //         setQuery(e.target.value);
    //         setListaFiltrada(listas.filter((lista) => lista.toLowerCase().startsWith(e.target.value.toLowerCase())))
    //         const [firstelement] = listas.filter((lista) => lista.toLowerCase().startsWith(e.target.value.toLowerCase()))

    //         setAutoCompletado(firstelement);
    //     }

    // }

    // const handleButtonClick = (e) => {
    //     // setQuery(e.target.innerHTML);
    //     navigate.push("/dashboard");

    // }

    useEffect(() => {
        if (search !== "") {
            // fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
            //     .then(res => res.json())
            //     .then((data) => setSearchData(data))

            const newFilterData= listas.filter(lista => {
                return lista.title.toLowerCase().includes(search.toLowerCase())
            })
            setSearchData(newFilterData);
        } else {
            setSearchData([])
        }
    }, [search])

    
    return (<>
        <animated.div className="navbar-margin globalsearch flex-column justify-content-start" style={{ ...style, ...springs }}>

            <div className="d-flex flex-row justify-content-center align-items-center" style={{ marginTop: "10em" }}>

                <i className="fa-solid fa-magnifying-glass magnifying" style={{ "color": "#ffffff" }}></i>
                <input className='search-input' autoComplete="off" type="text" name="search" id="search" placeholder="Search" onChange={handleChange} value={search} onKeyDown={handleKeyDown}/>
                <button className=" button-close-search" onClick={handleClick}><i className="fa-solid fa-xmark"></i></button>

            </div>
            <div className="search-result">
            {searchData.map((listas, index) => {
                        return (
                        <a 
                            href={listas.link} 
                            key={index}
                            target='_blank' 
                            className={
                                selectedItem === index
                                    ? "search-suggestion-line active"
                                    : "search-suggestion-line"
                                
                            }>
                            {listas.title}
                        </a>
                        );
                    })
                }
                {/* {listaFiltrada.length > 0 && <ul style={query != "" ? { display: "unset" } : { display: "none" }} >
                    {listaFiltrada.map((element, index) => (
                        <li key={index}><button onClick={(e) => handleButtonClick(e)}>{element}</button></li>
                    ))}
                </ul>} */}
            </div>

        </animated.div>
    </>)
}
