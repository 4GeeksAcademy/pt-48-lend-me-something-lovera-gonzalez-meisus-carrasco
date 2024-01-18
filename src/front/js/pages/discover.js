import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/discover.sass';
import { useSpring, animated } from '@react-spring/web';
import { GreenContainer } from "../component/color_containers/green_container";
import { TopBarTitle } from "../component/topBarTitle";

export const Discover = () => {

    const [results, setResults] = useState([])
    const [criteria, setCriteria] = useState('')

    const springs = useSpring({
        from: { opacity: 0, y: -5 },
        to: [{ opacity: 1, y: 0 }],
        config: {
            mass: 5,
            friction: 35,
            tension: 120,
        },
    })

    const getPrevious = () => {

    }

    const getNext = () => {

    }
    return (<>
        <TopBarTitle topTitle='Discover ' />
        <animated.div style={{ ...springs }} className="navbar-margin d-flex flex-column justify-content-center align-items-center">
            <GreenContainer style={{ width: '80%' }}>
                <h4>Search new horizons:</h4>
                <div className="discover-header--containers">
                    <div className="discover-input--container">
                        <input type="text" placeholder="Search Terms..." value={criteria} onChange={(e) => setCriteria(e.target.value)} />
                        <select name="Exchange" id="exchange">
                            <option value="" selected>All Stock Exchanges</option>
                            <option value="XASE">American Stock Exchange (XASE)</option>
                            <option value="XASX">Australia Stock Exchange (XASX)</option>
                            <option value="XLIM">Bolsa de Valores de Lima (XLIM)</option>
                            <option value="BVMF">B3 - Brasil Bolsa Balcão S.A (BVMF)</option>
                            <option value="XBAH">Bahrein Bourse (XBAH)</option>
                            <option value="XBEL">Belgrade Stock Exchange (XBEL)</option>
                            <option value="XBOG">Bolsa de Valores de Colombia (XBOG)</option>
                            <option value="BMEX">Bolsas y Mercados Españoles (BMEX)</option>
                            <option value="XBOM">Bombay Stock Exchange (XBOM)</option>
                            <option value="XMIL">Borsa Italiana (XMIL)</option>
                            <option value="XBUE">Buenos Aires Stock Exchange (XBUE)</option>
                            <option value="XSTU">Börse Stuttgart (XSTU)</option>
                            <option value="XCNQ">Canadian Securities Exchange (XCNQ)</option>
                            <option value="XCSE">Copenhagen Stock Exchange (XCSE)</option>
                            <option value="XFRA">Deutsche Börse (XFRA)</option>
                            <option value="XETRA">Deutsche Börse Xetra (XETRA)</option>
                            <option value="XDFM">Dubai Financial Market (XDFM)</option>
                            <option value="XCAI">Eqyptian Exchange (XCAI)</option>
                            <option value="XAMS">Euronext Amsterdam (XAMS)</option>
                            <option value="XBRU">Euronext Brussels (XBRU)</option>
                            <option value="XLIS">Euronext Lisbon (XLIS)</option>
                            <option value="XPAR">Euronext Paris (XPAR)</option>
                            <option value="XFKA">Fukuoka Stock Exchange (XFKA)</option>
                            <option value="XHEL">Helsinki Stock Exchange (XHEL)</option>
                            <option value="XSTC">Ho Chi Minh Stock Exchange (XSTC)</option>
                            <option value="XHKG">Hong Kong Stock Exchange (XHKG)</option>
                            <option value="IEXG">Investors Exchange (IEXG)</option>
                            <option value="XIST">Istanbul Stock Exchange (XIST)</option>
                            <option value="XIDX">Jakarta Stock Exchange (XIDX)</option>
                            <option value="XJSE">Johannesburg Stock Exchange (XJSE)</option>
                            <option value="XKRX">Korean Stock Exchange (XKRX)</option>
                            <option value="XLON">London Stock Exchange (XLON)</option>
                            <option value="XKLS">Malaysia Stock Exchange (XKLS)</option>
                            <option value="XMEX">Mexican Stock Exchange (XMEX)</option>
                            <option value="MISX">Moscow Stock Exchange (MISX)</option>
                            <option value="XNAS">NASDAQ Stock Exchange (XNAS)</option>
                            <option value="ARCX">NYSE ARCA (ARCX)</option>
                            <option value="XNGO">Nagoya Stock Exchange (XNGO)</option>
                            <option value="XICE">Nasdaq Island (XICE)</option>
                            <option value="XRIS">Nasdaq Riga (XRIS)</option>
                            <option value="XLIT">Nasdaq Vilnius (XLIT)</option>
                            <option value="XNSE">National Stock Exchange India (XNSE)</option>
                            <option value="XNYS">New York Stock Exchange (XNYS)</option>
                            <option value="XNZE">New Zealand Stock Exchange (XNZE)</option>
                            <option value="XNSA">Nigerian Stock Exchange (XNSA)</option>
                            <option value="OOTC">OTC Bulletin Board (OOTC)</option>
                            <option value="PSGM">OTC Grey Market (PSGM)</option>
                            <option value="OTCM">OTC Markets (OTCM)</option>
                            <option value="PINC">OTC PINK current (PINC)</option>
                            <option value="OTCB">OTCQB Marketplace (OTCB)</option>
                            <option value="OTCQ">OTCQX Marketplace (OTCQ)</option>
                            <option value="XOSL">Oslo Stock Exchange (XOSL)</option>
                            <option value="DSMD">Qatar Stock Exchange (DSMD)</option>
                            <option value="XSWX">SIX Swiss Exchange (XSWX)</option>
                            <option value="XSGO">Santiago Stock Exchange (XSGO)</option>
                            <option value="XSAP">Sapporo Stock Exchange (XSAP)</option>
                            <option value="XSAU">Saudi Stock Exchange (XSAU)</option>
                            <option value="XSHG">Shanghai Stock Exchange (XSHG)</option>
                            <option value="XSHE">Shenzhen Stock Exchange (XSHE)</option>
                            <option value="XSES">Singapore Stock Exchange (XSES)</option>
                            <option value="XBKK">Stock Exchange of Thailand (XBKK)</option>
                            <option value="XSTO">Stockholm Stock Exchange (XSTO)</option>
                            <option value="XTSX">TSX Venture Exchange (XTSX)</option>
                            <option value="XTAI">Taiwan Stock Exchange (XTAI)</option>
                            <option value="XTAL">Tallinn Stock Exchange (XTAL)</option>
                            <option value="XTAE">Tel Aviv Stock Exchange (XTAE)</option>
                            <option value="XTKS">Tokyo Stock Exchange (XTKS)</option>
                            <option value="XTSE">Toronto Stock Exchange (XTSE)</option>
                            <option value="NMFQS">US Mutual Funds (NMFQS)</option>
                            <option value="XWAR">Warsaw Stock Exchange (XWAR)</option>
                        </select>
                        <button className="green--button">Search</button>
                    </div>
                    <h3>More than 280.000 stocks to track!</h3>
                </div>
                <hr />
                <hr />
                <div className="discover-footer--container">
                    <button className="green--button discover-footer-previous--button" onClick={getPrevious}>Previous</button>
                    <button className="green--button discover-footer-next--button" onClick={getNext}>Next</button>
                </div>
            </GreenContainer>
        </animated.div>
    </>)
}

