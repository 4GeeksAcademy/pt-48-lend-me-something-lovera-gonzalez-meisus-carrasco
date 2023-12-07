import React, { useContext } from "react";
import { BlueContainer } from "../component/color_containers/blue_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { PinkContainer } from "../component/color_containers/pink_container";
import { YellowContainer } from "../component/color_containers/yellow_container";

export const Dashboard = () => {
    return (<>
        <div className="d-flex flex-row gap-5 m-5">
            {/* <h1>Dashboard</h1> */}
            <PinkContainer>
                <h1>Hello my friend</h1>
                <p>Sed posuere ultricies vulputate. Duis suscipit fermentum mi quis malesuada. Suspendisse at eleifend nisi. Duis efficitur semper est, vel semper ex placerat eget. Maecenas rhoncus orci quis est malesuada fermentum. Nullam est massa, blandit et dui quis, bibendum hendrerit ante. Nulla purus nibh, viverra in dictum sit amet, pulvinar sed tortor.
                </p>
            </PinkContainer>
            <BlueContainer />
            <GreenContainer />
            <YellowContainer />
        </div>
    </>)
}