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
import { commoditiesData as Data } from '../../store/commoditiesData.js'

import { useAuth0 } from "@auth0/auth0-react";

export const CommoditiesDash = () => {
    

    const filtered_data = Data.map(element => ({ 'name': element.dataId, 'date': new Date(element.date).toLocaleDateString("es-es"), 'price': element.value, 'updated': new Date(element.updated).toLocaleDateString("es-es")})).sort((a, b) => a.price_usd - b.price_usd).splice(0, 30)


    const preColumns = Object.keys(filtered_data[0]).map(e => ({'field': e, 'flex': 1}))

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
            <div className="d-flex flex-column justify-content-center align-items-center flex-wrapp-4 pt-0 gap-5" style={{ width: '100%' }}>
                <BlueContainer style={{  alignItems: 'center', justifyItems: 'center'}}>
                    <Doughnut data={filtered_data.splice(0,10)} colors={['#555', '#b4b4a6', '#c3c3b7']} title='Top 10 Comodities'/>
                </BlueContainer>
                    {data.length > 1 && <Table data={data.map(element => ({
                        ...element, price: `$ ${element.price}`
                    }))} columns={tableColumns}/>}
            </div>
        </animated.div>}

    </>)
}