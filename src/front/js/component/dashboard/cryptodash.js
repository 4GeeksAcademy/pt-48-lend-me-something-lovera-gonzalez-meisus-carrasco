import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext.js'
import { BlueContainer } from "../color_containers/blue_container";
import "../../../styles/dashboard.sass"
import { Doughnut } from "./doughnut_chart";
import { useSpring, animated } from '@react-spring/web'
import { Spinner } from "../spinner"
import { Table } from "./table.js";

import { useAuth0 } from "@auth0/auth0-react";
import { SmallTable } from "./search_table.js";

export const CrryptoDash = () => {

    const { store, actions } = useContext(Context)
    const [graphData, setGraphData] = useState();


    const filtered_data = store?.cryptoDB?.map(element => ({
        'name': element.name,
        'id': element.asset_id,
        'price': +(element.price_usd),
        'date': element.data_end
    })).filter(element => element.price < 40000).sort((a, b) => b.price - a.price).slice(4, 34)
    const preColumns = filtered_data[0] ? Object.keys(filtered_data[0]).map(e => ({ 'field': e, 'flex': 1 })) : null

    const [tableColumns, setTableColumns] = useState(preColumns)
    const [data, setData] = useState(filtered_data);
    const [loading, setLoading] = useState(true)

    const springs = useSpring({
        from: { opacity: 0, y: -5 },
        to: [{ opacity: 1, y: 0 }],
        config: {
            mass: 5,
            friction: 35,
            tension: 120,
        },
    });
    let portfolioSize;


    const loadData = async () => {
        portfolioSize = store.userPortfolio?.filter(element => element.item_type === 'Crypto').length > 0
        // console.log(portfolioSize)
        if (portfolioSize) {
            const symbols = store.userPortfolio?.filter(element => element.item_type === 'Crypto')
            // console.log(symbols)
            const data = symbols.reduce((acc, next) => [...acc, store.cryptoDB.filter(element=> element.asset_id === next.item_symbol)[0]],[])
            console.log(data)
            setGraphData(await data.map(e => ({ price: e.price_usd != null ?  e.price_usd : 1, name: e.asset_id })).slice(0, 10))
        }

        setTimeout(() => {
            setLoading(false)

        }, 1000)

    }

    useEffect(() => {
        loadData()
        return () => {
            setTableColumns()
            setData()
            setLoading(true)
            actions.setCryptoDB()
        }
    }, [])

    return (<>
        {loading && <Spinner />}
        {!loading && <animated.div
            style={{
                ...springs,
            }}
            className="d-flex flex-column gap-5 navbar-margin"
        >
            <div className="d-flex flex-column justify-content-center align-items-center flex-wrapp-4 pt-0 gap-5" style={{ width: '100%' }}>

                <div className="d-flex flex-row justify-content-between align-items-center gap-4" style={{ width: '80%' }}>
                    <BlueContainer style={{ alignItems: 'center', justifyItems: 'center', }}>
                        <Doughnut data={graphData} colors={['#5F8670', '#FF9800', '#B80000', '#820300']} title='Top 10 Cryptos!' />
                    </BlueContainer>
                    <BlueContainer>
                        <SmallTable data={store?.cryptoDB?.slice(0,500).map(e=> ({name: e.name, symbol: e.asset_id}))} title='Cryptocurrencies' type='Crypto'/>
                    </BlueContainer>
                </div>
                {data.length > 1 && <Table data={data} columns={tableColumns} />}
            </div>
        </animated.div>}

    </>)
}


