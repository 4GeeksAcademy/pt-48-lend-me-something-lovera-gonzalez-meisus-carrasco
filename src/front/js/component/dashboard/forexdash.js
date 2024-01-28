import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext.js'
import { BlueContainer } from "../color_containers/blue_container";
import "../../../styles/dashboard.sass"
import { Doughnut } from "./doughnut_chart";
import { useSpring, animated } from '@react-spring/web'
import { Spinner } from "../spinner"
import { Table } from "./table.js";


export const ForexDash = () => {

    const { store, actions } = useContext(Context)

    const filtered_data = store?.forexDB.map(element => ({ 'name': element.ticker.toUpperCase(), 'price': element.midPrice, 'bidPrice': element.bidPrice, 'askPrice': element.askPrice })).sort((a, b) => a.price - b.price).splice(0, 30)


    const preColumns = Object.keys(filtered_data[0]).map(e => ({ 'field': e, 'flex': 1 }))

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
    })

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
            // console.log(data);
        }, 1000)
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
                <BlueContainer style={{ alignItems: 'center', justifyItems: 'center' }}>
                    <Doughnut data={filtered_data.sort((a, b) => b.price - a.price).splice(0, 10)} colors={['#5BF428', '#328a32', '#4e874e']} title='Top 10 Currencies' />
                </BlueContainer>
                {data.length > 1 && <Table data={data} columns={tableColumns} />}
            </div>
        </animated.div>}

    </>)
}