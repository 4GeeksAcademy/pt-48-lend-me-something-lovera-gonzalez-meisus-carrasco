import React from "react";
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
import { Subscription } from '../js/pages/subscription-settings'
import { Notifications } from '../js/pages/notifications'
import { Discover } from "./pages/discover";
import Spinner from "./component/spinner";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    const { isAuthenticated, isLoading } = useAuth0();
    
    // if (isLoading) return (<><Spinner/></>)
    return (
        <div className="body">
            <BrowserRouter basename={basename}>
                <Auth0ProviderWithNavigate>
                    <ScrollToTop>
                        <TopBar />
                        <Navbar />
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Login />} path="/login" />
                            <Route element={<AboutUs />} path="/aboutus" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<Discover />} path="/discover" />
                            <Route element={<Subscription />} path="/subscription" />
                            <Route element={<Notifications />} path="/notifications" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:symbol" />
                            <Route element={<Home />} path='*' />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </Auth0ProviderWithNavigate>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
