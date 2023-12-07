import React from "react";
import "../../../styles/color_containers/pink_container.sass"

export const PinkContainer = (props) => {

    return (<>
        <div className="pink__container" style={props.style}>
            {/* <h1>Pink Container</h1> */}
            {props.children}
        </div>
    </>)
}