import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext.js'
import { BlueContainer } from "../color_containers/blue_container";
import "../../../styles/dashboard.sass"
import { Doughnut } from "./doughnut_chart";
import { useSpring, animated } from '@react-spring/web'
import { Spinner } from "../spinner"
import { Table } from "./table.js";
import { GreenContainer } from "../color_containers/green_container.js";
import { SmallTable } from "./search_table.js";


export const ForexDash = () => {

    const { store, actions } = useContext(Context)
    const [graphData, setGraphData] = useState();
    const filtered_data = store?.forexDB.map(element => ({ 'name': element.ticker.toUpperCase(), 'price': element.midPrice, 'bidPrice': element.bidPrice, 'askPrice': element.askPrice, 'date': new Date(element.updated).toLocaleDateString("es-es"),  'date': new Date(element.quoteTimestamp).toLocaleDateString("es-es") })).sort((a, b) => a.price - b.price)


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
        portfolioSize = store.userPortfolio?.filter(element => element.item_type === 'Forex').length > 0
        // console.log(portfolioSize)
        if (portfolioSize) {
            const symbols = store.userPortfolio?.filter(element => element.item_type === 'Forex')
            // console.log(symbols)
            const data = symbols.reduce((acc, next) => [...acc, store.forexDB.filter(element=> element.ticker === next.item_symbol)[0]],[])
            // console.log(data)
            setGraphData(await data.map(e => ({ price: e.midPrice != null ?  e.midPrice : 1, name: e.ticker })).sort((a,b) => b.price-a.price).slice(0, 10))
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
            actions.setForexDB()
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
                <div className="d-flex flex-row justify-content-between align-items-center gap-4" style={{width: '80%'}}>

                <BlueContainer style={{ alignItems: 'center', justifyItems: 'center' }}>
                    <Doughnut data={graphData} colors={['#5BF428', '#328a32', '#4e874e']} title='Your top 10 Currencies' />
                </BlueContainer>
                <BlueContainer>
                <SmallTable data={store?.forexDB.map(e=> ({name: e.ticker, symbol: e.ticker}))} title='Forex' type='Forex'/>

                </BlueContainer>
                </div>
                {data.length > 1 && <Table data={data.map(element=> ({...element,
                     'price': `$ ${element.price}`, 'bidPrice': `$ ${element.bidPrice}`, 'askPrice': `$ ${element.askPrice}`
                }))} columns={tableColumns} />}
            </div>
        </animated.div>}

    </>)
}