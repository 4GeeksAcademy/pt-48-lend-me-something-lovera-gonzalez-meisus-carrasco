import React, { useContext } from "react";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container"
import '../../styles/login.sass'
import { TopBarTitle } from "../component/topBarTitle.js";
import { useSpring, animated } from '@react-spring/web'

export const Login = () => {

    const springs = useSpring({
        from: 
            { x: -10, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: {
            duration: 750
        },
    })
    return (<>
        <TopBarTitle topTitle='Login' />

        <div className="navbar-margin">
            <animated.div
                style={{
                    ...springs,
                }}
            >
                <h1>Login Page</h1>
                <YellowContainer>
                    <h1>este sera el componente de login</h1>
                </YellowContainer>
                <PurpleContainer>
                    <input type="text" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="Password" />
                    <button>Login</button>
                    <p>Register</p>
                </PurpleContainer>
            </animated.div>
        </div>
    </>)
} 