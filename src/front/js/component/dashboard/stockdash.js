import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext.js'
import { BlueContainer } from "../color_containers/blue_container";
import { GreenContainer } from "../color_containers/green_container";
import { PinkContainer } from "../color_containers/pink_container";
import { YellowContainer } from "../color_containers/yellow_container";
import { PurpleContainer } from "../color_containers/purple_container";
import "../../../styles/dashboard.sass"
import { Doughnut } from "./doughnut_chart";
import { useSpring, animated } from '@react-spring/web'
import { Spinner } from "../spinner"
import { TopBarTitle } from "../topBarTitle.js";
import { Table } from "./table.js";

import { useAuth0 } from "@auth0/auth0-react";
import { Linear } from "./linear_chart.js";
import { get_last_eod_data } from "../../store/API.js";

export const Stockdash = () => {

    const [tableData, setTableData] = useState([]);
    const [grapshDara, setGraphData] = useState();
    const [loader, setLoader] = useState(true);
    const { store, actions } = useContext(Context);
    let portfolioSize;

    const springs = useSpring({
        from: { opacity: 0, y: -5 },
        to: [{ opacity: 1, y: 0 }],
        config: {
            mass: 5,
            friction: 35,
            tension: 120,
        },
    });

    const loadData = async () => {
        portfolioSize = store.userPortfolio?.filter(element => element.item_type === 'Stock').length > 0
        // console.log(portfolioSize)
        if (portfolioSize) {
            const symbols = store.userPortfolio?.filter(element => element.item_type === 'Stock').map(e => e.item_symbol).join(',')
            // console.log(symbols)
            const today = (new Date())
            today.setDate(today.getDate() - 1)
            const data = await get_last_eod_data(symbols)
            setGraphData(await data.map(e => ({ price: e.close, name: e.symbol })).slice(0, 10))
        }

        setTimeout(() => {
            setLoader(false)

        }, 500)

    }

    useEffect(() => {
        loadData();

    }, [])

    if (loader) return (<>
        <Spinner />
    </>)
    return (<>

        <animated.div
            style={{
                ...springs,
            }}
            className="d-flex flex-column gap-5 navbar-margin"
        >
            <div className="d-flex flex-row justify-content-around flex-wrap gap-5 p-4 pt-0" style={{ width: '100%' }}>
                <BlueContainer style={{ alignItems: 'center', justifyItems: 'center' }}>
                    <Doughnut title='Top 10 Stocks' data={grapshDara} />
                </BlueContainer>
                {/* <YellowContainer>
                        <Linear color={'#ffd155'}/>
                    </YellowContainer> */}
                <div className="d-flex flex-column gap-5 justify-content-between align-items-center p-4 " style={{ height: 700, width: '100%' }}>
                    <Table />

                </div>

            </div>
        </animated.div>

    </>)
}


