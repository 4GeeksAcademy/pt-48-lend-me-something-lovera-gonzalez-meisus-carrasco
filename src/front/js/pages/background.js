import React from 'react'
import '../../styles/background.sass'


export const Background = (props) => {

    const randomSize = () => {
        return `${Math.floor(Math.random() * 5)}em`
    }

    const randomColor = () => {
        return Math.random() > 0.5 ? '#40404F' : '#373743'
    }

    const randomX = () => {
        return `${Math.random() * 100}%`

    }
    const randomY = () => {
        return `${Math.random() * 100}%`
    }

    const randomDataSpeed = () => {
        return `${Math.floor(Math.random()*5)+1}`
    }




    return (<>

        <div className='background--container'>
            <section className='background--section'>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-percent"  style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-percent"  style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-percent"  style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-percent"  style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-chart-line"  style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-chart-line"  style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-chart-line"  style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-chart-line"  style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-sterling-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-sterling-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-sterling-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-sterling-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-yen-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-yen-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-yen-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-yen-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-dollar-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-dollar-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-dollar-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-dollar-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-euro-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-euro-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-euro-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-euro-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-coins" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-bitcoin-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-bitcoin-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-bitcoin-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-bitcoin-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
                <i data-speed={randomDataSpeed()} className="background--icon fa-solid fa-bitcoin-sign" style={{
                    color: randomColor(),
                    fontSize: randomSize(),
                    top: randomY(),
                    left: randomX(),
                }}></i>
            </section>

        </div>


    </>)
}