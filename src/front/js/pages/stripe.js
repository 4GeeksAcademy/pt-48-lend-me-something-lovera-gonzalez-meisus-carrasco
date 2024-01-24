import React, { useState, useEffect } from "react";
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
import { BlueContainer } from "../component/color_containers/blue_container";
import '../../styles/shared.sass'


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe("pk_test_51Oc1gPEUv4sos4iTc5GYI5HJUEnlAYMHj9GShBrzUwbDS7vlQKAP0WQjxbzB3auJwo9DC99dPsRJn9eHuQumZMaP00dflWX8nt");

export const CheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState('');
    const { product_id } = useParams()

    useEffect(() => {
        // Create a Checkout Session as soon as the page loads
        console.log(product_id)
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
    const [timeRedirection, setTimeRedirection] =useState(30)

    useEffect(() => {

        const sessionId = session_id
        console.log('fetching')

        fetch(`${process.env.BACKEND_URL}/session-status/${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
            
        const timer = setInterval(()=> {
            setTimeRedirection(prev => prev -1)
        }, 30000)

        setTimeout(()=> {
            navigate('/dashboard')
            clearInterval(timer)
        }, 5000);

        return (() => {
            clearInterval(timer)
        })
    }, []);

    if (status === 'open') {
        return (
            <Navigate to="/checkout-form" />
        )
    }

    if (status === 'complete') {
        return (

            <section id="success" className="navbar-margin d-flex flex-row justify-content-center align-items-center">
                <BlueContainer style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <p>
                   Thanks for your subscription! A confirmation email will be sent to {customerEmail}.

                    If you have any questions, please email <a href="mailto:flowfinance.dev@gmail.com">flowfinance.dev@gmail.com</a>.
                </p>
                <button className="blue--button" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
                <small>You'll be redirected to Dashboard in {timeRedirection} seconds</small>
                </BlueContainer>
            </section>
        )
    }

    return null;
}
