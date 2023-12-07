import React, { useContext } from "react";
import { BlueContainer } from "../component/color_containers/blue_container";
import { GreenContainer } from "../component/color_containers/green_container";

export const Dashboard = () => {
    return (<>
        <div className="d-flex flex-row gap-5 m-5">
            {/* <h1>Dashboard</h1> */}
            <BlueContainer />
            <GreenContainer />
        </div>
    </>)
}