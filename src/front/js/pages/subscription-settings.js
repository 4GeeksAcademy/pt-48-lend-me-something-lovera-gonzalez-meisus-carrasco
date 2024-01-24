import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../store/appContext';
import { PurpleContainer } from '../component/color_containers/purple_container'
import { BlueContainer } from '../component/color_containers/blue_container'
import { YellowContainer } from '../component/color_containers/yellow_container'
import { TopBarTitle } from '../component/topBarTitle'
import { useNavigate } from "react-router-dom";

import { useSpring, animated } from '@react-spring/web'
import '../../styles/subscription.sass'

export const Subscription = () => {

    const { store, actions } = useContext(Context)
    const subscriptionPlans = [
        {
            'level': 'Free',
            'price': 0
        },
        {
            'level': 'Essential',
            'price': 5.99,
            'product_id': 'price_1Oc1qHEUv4sos4iTVEhLbR2u'
        },
        {
            'level': 'Bussines',
            'price': 9.99,
            'product_id': 'price_1Oc1qlEUv4sos4iTDmypeTRP'
        }]


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

    const handleClick = (string) => {
        const [subscriptionToSetTo] = subscriptionPlans.filter(level => level.level == string);
        actions.setSubscription(subscriptionToSetTo);
        localStorage.setItem('subscription', JSON.stringify(subscriptionToSetTo))
        navigate('/checkout');
    }

    return (<>

        <TopBarTitle topTitle='Subscription Management' />

        <animated.div
            style={{
                ...springs,
            }}
            className="navbar-margin subscription--container" >
            <YellowContainer style={{ width: '60%' }}>
                <div className="subscription-plan--container">
                    <div>
                        <h3>Free Plan</h3>
                        <ul>
                            <li>Visualize data</li>
                            <li>Search for new companies</li>
                            <li>Track Markets, Indexes, Exchanges, Stocks, and more...</li>

                        </ul>
                    </div>
                    <div className='subscription-price'>
                        <span>We got you covered!</span>
                        <h2>Free</h2>
                    </div>
                    <button disabled className="subscription-button-free subscription-button">Included</button>
                </div>
            </YellowContainer>
            <BlueContainer style={{ width: '60%' }}>
                <div className="subscription-plan--container">
                    <div>
                        <h3>Essential Plan</h3>
                        <ul>
                            <li>All Free Features and ....</li>
                            <li>Create your Portfolio</li>
                            <li>Keep Tracks and compare values</li>
                            <li>Download PDF Reports (up to 10/Week)</li>
                        </ul>
                    </div>
                    <div className='subscription-price'>
                        <span>Start your journey for...</span>
                        <h2>$ 5.99 / month</h2>
                    </div>
                    <button className="subscription-button-essential subscription-button" onClick={() => handleClick('Essential')}>Upgrade</button>
                </div>
            </BlueContainer>
            <PurpleContainer style={{ width: '60%' }}>
                <div className="subscription-plan--container">
                    <div>
                        <h3>Business Plan</h3>
                        <ul>
                            <li>All Free and Essential Features and ...</li>
                            <li>Our <strong>BEST DEAL</strong>:
                                <ul>
                                    <li>Crypto Wallet</li>
                                    <li>Set up mobile, mail and sms notifications</li>
                                    <li>Unlimited XLSX, PDF, and other formats reports</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className='subscription-price'>
                        <span>Be your better version for...</span>
                        <h2>$ 9.99 / month</h2>
                    </div>
                    <button className="subscription-button-business subscription-button" onClick={() => handleClick('Bussines')}>Upgrade</button>
                </div>
            </PurpleContainer>
        </animated.div>

    </>)
}