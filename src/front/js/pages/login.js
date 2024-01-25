import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { BlueContainer } from "../component/color_containers/blue_container";
import '../../styles/login.sass';
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from '../component/spinner.js'

import { TopBarTitle } from "../component/topBarTitle.js";
import { useSpring, animated } from '@react-spring/web'

export const Login = () => {

    const { isAuthenticated, user, isLoading } = useAuth0()
    const { store, actions } = useContext(Context)

    const springs = useSpring({
        from:
            { x: -10, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: {
            duration: 750
        },
    })

    const [estadoEdicion, setEstadoEdicion] = useState(false);

    const handleEditSave = () => {
        if (estadoEdicion) {
            actions.editUser()
        }
        setEstadoEdicion(!estadoEdicion);
    };
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
                    <GreenContainer style={{ position: 'relative', width: '700px', height: '500px' }}>
                        <div className="profile-picture-container">
                            <h3>Account details</h3>
                            <div className="">
                                <img style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', marginBottom: '20px' }} src={user.picture} />
                            </div>
                            <div className="profile-account-details"><span>Name :
                            </span>
                                <p style={{ fontSize: ' 1.1em', fontWeight: '600' }}> {user.given_name} </p>
                            </div>
                            <div><span>Lastname :
                            </span>
                                <p style={{ fontSize: ' 1.1em', fontWeight: '600' }}> {user.family_name} </p>
                            </div>
                            <div><span>Nickname :
                            </span>
                                <p style={{ fontSize: ' 1.1em', fontWeight: '600' }}> {user.nickname} </p>
                            </div>

                        </div>
                        <div className="profile-info ">
                            <h3>Contact information</h3>
                            <span>Address</span>
                            {!estadoEdicion && <p> {store.user?.street}</p>}
                            {estadoEdicion && (
                                <input className="profile-input" onChange={(e) => actions.setStreet(e.target.value)} value={store.user?.street} type="text"></input>
                            )}
                            <span>Location</span>
                            {!estadoEdicion && <p> {store.user?.city}</p>}
                            {estadoEdicion && (
                                <input className="profile-input" onChange={(e) => actions.setCity(e.target.value)} value={store.user?.city} type="text"></input>
                            )}
                            <span>Country of residence</span>
                            {!estadoEdicion && <p> {store.user?.country}</p>}
                            {estadoEdicion && (
                                <input className="profile-input" onChange={(e) => actions.setCountry(e.target.value)} value={store.user?.country} type="text"></input>
                            )}
                            <span>Account creation</span>
                            <p>{store.user?.created_at}</p>
                            <span>Time zone</span>
                            <p>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
                            <div className="profile-button">
                                <button className="green--button " onClick={handleEditSave}>
                                    {estadoEdicion ? 'Guardar' : 'Editar'}</button>
                            </div>
                        </div>
                    </GreenContainer>
                    {/* <PurpleContainer style={{ height: '500px', width: '300px' }}>
                       
                    </PurpleContainer> */}
                </div>
                <BlueContainer style={{ width: '700px' }}>
                    <div className="profile-text" style={{ width: 'cover' }} >

                        <p style={{ fontSize: ' 1.1em', fontWeight: '600' }}>Recuerda nunca compartas tus claves, ni informacion acerca de tu cuenta</p>
                        <p style={{ fontSize: ' 1.1em', fontWeight: '600' }}>El equipo de FlowFinance nunca solicitara tus password por sms o email</p>

                    </div>
                </BlueContainer>
            </animated.div >
        </div >
    </>)
}

