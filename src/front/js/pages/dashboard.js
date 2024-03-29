import React, { useContext, useEffect, useState } from "react";
import { Context } from '../store/appContext.js'
import { BlueContainer } from "../component/color_containers/blue_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { PinkContainer } from "../component/color_containers/pink_container";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import "../../styles/dashboard.sass"
import { useSpring, animated } from '@react-spring/web'
import { Spinner } from "../component/spinner"
import { TopBarTitle } from "../component/topBarTitle.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Stockdash } from "../component/dashboard/stockdash.js";
import { DashTabs } from "../component/dashboard/dash_tabs.js";
import { CrryptoDash } from "../component/dashboard/cryptodash.js";
import { ForexDash } from "../component/dashboard/forexdash.js";
import { CommoditiesDash } from "../component/dashboard/commoditiesdash.js";

export const Dashboard = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();
    const { store, actions } = useContext(Context);
    const [activeTab, setActiveTab] = useState(1)


    const checkForUserInDB = () => {
        actions.setUser(user)
        // console.log("buscando user")

    }



    const springs = useSpring({
        from: { opacity: 0, y: -5 },
        to: [{ opacity: 1, y: 0 }],
        config: {
            mass: 5,
            friction: 35,
            tension: 120,
        },
    })
    if (isLoading) return (<>
        <Spinner />

    </>)
    return (<>
        <TopBarTitle topTitle='Dashboard ' />
        <DashTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 1 && <Stockdash />}
        {activeTab === 2 && <CrryptoDash/>}
        {activeTab === 3 && <ForexDash/>}
        {activeTab === 4 && <CommoditiesDash/>}
    </>)
}
