import React from "react";
import "../../../styles/color_containers/yellow_container.sass"

export const YellowContainer = (props) => {

    return (<>
        <div className="yellow__container">
            {/* <p>Yellow Container</p> */}
            {props.children}
        </div>
    </>)
}