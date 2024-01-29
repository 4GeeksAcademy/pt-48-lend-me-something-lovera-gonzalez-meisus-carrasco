import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../store/appContext';
import { PurpleContainer } from '../component/color_containers/purple_container'
import { BlueContainer } from '../component/color_containers/blue_container'
import { YellowContainer } from '../component/color_containers/yellow_container'
import { TopBarTitle } from '../component/topBarTitle'
import { useNavigate } from "react-router-dom";

import { useSpring, animated } from '@react-spring/web'
import '../../styles/subscription.sass'
import { useAuth0, PopupTimeoutError } from '@auth0/auth0-react';
import { GrayContainer } from '../component/color_containers/gray_container';

export const Subscription = () => {

    const { isAuthenticated, loginWithPopup, error } = useAuth0()

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
            'level': 'Business',
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
    });
    const cancelUserSubscription = async () => {
        const response = await actions.cancelSubscription();
        // console.log(await response)
        if (response.cancel_at_period_end === true) {
            navigate('/cancel')
        }

    }

    const handleClick = async (string) => {

        if (isAuthenticated && store.user.subscription_level != string) {
            const [subscriptionToSetTo] = subscriptionPlans.filter(level => level.level == string);
            actions.setSubscription(subscriptionToSetTo);
            navigate('/checkout');
        }

        if (!isAuthenticated) {
            try {
                await loginWithPopup();
            } catch { error }
            if (error instanceof PopupTimeoutError) {
                // custom logic to inform user to retry
                error.popup.close();
            }

        }
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
                        </ul>
                    </div>
                    <div className='subscription-price'>
                        <span>Start your journey for...</span>
                        <h2>$ 5.99 / month</h2>
                    </div>
                    <button  className="subscription-button-essential subscription-button" onClick={() => handleClick('Essential')}>{store.user.subscription_level === 'Essential' ? 'Current' : store.user.subscription_level === 'Business' ? 'Included' : 'Upgrade'}</button>
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
                                    {/* <li>Crypto Wallet</li>
                                    <li>Set up mobile, mail and sms notifications</li> */}
                                    <li>Unlimited XLSX & PDF reports</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className='subscription-price'>
                        <span>Be your better version for...</span>
                        <h2>$ 9.99 / month</h2>
                    </div>
                    <button className="subscription-button-business subscription-button" onClick={() => handleClick('Business')}>{store.user.subscription_level === 'Business' ? 'Current' : 'Upgrade'}</button>
                </div>
            </PurpleContainer>
            {isAuthenticated && <GrayContainer style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%', marginTop: '15em' }}>
                <p>Did you change your mind? You can cancel your subscription anytime...</p>
                <button className="light-gray--button" onClick={cancelUserSubscription}>Unsubscribe</button>
            </GrayContainer>}
        </animated.div>

    </>)
}


export const CancelSubscription = () => {
    const navigate = useNavigate()


    return (
        <section id="success" className="navbar-margin d-flex flex-row justify-content-center align-items-center">
            <GrayContainer style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '2em' }}>
                <p>
                    Thanks for your subscription! Sorry to see you leaving.
                    Your subscription will not be renewed at the end of this current month.
                    If you have any questions, please email <a style={{ color: '#15bd9b' }} href="mailto:flowfinance.dev@gmail.com">flowfinance.dev@gmail.com</a>.
                </p>
                <button className="green--button" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            </GrayContainer>
        </section>
    )
}