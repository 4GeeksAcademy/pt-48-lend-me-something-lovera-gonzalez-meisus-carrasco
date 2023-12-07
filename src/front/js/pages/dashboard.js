import React, { useContext } from "react";
import { BlueContainer } from "../component/color_containers/blue_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { PinkContainer } from "../component/color_containers/pink_container";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { TestComponent } from "../component/test";

export const Dashboard = () => {
    return (<>
        <div className="d-flex flex-row gap-5 m-5 flex-wrap">
            {/* <h1>Dashboard</h1> */}
            <PinkContainer >
                <TestComponent />
            </PinkContainer>
            <BlueContainer>
                <TestComponent />
            </BlueContainer>
            <GreenContainer>
                <p>Hola, soy Adrian</p>
                <TestComponent />
            </GreenContainer>
            <YellowContainer>
                <TestComponent />
            </YellowContainer>
        </div>
    </>)
}