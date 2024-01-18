import React from "react";
import "../../../styles/color_containers/green_container.sass"

export const GreenContainer = (props) => {

    return (<>
        <div className="green__container " style={{...props.style}}>
            {/* <p>Green Container</p> */}
            
            {props.children}
        </div>
    </>)
}