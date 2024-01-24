import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../store/appContext'
import { PurpleContainer } from '../color_containers/purple_container'
import { BlueContainer } from '../color_containers/blue_container'
import { YellowContainer } from '../color_containers/yellow_container'
import { TopBarTitle } from '../topBarTitle'
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web'
import '../../../styles/checkout.sass'

export const Checkout = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const springs = useSpring({
        from: { opacity: 0, y: -5 },
        to: [{ opacity: 1, y: 0 }],
        config: {
            mass: 5,
            friction: 35,
            tension: 120,
        },
    })

    const handlePay = () => {
        navigate(`/checkout-form/${store.subscription.product_id}`)
    }


    return (<>

        <TopBarTitle topTitle='Checkout' />

        <animated.div
            style={{
                ...springs,
            }}
            className="navbar-margin checkout--container" >
            <YellowContainer style={{ width: '50%', height: '350px', position: 'relative' }}>
                <div className="checkout-plan--container">
                    <div className='d-flex flex-row justify-content-between gap-2 align-items-center w-100'>
                        <h4>Your cart</h4>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <div className='checkout-item--container'>
                        <span>{store?.subscription?.level} Plan</span>
                    </div>
                </div>
                <button className="yellow--button checkout-back--button" onClick={() => navigate('/subscription')}>Back</button>
            </YellowContainer>
            <PurpleContainer style={{ width: '30%', position: 'relative', height: '350px' }}>

                {store?.subscription && <div className='checkout--check'>
                    <h4>Your check</h4>
                    <span>Subtotal</span>
                    <p>{(+store?.subscription?.price * 0.8265).toFixed(2)} €</p>
                    <span>VAT</span>
                    <p>{(+store?.subscription?.price * 0.8265 * 0.21).toFixed(2)} €</p>
                    <span>Total</span>
                    <p>{+store?.subscription?.price} €</p>
                </div>}
                <button className="purple--button checkout--button" onClick={handlePay}>Pay</button>
            </PurpleContainer>
        </animated.div>

    </>)
}