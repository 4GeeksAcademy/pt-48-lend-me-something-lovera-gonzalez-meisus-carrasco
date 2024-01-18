import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../styles/discover.sass';
import { useSpring, animated } from '@react-spring/web';
import { GreenContainer } from "../component/color_containers/green_container";
import { TopBarTitle } from "../component/topBarTitle";
import { get_search_results } from "../store/API";
import { Spinner } from '../component/spinner'

export const Discover = () => {

    const [results, setResults] = useState([]);
    const [criteria, setCriteria] = useState('');
    const [loading, setLoading] = useState(null);
    const [exchange, setExchange] = useState('');
    const [offset, setOffset] = useState(0);
    const [pagination, setPagination] = useState('');
    const [page_numbers, setPage_numbers] = useState('');
    const [lastPage, setLastPage] = useState('');

    const springs = useSpring({
        from: { opacity: 0, y: -5 },
        to: [{ opacity: 1, y: 0 }],
        config: {
            mass: 5,
            friction: 35,
            tension: 120,
        },
    });

    const search = async (offset = 0) => {
        setLoading(true)
        const data = await get_search_results(criteria, exchange, offset);
        const data_with_links = data.data.map(element => ({ ...element, link: `/single/${element.symbol}` }));
        console.log(offset);
        if (offset === 0) setOffset(prev => prev + 100);
        setResults(data_with_links);
        setPagination(data.pagination);
        setLoading(false);
        console.log(pagination)
    }

    const getPrevious = () => {
        setLoading(true);
        setTimeout(() => {
            search(pagination.offset - 100);
        }, 500)
    }
    const getNext = () => {
        setLoading(true)
        setTimeout(() => {
            search(pagination.offset + 100);
        }, 500)
    }
    const resetValues = () => {
        setLastPage('');
        setPage_numbers('');
        setOffset(0)
    };

    const clickedPage = (e) => {
        const new_offset = (+e.target.innerHTML - 1) * 100
        setOffset(new_offset)
        search(new_offset)
    }

    useEffect(() => {
        search();
    }, []);


    useEffect(() => {
        if (results.length > 1) {
            const raw_pages = new Array(Math.ceil(pagination.total / 100)).fill(1).map((e, i) => e * i + 1);
            if (Math.floor(pagination.offset / 100) >= (raw_pages.length - 3)) {
                const raw_lastPage = [raw_pages.splice(raw_pages.length - 1, raw_pages.length)];
                const spliced_pages = raw_pages.splice(raw_pages.length - 4, raw_pages.length - 3);
                setLastPage(raw_lastPage);
                setPage_numbers(spliced_pages);
            }
            if (!(Math.floor(pagination.offset / 100) >= (raw_pages.length - 3))) {
                const spliced_pages = raw_pages.splice(
                    (Math.floor(pagination.offset / 100) <= 1)
                    ? 0
                    : Math.floor(pagination.offset / 100)-2
                    , 5);
                const raw_lastPage = [raw_pages[raw_pages.length - 1]];
                setLastPage(raw_lastPage);
                setPage_numbers(spliced_pages);
            }
        }
    }, [pagination])


    return (<>
        <TopBarTitle topTitle='Discover ' />
        <animated.div style={{ ...springs }} className="navbar-margin d-flex flex-column justify-content-center align-items-center">
            <GreenContainer style={{ width: '80%', position: 'relative' }}>
                <h4>Search new horizons:</h4>
                <div className="discover-header--containers">
                    <div className="discover-input--container">
                        <input className="discover-input" type="text" placeholder="Search Terms..." value={criteria} onChange={(e) => { setCriteria(e.target.value), resetValues }} />
                        <select className="discover-select" name="Exchange" id="exchange" defaultValue={""} onChange={(e) => { setExchange(e.target.value); resetValues }}>
                            <option value="" >All Stock Exchanges</option>
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
                        <button className="green--button" onClick={search}>Search</button>
                    </div>
                    <h3>More than 280.000 stocks to track!</h3>
                </div>
                <hr />
                <div className="discover-results--container">
                    {loading && <Spinner />}
                    {loading != null && loading != true &&
                        <>
                            <div className="discover-results--headers">
                                <div className="discovery-result-p-1">Symbol</div>
                                <div className="discovery-result-p-2">Name</div>
                                <div className="discovery-result-p-3">Exchange</div>
                                <div className="discovery-result-p-4">MIC</div>
                                <div className="discovery-result-p-5">Country</div>
                            </div>
                            <div className="discover-results-list">
                                {results.map((element, index) => (
                                    <Link
                                        to={element.link}
                                        className="discover-result--entry"
                                        // style={{textDecoration: 'none'}}
                                        key={index}>
                                        <div className="discovery-result-p-1">{element.symbol}</div>
                                        <div className="discovery-result-p-2">{element.name}</div>
                                        <div className="discovery-result-p-3">{element.stock_exchange.name}</div>
                                        <div className="discovery-result-p-4">{element.stock_exchange.mic}</div>
                                        <div className="discovery-result-p-5">{element.stock_exchange.country}</div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    }
                </div>
                <hr />
                <div className="discover-footer--container">
                    <button className="green--button discover-footer-previous--button" onClick={getPrevious}>Previous</button>
                    <button className="green--button discover-footer-next--button" onClick={getNext}>Next</button>
                </div>
                {results.length >= 1 &&
                    <div className="discover--pages">

                        {page_numbers && page_numbers.map((element, index) => (

                            <div
                                key={index}
                                className="discover--page"
                                onClick={(Math.floor(pagination.offset / 100) + 1) === +element ? undefined : (e) => clickedPage(e)}
                                style={Math.floor(pagination.offset / 100) + 1 === +element ? { backgroundColor: 'gray' } : {}}>
                                {element}
                            </div>

                        ))} <span>...</span>
                        {page_numbers && lastPage.map((element, index) => (

                            <div
                                key={index}
                                className="discover--page"
                                onClick={(Math.floor(pagination.offset / 100) + 1) === +element ? undefined : (e) => clickedPage(e)}
                                style={Math.floor(pagination.offset / 100) + 1 === +element ? { backgroundColor: 'gray' } : {}}>
                                {element}
                            </div>
                        ))}
                    </div>}
                {results.length >= 1 && <div className="discover--pagination">Showing {pagination.count} of {pagination.total}</div>}
            </GreenContainer>
        </animated.div>
    </>)
}
// 315/100 = 3.15 ^ 4 
// new Array(Math.top(315/100)).fill(1)

