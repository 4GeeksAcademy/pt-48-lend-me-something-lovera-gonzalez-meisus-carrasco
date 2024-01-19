import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'

export const Weather = () => {
    const [positionData, setPositionData] = useState()

    if ('geolocation' in navigator) {
        const position = navigator.geolocation.getCurrentPosition((result) => {
            setPositionData(result) ;
            return result;
        }
        )
    }
    const { store, actions } = useContext(Context)

    useEffect(() => {
        if (!store.weather){
        const lat = positionData?.coords.latitude.toString()
        const long = positionData?.coords.longitude.toString()
        actions.getWeatherByCity(store.user?.city)}

    }, [positionData])
    return (<>
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div>City: {store?.weather?.name} </div>
            <div className='d-flex flex-column justify-content-center align-items-start p-5'>
                <span>Temp:</span>
                <p> {Math.round(store?.weather?.main?.temp - 273.15)} ºC </p>
                <span>Feels Like:</span>
                <p>{store?.weather?.main?.feels_like}</p>
                <span>Min:</span>
                <p>{store?.weather?.main?.temp_min}</p>
                <span>Max:</span>
                <p>{store?.weather?.main?.temp_max}</p>
            </div>
        </div>

    </>)
}
