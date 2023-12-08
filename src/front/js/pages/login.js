import React, { useContext } from "react";
import { YellowContainer } from "../component/color_containers/yellow_container";
import '../../styles/login.sass'

export const Login = () => {
    return (<>
        <div className="navbar-margin">
            <h1>Login Page</h1>
            <YellowContainer>
                <h1>este sera el componente de login</h1>
            </YellowContainer>
        </div>
    </>)
} 