import React, { useContext, useEffect, useState } from "react";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { BlueContainer } from "../component/color_containers/blue_container"
import '../../styles/login.sass'
import { TopBarTitle } from "../component/topBarTitle.js";
import { useSpring, animated } from '@react-spring/web'

import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {

    const { isAuthenticated, user } = useAuth0()
    const [isEditting, setIsEdditing] = useState(false)
    const [direccion, setDireccion] = useState('Monforte de Lemos')
    const [pais, setPais] = useState('Espana')
    const [ciudad, setCiudad] = useState('Vigo')

    const springs = useSpring({
        from:
            { x: -10, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: {
            duration: 750
        },
    })

    const handleEddit = () => {
        setIsEdditing(true)
    }
    const saveModifications = () => {
        setIsEdditing(false)
    }
    return (<>
        <TopBarTitle topTitle='My profile' />

        <div className="navbar-margin">
            <animated.div
                style={{
                    ...springs,
                }} className='d-flex flex-column justify-content-center align-items-center gap-5'
            >
                
                <div className="d-flex flex-row align-items-center justify-content-around">

                    <GreenContainer style={{ position: 'relative', width: '500px', height: "500px" }}>
                        <div className="profile-picture-container">
                            <div className="">
                                <img style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} src={user.picture} />
                            </div>
                        </div>

                        <div className="d-flex flex-column profile-edit ">
                            <h3>Info de contacto</h3>
                            <span>Direccion</span>
                            {!isEditting && <p>{direccion}{" "}</p>}
                            {isEditting && <>
                                <input className="profile-edit-input" type="text" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)}></input>
                            </>}
                            <span>Ciudad</span>
                            {!isEditting && <p>{ciudad}{" "}</p>}
                            {isEditting && <>
                                <input className="profile-edit-input" type="text" name="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)}></input>
                            </>}
                            <span>Pais</span>
                            {!isEditting && <p>{pais}{" "}</p>}
                            {isEditting && <>
                                <input className="profile-edit-input" type="text" name="pais" value={pais} onChange={(e) => setPais(e.target.value)}></input>
                            </>}
                            <span>Creacion de la cuenta</span>
                            <p>Julio de 2023</p>
                            <span>Zona horaria</span>
                            <p>GMT+1</p>
                            {!isEditting && <button className="profile-edit-button" onClick={handleEddit} >
                                Edit your information
                                <i className="fa-regular fa-pen-to-square" style={{ color: 'white' }}></i>
                            </button>}
                            {isEditting && <button className="profile-edit-button" onClick={saveModifications} >
                                Save your changes
                                <i className="fa-solid fa-check" style={{ color: 'white' }}></i>
                            </button>}
                        </div>
                    </GreenContainer>
                    <YellowContainer style={{ width: '250px', height: "500px" }}>
                        <h3>Detalles de la cuenta</h3>
                        <div><p>Name:</p>
                            <span>{user.given_name}</span>
                        </div>
                        <div><p>Lastname:</p>
                            <span>{user.family_name}</span>
                        </div>

                        <div><p>Nickname:</p>
                            <span>{user.nickname}</span>
                        </div>
                    </YellowContainer>
                </div>
                <BlueContainer>
                    <span>Recuerda nunca compartas tus claves, ni informacion acerca de tu cuenta</span>
                    <p>El equipo de FlowFinance nunca solicitara tus password por sms o email</p>
                </BlueContainer>
            </animated.div>
        </div>
    </>)
} 