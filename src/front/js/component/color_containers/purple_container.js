import React from "react";
import "../../../styles/color_containers/purple_container.sass"

export const PurpleContainer = (props) => {

    return (<>
        <div className="purple__container">
            {/* <p>Blue Container</p> */}
            {props.children}
        </div>
    </>)
}