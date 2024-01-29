import React, { useEffect, useContext } from "react";
import { Context } from "../js/store/appContext"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Auth0ProviderWithNavigate } from './component/Auth0/auth0-provider-with-navigate'
import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/aboutus";
import { Dashboard } from "./pages/dashboard";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import '../styles/layout.sass'
import { TopBar } from "./component/top_searchbar";
import { CancelSubscription, Subscription } from '../js/pages/subscription-settings'
import { Notifications } from '../js/pages/notifications'
import { Discover } from "./pages/discover";
import Spinner from "./component/spinner";
import { Checkout } from "./component/dashboard/checkout";
import { CheckoutForm } from "./pages/stripe";
import { Return } from "./pages/stripe";
import { Portfolio } from "./pages/portfolio";
import { AuthenticationGuard } from "./component/Auth0/protected-route";
import { Background } from "./pages/background";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const { store, actions } = useContext(Context);


    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;


    // if (isLoading) return (<><Spinner/></>)

    useEffect(() => {


        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === ' ') {
                event.preventDefault();
                actions.switchSearchState();
            };
            if (event.metaKey && event.key === ' ') {
                event.preventDefault();
                actions.switchSearchState();
            };
            if (event.key === 'Escape' && store.searchState) {
                actions.switchSearchState();
                event.preventDefault();
            }

        });

        document.addEventListener('click', (event) => {
            if (event.target.id != 'collapsable' && store.collapsableState === true) {
                actions.switchVisible();
                event.preventDefault();
            }
        });

        document.addEventListener('mousemove', (e) => {
            document.querySelectorAll('.background--icon').forEach(icon => {
                const speed = icon.getAttribute('data-speed');
                const x = (window.innerWidth - e.pageX*speed)/100
                const y = (window.innerHeight - e.pageY*speed)/100

                icon.style.transform = `translateX(${x}px) translateY(${y}px)`
            } )


        })

    }, [])





    return (
        <div className="body">
            <BrowserRouter basename={basename}>
                <Auth0ProviderWithNavigate>
                    <ScrollToTop>
                        <Background/>
                        <TopBar />
                        <Navbar />
                        <Routes >
                            <Route element={<Home />} path="/" />
                            <Route element={<Login />} path="/login" />
                            <Route element={<AboutUs />} path="/aboutus" />
                            <Route element={<AuthenticationGuard component={Dashboard} />} path="/dashboard" />
                            <Route element={<Discover />} path="/discover" />
                            <Route element={<Subscription />} path="/subscription" />
                            {/* <Route element={<AuthenticationGuard component={Notifications} />} path="/notifications" /> */}
                            <Route element={<Checkout />} path="/checkout" />
                            <Route element={<CheckoutForm />} path="/checkout-form/:product_id" />
                            <Route element={<Return />} path="/return/:session_id" />
                            <Route element={<Single />} path="/single/:symbol" />
                            <Route element={<AuthenticationGuard component={Portfolio} />} path="/portfolio" />
                            <Route element={<CancelSubscription />} path="/cancel" />
                            <Route element={<Home />} path='*' />
                        </Routes >
                        <Footer />
                    </ScrollToTop>
                </Auth0ProviderWithNavigate>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
