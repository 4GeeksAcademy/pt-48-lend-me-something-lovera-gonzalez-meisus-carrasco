import React, { useContext } from "react";
import { PinkContainer } from "../component/color_containers/pink_container"
import '../../styles/aboutus.sass'
import { useSpring, animated } from '@react-spring/web'
import { TopBarTitle } from "../component/topBarTitle.js";

export const AboutUs = () => {

    const springs = useSpring({
        from: 
            { x: -10, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: {
            duration: 750
        },
    })
    return (<>
        <TopBarTitle topTitle='About Us' />

        <div className="navbar-margin">
            <animated.div
                style={{
                    ...springs,
                }}
                className="d-flex flex-column justify-content-center align-items-center vh-100"
            >
                <h1 className="text-center">About Us</h1>
                <PinkContainer>
                    <h1>aqui estará la info general del grupo</h1>
                
                </PinkContainer>
               
            </animated.div>
        </div>
    </>)
} 