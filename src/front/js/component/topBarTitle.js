import React, { useContext, useEffect } from "react";
import { Context } from '../store/appContext.js'

export const TopBarTitle = ({ topTitle }) => {

    const { actions } = useContext(Context)


    useEffect(() => {

        setTimeout(() => {
            const title = topTitle ? topTitle : "";
            actions.setTitle(title)

        }, 500)
    }, [])


    return (<>

    </>)
}



