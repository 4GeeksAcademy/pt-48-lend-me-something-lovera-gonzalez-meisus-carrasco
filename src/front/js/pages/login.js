import React, { useContext, useState } from "react";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { BlueContainer } from "../component/color_containers/blue_container";
import '../../styles/login.sass';
import foto from "../../img/foto.jpg"
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from '../component/spinner.js'

import { TopBarTitle } from "../component/topBarTitle.js";
import { useSpring, animated } from '@react-spring/web'

export const Login = () => {

    const { isAuthenticated, user, isLoading } = useAuth0()

    const springs = useSpring({
        from:
            { x: -10, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: {
            duration: 750
        },
    })



    const [estadoEdicion, setEstadoEdicion] = useState(false);
    const [ubicacion, setUbicacion] = useState('Vigo');
    const [direccion, setDireccion] = useState('Calle Anduriña');



    if (isLoading) return (<>
        <Spinner />
    </>)
    return (<>
        <TopBarTitle topTitle='My profile' />

        <div className="navbar-margin">
            <animated.div
                style={{
                    ...springs,
                }} className='d-flex flex-column justify-content-center align-items-center gap-5'
            >
                <div className="d-flex flex-row align-items-center justify-content-around gap-5">
                    <GreenContainer style={{ position: 'relative', width: '500px', height: '500px' }}>
                        <div className="profile-picture-container">
                            <div className="">
                                <img style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} src={user.picture} />
                            </div>

                        </div>
                        <div className="profile-info ">
                            <h3>Info de contacto</h3>
                            <span >Direccion :
                            </span >
                            {!estadoEdicion && <p> {direccion}</p>}
                            {estadoEdicion && (
                                <input className="profile-input" onChange={(e) => setDireccion(e.target.value)} value={direccion} type="text"></input>
                            )}
                            <span>Ubicacion :
                            </span>
                            {!estadoEdicion && <p> {ubicacion}</p>}
                            {estadoEdicion && (
                                <input className="profile-input" onChange={(e) => setUbicacion(e.target.value)} value={ubicacion} type="text"></input>
                            )}
                            <span >Creacion de la cuenta :
                            </span>
                            <p> 2024</p>
                            <span >Zona horaria :

                            </span >
                            <p> GMT+1</p>
                            <span >Pais de residencia :
                            </span >
                            <p> España</p>
                            <button className="green--button " onClick={() => setEstadoEdicion(!estadoEdicion)}>
                                {estadoEdicion ? 'Guardar' : 'Editar'}</button>

                        </div>
                    </GreenContainer>
                    <PurpleContainer style={{ height: '500px', width: '300px' }}>
                        <h3>Detalles de la cuenta</h3>
                        <div><span>Name :
                        </span>
                            <p> {user.given_name} </p>
                        </div>
                        <div><span>Lastname :
                        </span>
                            <p> {user.family_name} </p>
                        </div>
                        <div><span>Nickname :
                        </span>
                            <p> {user.nickname} </p>
                        </div>

                    </PurpleContainer>
                </div>
                <BlueContainer style={{ width: '800px', alignItems: 'center' }}>
                    <p>Recuerda nunca compartas tus claves, ni informacion acerca de tu cuenta</p>
                    <p>El equipo de FlowFinance nunca solicitara tus password por sms o email</p>
                </BlueContainer>
            </animated.div >
        </div >
    </>)
}

