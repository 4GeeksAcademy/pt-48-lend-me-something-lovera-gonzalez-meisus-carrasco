import React, { useContext, useEffect, useState } from "react";
import { Context } from '../store/appContext.js'
import { BlueContainer } from "../component/color_containers/blue_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { PinkContainer } from "../component/color_containers/pink_container";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import "../../styles/portfolio.sass"
import { useSpring, animated } from '@react-spring/web'
import { Spinner } from "../component/spinner"
import { TopBarTitle } from "../component/topBarTitle.js";
import { Link } from "react-router-dom";


export const Portfolio = () => {

    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [stockFilter, setStockFilter] = useState('')
    const [cryptoFilter, setCryptoFilter] = useState('')
    const [forexFilter, setForexFilter] = useState('')
    const [commoditiesFilter, setCommoditiesFilter] = useState('')

    const springs = useSpring({
        from: { opacity: 0 },
        to: [{ opacity: 1 }],
        config: {
            duration: 1500
        },
    })

    const deleteFromPortfolio = (e, event) => {
        actions.removeFromUserPortfolio(e)

    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500)
        console.log(store.userPortfolio)

    }, []);

    if (loading) return (<>
        <Spinner />
    </>)
    return (<>
        <TopBarTitle topTitle="Portfolio" />
        <animated.div
            style={{
                ...springs,
            }}
            className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 navbar-margin mb-5"
        >
            <BlueContainer style={{ flexBasis: '35%', height: '35vh', display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}>
                <i className="fa-solid fa-money-bill-trend-up portfolio--icon"></i>
                <div className="portfolio-header--container">
                    <h4>Stocks</h4>
                    <div>
                        <input className="portfolio-input-blue" type="text" placeholder="Filter..." name="" id="" value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} />
                    </div>
                </div>
                <div className="portfolio-table--container">
                    <div className="portfolio-table-header">
                        <div className="portfolio-table-header-name">Name</div>
                        <div className="portfolio-table-header-symbol">Symbol</div>
                    </div>
                    <div className="portfolio-hr"></div>
                    <div className="portfolio-table-list portfolio-table-list-blue">
                        {store.userPortfolio != [] && store.userPortfolio?.filter(element => (element.item_type === 'Stock' && (element.item_symbol.toLowerCase().includes(stockFilter.toLowerCase()) || element.item_name.toLowerCase().includes(stockFilter.toLowerCase())))).map((e, i) => (<>
                            <div className="portfolio-table-list-item--container">
                                <Link to={`/single/${e.item_symbol}`} >
                                    <div className="portfolio-table-list-item" key={i}>
                                        <div className="portfolio-table-list-item-name">{e.item_name}</div>
                                        <div className="portfolio-table-list-item-symbol">{e.item_symbol}</div>
                                    </div>
                                </Link>
                                <i onClick={(event) => deleteFromPortfolio(e, event)} className="fa-solid fa-trash" style={{ color: 'white' }}></i>
                            </div>
                        </>))
                        }
                    </div>
                </div>
            </BlueContainer>
            <GreenContainer style={{ flexBasis: '35%', height: '35vh', display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}>
                <i className="fa-brands fa-bitcoin portfolio--icon"></i>
                <div className="portfolio-header--container">
                    <h4>Crypto</h4>
                    <div>
                        <input className="portfolio-input-green" type="text" placeholder="Filter..." name="" id="" value={cryptoFilter} onChange={(e) => setCryptoFilter(e.target.value)} />
                    </div>
                </div>
                <div className="portfolio-table--container">
                    <div className="portfolio-table-header">
                        <div className="portfolio-table-header-name">Name</div>
                        <div className="portfolio-table-header-symbol">Symbol</div>
                    </div>
                    <div className="portfolio-hr"></div>
                    <div className="portfolio-table-list portfolio-table-list-green">
                        {store.userPortfolio != [] && store.userPortfolio?.filter(element => (element.item_type === 'Crypto' && element.item_symbol.includes(cryptoFilter))).map((e, i) => (<>
                            <div className="portfolio-table-list-item--container">
                                <Link to={`/single/${e.item_symbol}`} >
                                    <div className="portfolio-table-list-item" key={i}>
                                        <div className="portfolio-table-list-item-name">{e.item_name}</div>
                                        <div className="portfolio-table-list-item-symbol">{e.item_symbol}</div>
                                    </div>
                                </Link>
                                <i onClick={(event) => deleteFromPortfolio(e, event)} className="fa-solid fa-trash" style={{ color: 'white' }}></i>
                            </div>
                        </>))
                        }
                    </div>
                </div>
            </GreenContainer>
            <YellowContainer style={{ flexBasis: '35%', height: '35vh', display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}>
                <i className="fa-solid fa-money-bill-1-wave portfolio--icon"></i>
                <div className="portfolio-header--container">
                    <h4>Forex</h4>
                    <div>
                        <input className="portfolio-input-yellow" type="text" placeholder="Filter..." name="" id="" value={forexFilter} onChange={(e) => setForexFilter(e.target.value)} />
                    </div>
                </div>
                <div className="portfolio-table--container">
                    <div className="portfolio-table-header">
                        <div className="portfolio-table-header-name">Name</div>
                        <div className="portfolio-table-header-symbol">Symbol</div>
                    </div>
                    <div className="portfolio-hr"></div>
                    <div className="portfolio-table-list portfolio-table-list-yellow">
                        {store.userPortfolio != [] && store.userPortfolio?.filter(element => (element.item_type === 'Forex' && element.item_symbol.includes(forexFilter))).map((e, i) => (<>
                            <div className="portfolio-table-list-item--container">
                                <Link to={`/single/${e.item_symbol}`} >
                                    <div className="portfolio-table-list-item" key={i}>
                                        <div className="portfolio-table-list-item-name">{e.item_name}</div>
                                        <div className="portfolio-table-list-item-symbol">{e.item_symbol}</div>
                                    </div>
                                </Link>
                                <i onClick={(event) => deleteFromPortfolio(e, event)} className="fa-solid fa-trash" style={{ color: 'white' }}></i>
                            </div>
                        </>))
                        }
                    </div>
                </div>
            </YellowContainer>
            <PurpleContainer style={{ flexBasis: '35%', height: '35vh', display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}>
                <i className="fa-solid fa-oil-well portfolio--icon"></i>
                <div className="portfolio-header--container">
                    <h4>Commodities</h4>
                    <div>
                        <input className="portfolio-input-purple" type="text" placeholder="Filter..." name="" id="" value={commoditiesFilter} onChange={(e) => setCommoditiesFilter(e.target.value)} />
                    </div>
                </div>
                <div className="portfolio-table--container">
                    <div className="portfolio-table-header">
                        <div className="portfolio-table-header-name">Name</div>
                        <div className="portfolio-table-header-symbol">Symbol</div>
                    </div>
                    <div className="portfolio-hr"></div>
                    <div className="portfolio-table-list portfolio-table-list-purple">
                        {store.userPortfolio != [] && store.userPortfolio?.filter(element => (element.item_type === 'Commodity' && element.item_symbol.includes(commoditiesFilter))).map((e, i) => (<>
                            <div className="portfolio-table-list-item--container">
                                <Link to={`/single/${e.item_symbol}`} >
                                    <div className="portfolio-table-list-item" key={i}>
                                        <div className="portfolio-table-list-item-name">{e.item_name}</div>
                                        <div className="portfolio-table-list-item-symbol">{e.item_symbol}</div>
                                    </div>
                                </Link>
                                <i onClick={(event) => deleteFromPortfolio(e, event)} className="fa-solid fa-trash" style={{ color: 'white' }}></i>
                            </div>
                        </>))
                        }
                    </div>
                </div>
            </PurpleContainer>
        </animated.div>



    </>)
}