import React, { useContext } from "react";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import '../../styles/login.sass';
import foto from "../../img/foto.jpg"
import { useAuth0 } from "@auth0/auth0-react";

import { TopBarTitle } from "../component/topBarTitle.js";
import { useSpring, animated } from '@react-spring/web'

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
                <div className="d-flex flex-row aling-items-center justify-content-around">

                    <YellowContainer>
                        <div className="">
                            <img style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '25%' }} src={foto} />
                        </div>

                    </YellowContainer>


                    <YellowContainer>

                        <div className="">

                            <h3>Info de contacto</h3>
                            <p>Direccion</p>
                            <p>Ubicacion</p>
                            <p>Creacion de la cuenta</p>
                            <p>Zona horaria</p>
                            <p>Pais de residencia</p>
                            <span>Recuerda nunca compartas tus claves, ni informacion acerca de tu cuenta</span>
                            <p>El equipo de FlowFinance nunca solicitara tus password por sms o email</p>




                        </div>
                    </YellowContainer>
                    <PurpleContainer>
                        <h3>Detalles de la cuenta</h3>
                        <div><p>Name:</p>
                            <span>{user.given_name}</span>
                        </div>
                        <div><p>Lastname:</p>
                            <span>{user.family_name }</span>
                        </div>

                        <div><p>Nickname:</p>
                            <span>{user.nickname }</span>
                        </div>

                        




                    </PurpleContainer>
                </div>
                
            </animated.div>
        </div>
        
    </>)
} 