import React from "react";
import "../../../styles/color_containers/blue_container.sass"

export const BlueContainer = (props) => {

    return (<>
        <div className="blue__container">
            {/* <p>Blue Container</p> */}
            {props.children}
        </div>
    </>)
}