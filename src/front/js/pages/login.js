import React, { useContext } from "react";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container"
import '../../styles/login.sass'
import { TopBarTitle } from "../component/topBarTitle.js";
import { useSpring, animated } from '@react-spring/web'

import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {

    const { isAuthenticated, user } = useAuth0()

    const springs = useSpring({
        from:
            { x: -10, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: {
            duration: 750
        },
    })
    return (<>
        <TopBarTitle topTitle='My profile' />

        <div className="navbar-margin">
            <animated.div
                style={{
                    ...springs,
                }} className='d-flex flex-column justify-content-center align-items-center gap-5'
            >
                <h1>Profile Page</h1>
                <YellowContainer>
                    <h1>este sera el componente de Profile</h1>
                </YellowContainer>
                {isAuthenticated && user && <PurpleContainer>
                    <div className="d-flex flex-column justify-content-center align-item-center border" style={{ width: '80vw' }}>
                        <p>Nombre: </p> <p>{user.name}</p>
                        <p>Apellido: </p> <p>{user.name}</p>
                        <p>Dirección: </p> <p>{user.address}</p>
                        <p>Teléfono: </p> <p>{}</p>
                        <p>Email: </p> <p>{user.email}</p>
                    </div>
                </PurpleContainer>}
            </animated.div>
        </div>
    </>)
} 