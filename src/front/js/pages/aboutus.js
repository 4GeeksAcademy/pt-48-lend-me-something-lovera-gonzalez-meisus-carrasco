import React, { useContext } from "react";
import { PinkContainer } from "../component/color_containers/pink_container"
import { PurpleContainer } from "../component/color_containers/purple_container"
import { GreenContainer } from "../component/color_containers/green_container"
import { BlueContainer } from "../component/color_containers/blue_container"
import '../../styles/aboutus.sass'
import { useSpring, animated } from '@react-spring/web'
import { TopBarTitle } from "../component/topBarTitle.js";
import gloss from '../../../../public/fotos/adri.jpg'
import scarface from '../../../../public/fotos/Anderson.jpeg'
import atlas from '../../../../public/fotos/Augusto.jpeg'
import meisusito from '../../../../public/fotos/Juan.jpeg'

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

        <div className="navbar-margin aboutus--container">
            <animated.div
                style={{
                    ...springs,
                }}
                className="d-flex flex-row justify-content-center align-items-center"
            >
                {/* <h1 className="text-center">About Us</h1> */}
                <PurpleContainer style={{ display: 'flex', flexDirection: 'column', margin: '2em', gap: '2em', height: '450px', justifyContent:'space-between' }}>
                    <div className="aboutus-dev-container">

                        <img src={gloss} alt="Adrian" style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%' }} />

                        <div className="aboutus-dev-description">
                            <div>
                                <h4>Gloss</h4>
                                <p>Designed and grown to shine in the dark!</p>
                            </div>
                            <div>
                                <i className="fa-brands fa-linkedin"></i>
                                <a href="https://www.linkedin.com/in/loveradrian28/">Check me on LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <div className="aboutus-dev-container">

                        <img src={scarface} alt="Adrian" style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%' }} />

                        <div className="aboutus-dev-description">
                            <div>
                                <h4>Scarface</h4>
                                <p>Intended to leave a mark on your soul! </p>
                            </div>
                            <div>
                                <i className="fa-brands fa-linkedin"></i>
                                <a href="https://www.linkedin.com/in/anderson-gonzalez-1ba484277/">Check me on LinkedIn</a>
                            </div>
                        </div>
                    </div>


                </PurpleContainer>
                <BlueContainer style={{ display: 'flex', flexDirection: 'column', margin: '2em', gap: '2em', height: '450px', justifyContent:'space-between' }}>
                    <div className="aboutus-dev-container">
                        <img src={atlas} alt="Adrian" style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%' }} />
                        <div className="aboutus-dev-description">
                            <div>
                                <h4>Atlas</h4>
                                <p>There's no ilusion you can't see.</p></div>
                            <div>
                                <i className="fa-brands fa-linkedin"></i>
                                <a href="www.linkedin.com/in/augusto-santiago-carrasco-toro">Check me on LinkedIn</a>
                            </div>
                        </div>
                    </div>
                    <div className="aboutus-dev-container">
                        <img src={meisusito} alt="Adrian" style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%' }} />
                        <div className="aboutus-dev-description">
                            <div>
                                <h4>Meisusito</h4>
                                <p>Instálate algo, marico!</p>
                            </div>
                            <div>
                                <i className="fa-brands fa-linkedin"></i>
                                <a href="https://www.linkedin.com/in/juan-manuel-meisus-alvarez-b7b293280/">Check me on LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </BlueContainer>

            </animated.div>
        </div>
    </>)
} 