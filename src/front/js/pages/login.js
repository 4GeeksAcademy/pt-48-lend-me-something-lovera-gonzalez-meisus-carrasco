import React, { useContext, useState } from "react";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { BlueContainer } from "../component/color_containers/blue_container";
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

    const [estadoEdicion, setEstadoEdicion] = useState(false);
    const [ubicacion, setUbicacion] = useState('vigo');
    const [direccion, setDireccion] = useState('Calle Anduriña');



    return (<>
        <TopBarTitle topTitle='My profile' />

        <div className="navbar-margin">
            <animated.div
                style={{
                    ...springs,
                }} className='d-flex flex-column justify-content-center align-items-center gap-5'
            >
                <div className="d-flex flex-row align-items-center justify-content-around">
                    <GreenContainer style={{ position: 'relative', width: '500px' }}>
                        <div className="profile-picture-container">
                            <YellowContainer style={{ transform: 'rotate(180deg)' }}>
                                <div className="">
                                    <img style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '25%', transform: 'rotate(-180deg)' }} src={user.picture} />
                                </div>
                            </YellowContainer>
                        </div>
                        <div className="profile-info ">
                            <h3>Info de contacto</h3>
                            <p  >Direccion :
                                {!estadoEdicion && <span>{direccion}</span>}
                                {estadoEdicion && (
                                    <input className="profile-input" onChange={(e) => setDireccion(e.target.value)} value={direccion} type="text"></input>
                                )}
                            </p>
                            <p>Ubicacion :
                                {!estadoEdicion && <span>{ubicacion}</span>}
                                {estadoEdicion && (
                                    <input className="profile-input" onChange={(e) => setUbicacion(e.target.value)} value={ubicacion} type="text"></input>
                                )}
                            </p>
                            <p>Creacion de la cuenta :
                                <span>2024</span>
                            </p>
                            <p>Zona horaria :

                                <span>europa</span>
                            </p>
                            <p>Pais de residencia :
                                <span>españa</span></p>
                                <BlueContainer>
                            <button className="profile-button "onClick={() => setEstadoEdicion(!estadoEdicion)}>
                                {estadoEdicion ? 'guardar' : 'editar'}</button>
                                </BlueContainer>
                        </div>
                    </GreenContainer>
                    <PurpleContainer>
                        <h3>Detalles de la cuenta</h3>
                        <div><p>Name:

                            <span>{user.given_name} </span>
                        </p>
                        </div>
                        <div><p>Lastname:

                            <span>{user.family_name} </span>
                        </p>
                        </div>
                        <div><p>Nickname:

                            <span>{user.nickname} </span>
                        </p>
                        </div>
                    </PurpleContainer>
                </div>
                <BlueContainer>
                    <span>Recuerda nunca compartas tus claves, ni informacion acerca de tu cuenta</span>
                    <p>El equipo de FlowFinance nunca solicitara tus password por sms o email</p>
                </BlueContainer>
            </animated.div >
        </div >
    </>)
}

