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

export const CommoditiesDash = () => {

    const { store, actions } = useContext(Context)

    const filtered_data = store?.commoditiesDB?.map(element => ({ 'name': element.key, 'date': new Date(element.date).toLocaleDateString("es-es"), 'price': element.value, 'updated': new Date(element.updated).toLocaleDateString("es-es") })).sort((a, b) => a.price - b.price).splice(0, 30)


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
                    <Doughnut data={filtered_data.splice(0, 10)} colors={['#555', '#b4b4a6', '#c3c3b7']} title='Top 10 Comodities' />
                </BlueContainer>
                {data.length > 1 && <Table data={data.map(element => ({
                    ...element, price: `$ ${element.price}`
                }))} columns={tableColumns} />}
            </div>
        </animated.div>}

    </>)
}