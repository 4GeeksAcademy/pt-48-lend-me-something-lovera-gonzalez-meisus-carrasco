import React from "react";
import "../../../styles/color_containers/yellow_container.sass"

export const YellowContainer = (props) => {

    return (<>
        <div className="yellow__container" style={{...props.style}}>
            {/* <p>Yellow Container</p> */}
            {props.children}
        </div>
    </>)
}