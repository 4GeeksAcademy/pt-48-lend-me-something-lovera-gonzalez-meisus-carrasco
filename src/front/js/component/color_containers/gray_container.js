import React from "react";
import "../../../styles/color_containers/gray_container.sass"

export const GrayContainer = (props) => {

    return (<>
        <div className="gray__container" style={{...props.style}}>
            {/* <p>Blue Container</p> */}
            {props.children}
        </div>
    </>)
}