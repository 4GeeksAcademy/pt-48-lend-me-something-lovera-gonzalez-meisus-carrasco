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

export const Dashboard = () => {
    const { user, isLoading } = useAuth0();
    const [searchState, setSearchState] = useState(false);
    const { store, actions } = useContext(Context);
    const [activeTab, setActiveTab] = useState(1)

    const handleClick = () => {

        setSearchState(!searchState);
        console.log(searchState)
    }

    const checkForUserInDB = () => {
        actions.setUser(user)

    }

    useEffect(() => {
        if (user) {
            checkForUserInDB()
        }
    }, [])

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
    </>)
}
