import React, { useContext, useEffect } from "react";
import {Context} from '../store/appContext.js'

export const TopBarTitle = ({topTitle}) => {

    const {actions} = useContext(Context)  
    useEffect(() => {
        const title = topTitle ? topTitle : "";
        actions.setTitle(title)
    }, [])

    return (<>

        </>)
}



