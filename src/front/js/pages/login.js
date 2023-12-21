import React, { useContext } from "react";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container"
import '../../styles/login.sass'

export const Login = () => {
    return (<>
        <div className="navbar-margin">
            <h1>Login Page</h1>
            <YellowContainer>
                <h1>este sera el componente de login</h1>
            </YellowContainer>
            <PurpleContainer>
                <input type="text" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="Password" />
                <button>Login</button>
                <p>Register</p>
            </PurpleContainer>
        </div>
    </>)
} 