import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext.js'
import { BlueContainer } from "../color_containers/blue_container";
import "../../../styles/dashboard.sass"
import { Doughnut } from "./doughnut_chart";
import { useSpring, animated } from '@react-spring/web'
import { Spinner } from "../spinner"
import { Table } from "./table.js";
import { SmallTable } from "./search_table.js";

import { useAuth0 } from "@auth0/auth0-react";

export const CommoditiesDash = () => {

    const { store, actions } = useContext(Context)
    // console.log(store.commoditiesDB)
    const [graphData, setGraphData] = useState();

    const store_data = store.commoditiesDB
    const filtered_data = store_data.map(element => ({ 
        'name': element.key,
        'price': element.value, 
        'updated': new Date(element.date).toLocaleDateString("es-es") })).sort((a, b) => a.price - b.price)
    // console.log(filtered_data)
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
        portfolioSize = store.userPortfolio?.filter(element => element.item_type === 'Commodity').length > 0
        // console.log(portfolioSize)
        if (portfolioSize) {
            const symbols = store.userPortfolio?.filter(element => element.item_type === 'Commodity')
            // console.log(symbols)
            const data = symbols.reduce((acc, next) => [...acc, store.commoditiesDB.filter(element=> element.key === next.item_symbol)[0]],[])
            // console.log(data)
            setGraphData(await data.map(e => ({ price: e.value != null ?  e.value : 1, name: e.key })).sort((a,b) => b.price-a.price).slice(0, 10))
        } else {
            setGraphData(filtered_data.slice(0,10))
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
            actions.setCommoditiesDB()
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
                    <BlueContainer style={{ alignItems: 'center', justifyItems: 'center' }}>
                        <Doughnut data={graphData} colors={['#555', '#b4b4a6', '#c3c3b7']} title='Top 10 Comodities' />
                    </BlueContainer>

                    <BlueContainer>
                        <SmallTable data={store.commoditiesDB.map(e => ({ ...e, name: e.key, symbol: e.key }))} title='Commodities' type='Commodity'  />

                    </BlueContainer>
                </div>
                {data.length > 1 && <Table data={data.map(element => ({
                    ...element, price: `$ ${element.price}`
                }))} columns={tableColumns} />}
            </div>
        </animated.div>}

    </>)
}