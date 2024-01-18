import React, { useContext, useState } from "react";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { BlueContainer } from "../component/color_containers/blue_container";
import '../../styles/notifications.sass';
import foto from "../../img/foto.jpg"
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from '../component/spinner.js'

import { TopBarTitle } from "../component/topBarTitle.js";
import { useSpring, animated } from '@react-spring/web'

export const Notifications = () => {

    const { isAuthenticated, user, isLoading } = useAuth0()

    const springs = useSpring({
        from:
            { x: -10, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: {
            duration: 750
        },
    })





    if (isLoading) return (<>
        <Spinner />
    </>)
    return (<>
        <TopBarTitle topTitle='Notifications' />

        <div className="navbar-margin">
            <animated.div
                style={{
                    ...springs,
                }} className='d-flex flex-column justify-content-center align-items-center gap-5'
            >
                <GreenContainer style={{ width: '60%', position: 'relative' }}>
                    <h4> <i className="fa-solid fa-bell" ></i> {' '}Your notifications below: </h4>
                    <div className="mt-4 notification">
                        <p> <i className="fa-solid fa-xmark"></i> Notification</p>
                        <p> <i className="fa-solid fa-xmark"></i> Notification</p>
                        <p> <i className="fa-solid fa-xmark"></i> Notification</p>
                        <p> <i className="fa-solid fa-xmark"></i> Notification</p>
                        <p> <i className="fa-solid fa-xmark"></i> Notification</p>
                    </div>
                    <button className="green--button notifications-clear-button">Clear All</button>
                </GreenContainer>
                <PurpleContainer style={{ width: '60%', position: 'relative' }}>
                    <h4> <i className="fa-solid fa-triangle-exclamation" ></i> {' '}Your alerts below: </h4>
                    <div className="mt-4 alert">
                        <p> <i className="fa-solid fa-xmark"></i> Alert</p>
                        <p> <i className="fa-solid fa-xmark"></i> Alert</p>
                        <p> <i className="fa-solid fa-xmark"></i> Alert</p>
                        <p> <i className="fa-solid fa-xmark"></i> Alert</p>
                        <p> <i className="fa-solid fa-xmark"></i> Alert</p>
                    </div>
                    <button className="purple--button notifications-clear-button">Clear All</button>
                </PurpleContainer>
                <div className="d-flex flex-row align-items-center justify-content-around gap-5">
                </div>
            </animated.div >
        </div >
    </>)
}

