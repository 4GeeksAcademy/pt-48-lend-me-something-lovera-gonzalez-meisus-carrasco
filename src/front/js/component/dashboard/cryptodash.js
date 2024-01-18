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

export const CrryptoDash = () => {

    const filtered_data = Data.filter(e => e.type_is_crypto === 1).map(element => ({ 'name': element.name, 'id': element.asset_id, 'price': element.price_usd, 'date': element.data_end })).sort((a, b) => a.price_usd - b.price_usd).splice(0, 30)


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
            console.log(data);
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
                    <Doughnut />
                </BlueContainer>
                <div className="d-flex flex-column gap-5 justify-content-between align-items-center p-4 " style={{ height: 700, width: '100%' }}>
                    {data.length > 1 && <Table data={data} columns={tableColumns}/>}
                </div>
            </div>
        </animated.div>}

    </>)
}


