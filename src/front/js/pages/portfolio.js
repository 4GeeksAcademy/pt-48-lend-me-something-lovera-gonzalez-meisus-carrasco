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


export const Portfolio = () => {

    const springs = useSpring({
        from: { opacity: 0 },
        to: [{ opacity: 1 }],
        config: {
            duration: 1500
        },
    })
    return (<>
        <TopBarTitle topTitle="Portfolio" />
        <animated.div
            style={{
                ...springs,
            }}
            className="d-flex flex-column justify-content-center align-items-center gap-5 navbar-margin"
        >
            <BlueContainer>
                <div className="portfolio-header--container">
                    <h4>Stocks</h4>
                    <div>
                        <input className="portfolio-input-blue" type="text" placeholder="Filter..." name="" id="" />
                    </div>
                    <div className="portfolio-hr"></div>
                </div>
                <div className="portfolio-table--container">
                    <div className="portfolio-table-header">
                        <div className="portfolio-table-header-title">Name</div>
                        <div className="portfolio-table-header-title">Symbol</div>
                    </div>
                    <div className="portfolio-table-list">
                        <div className="portfolio-table-list-item">
                            <div className="portfolio-table-list-item-name">aplle inc</div>
                            <div className="portfolio-table-list-item-symbol">APPL</div>
                        </div>
                    </div>
                </div>
            </BlueContainer>
            <GreenContainer>
            <div className="portfolio-header--container">
                    <h4>Crypto</h4>
                    <div>
                        <input className="portfolio-input-green" type="text" name="" id="" />
                    </div>
                </div>
                <div className="portfolio-table--container">
                    <div className="portfolio-table-header">
                        <div className="portfolio-table-header-title">Name</div>
                        <div className="portfolio-table-header-title">Symbol</div>
                    </div>
                    <div className="portfolio-table-list">
                        <div className="portfolio-table-list-item">
                            <div className="portfolio-table-list-item-name">aplle inc</div>
                            <div className="portfolio-table-list-item-symbol">APPL</div>
                        </div>
                    </div>
                </div>

            </GreenContainer>
            <YellowContainer>
            <div className="portfolio-header--container">
                    <h4>Forex</h4>
                    <div>
                        <input className="portfolio-input-yellow" type="text" name="" id="" />
                    </div>
                </div>
                <div className="portfolio-table--container">
                    <div className="portfolio-table-header">
                        <div className="portfolio-table-header-title">Name</div>
                        <div className="portfolio-table-header-title">Symbol</div>
                    </div>
                    <div className="portfolio-table-list">
                        <div className="portfolio-table-list-item">
                            <div className="portfolio-table-list-item-name">aplle inc</div>
                            <div className="portfolio-table-list-item-symbol">APPL</div>
                        </div>
                    </div>
                </div>

            </YellowContainer>
            <PurpleContainer>
            <div className="portfolio-header--container">
                    <h4>Commodities</h4>
                    <div>
                        <input className="portfolio-input-purple" type="text" name="" id="" />
                    </div>
                </div>
                <div className="portfolio-table--container">
                    <div className="portfolio-table-header">
                        <div className="portfolio-table-header-title">Name</div>
                        <div className="portfolio-table-header-title">Symbol</div>
                    </div>
                    <div className="portfolio-table-list">
                        <div className="portfolio-table-list-item">
                            <div className="portfolio-table-list-item-name">aplle inc</div>
                            <div className="portfolio-table-list-item-symbol">APPL</div>
                        </div>
                    </div>
                </div>

            </PurpleContainer>
        </animated.div>



    </>)
}