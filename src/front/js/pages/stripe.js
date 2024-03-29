import React, { useState, useEffect, useContext } from "react";
import { Context } from '../store/appContext'
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
    Navigate,
    useParams,
    useNavigate
} from "react-router-dom";
import { GreenContainer } from "../component/color_containers/green_container";
import '../../styles/shared.sass'
import { useAuth0 } from "@auth0/auth0-react";


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe("pk_test_51Oc1gPEUv4sos4iTc5GYI5HJUEnlAYMHj9GShBrzUwbDS7vlQKAP0WQjxbzB3auJwo9DC99dPsRJn9eHuQumZMaP00dflWX8nt");

export const CheckoutForm = () => {
    const { product_id } = useParams()
    const { store, actions } = useContext(Context)
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create a Checkout Session as soon as the page loads
        actions.storePriceId(product_id)
        fetch(`${process.env.BACKEND_URL}/create-checkout-session`, {
            method: "POST",
            body: JSON.stringify({ product_id: product_id }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    return (
        <div id="checkout" className="navbar-margin">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    )
}

export const Return = () => {
    const { session_id } = useParams()
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const navigate = useNavigate()
    const [timeRedirection, setTimeRedirection] = useState(30);
    const { user } = useAuth0()

    const { store, actions } = useContext(Context)



    useEffect(() => {

        const sessionId = session_id

        fetch(`${process.env.BACKEND_URL}/session-status/${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
                // console.log(data)

            });

        const timer = setInterval(() => {
            setTimeRedirection(prev => prev - 1);
        }, 1000)

        const timeout = setTimeout(() => {
            navigate('/dashboard')
            clearInterval(timer)
        }, 30000);

        return (() => {
            clearInterval(timer);
            clearTimeout(timeout);

        })
    }, []);

        useEffect(() => {
            const sessionId = session_id

            if (user) {
                actions.setUser(user);
                // console.log(store.user.subscription_id)
                // console.log('SETEANDO SUSCRIPCION')
                fetch(`${process.env.BACKEND_URL}/session-status/${sessionId}`)
                    .then((res) => res.json())
                    .then((data) => { actions.setUserSubscriptionLevel(data.amount,user, data.subscription_stripe) });
            }
    }, [user]);

    if (status === 'open') {
        return (
            <Navigate to={`/checkout-form/${store.priceId}`} />
        )
    }


    if (status === 'complete') {


        return (

            <section id="success" className="navbar-margin d-flex flex-row justify-content-center align-items-center">
                <GreenContainer style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '2em' }}>
                    <p>
                        Thanks for your subscription! A confirmation email will be sent to {customerEmail}.

                        If you have any questions, please email <a style={{ color: '#15bd9b' }} href="mailto:flowfinance.dev@gmail.com">flowfinance.dev@gmail.com</a>.
                    </p>
                    <button className="green--button" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
                    <small style={{ marginTop: '1em' }}>You'll be redirected to Dashboard in {timeRedirection} seconds</small>
                </GreenContainer>
            </section>
        )
    }

    return null;
}
