import React from "react";
import { useState, useEffect, useContext } from "react";
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
import { data as Data } from '../../store/coinAPIdata.js'

import { useAuth0 } from "@auth0/auth0-react";

export const CommoditiesDash = () => {
    const data_example = 	{
		"asset_id": "USD",
		"name": "US Dollar",
		"type_is_crypto": 0,
		"data_quote_start": "2014-02-24T00:00:00.0000000Z",
		"data_quote_end": "2024-01-17T00:00:00.0000000Z",
		"data_orderbook_start": "2014-02-24T17:43:05.0000000Z",
		"data_orderbook_end": "2023-07-07T00:00:00.0000000Z",
		"data_trade_start": "2010-07-17T00:00:00.0000000Z",
		"data_trade_end": "2024-01-17T00:00:00.0000000Z",
		"data_symbols_count": 231281,
		"volume_1hrs_usd": 157643040537.56,
		"volume_1day_usd": 14574712395640.85,
		"volume_1mth_usd": 753537917787802.72,
		"id_icon": "0a4185f2-1a03-4a7c-b866-ba7076d8c73b",
		"data_start": "2010-07-17",
		"data_end": "2024-01-17"
	}

    const filtered_data = Data.filter(e => e.type_is_crypto === 1).map(element => ({ 'name': element.name, 'id': element.asset_id, 'price': element.price_usd, 'date': element.data_end })).sort((a, b) => b.price- a.price).splice(4, 30)


    const preColumns = Object.keys(filtered_data[0]).map(e => ({'field': e}))

    const [tableColumns, setTableColumns ] =  useState(preColumns)
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
            <div className="d-flex flex-row justify-content-around flex-wrap gap-5 p-4 pt-0" style={{ width: '100%' }}>
                <BlueContainer style={{ flexBasis: '40%', alignItems: 'center', justifyItems: 'center' }}>
                    <Doughnut data={filtered_data.splice(0,10)}/>
                </BlueContainer>
                <div className="d-flex flex-column gap-5 justify-content-between align-items-center p-4 " style={{ height: 700, width: '100%' }}>
                    {data.length > 1 && <Table data={data} columns={tableColumns}/>}
                </div>
            </div>
        </animated.div>}

    </>)
}