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

export const CrryptoDash = () => {

    const { store, actions } = useContext(Context)


    const filtered_data = store?.cryptoDB?.map(element => ({
        'name': element.name,
        'id': element.asset_id,
        'price': +(element.price_usd),
        'date': element.data_end
    })).filter(element => element.price < 40000).sort((a, b) => b.price - a.price).splice(4, 30)

    const preColumns = Object.keys(filtered_data[0]).map(e => ({ 'field': e, 'flex': 1 }))
    console.log(preColumns)

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

                <div className="d-flex flex-row justify-content-between align-items-center gap-4" style={{ width: '80%' }}>
                    <BlueContainer style={{ alignItems: 'center', justifyItems: 'center', }}>
                        <Doughnut data={filtered_data.splice(0, 10)} colors={['#5F8670', '#FF9800', '#B80000', '#820300']} title='Top 10 Cryptos!' />
                    </BlueContainer>
                    <BlueContainer>
                    </BlueContainer>
                </div>
                {data.length > 1 && <Table data={data} columns={tableColumns} />}
            </div>
        </animated.div>}

    </>)
}


