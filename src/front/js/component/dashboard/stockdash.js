import React from "react";
import {useState, useEffect, useContext} from "react"; 
import { Context } from '../../store/appContext.js'
import { BlueContainer } from "../color_containers/blue_container";
import { GreenContainer } from "../color_containers/green_container";
import { PinkContainer } from "../color_containers/pink_container";
import { YellowContainer } from "../color_containers/yellow_container";
import { PurpleContainer } from "../color_containers/purple_container";
import "../../../styles/dashboard.sass"
import { Doughnut } from "./doughnut_chart";
import { useSpring, animated } from '@react-spring/web'
import { Spinner } from "../spinner"
import { TopBarTitle } from "../topBarTitle.js";
import { Table } from "./table.js";
import { MyDocument } from "./pdf.js";
import { PDFViewer } from '@react-pdf/renderer';
import { useAuth0 } from "@auth0/auth0-react";

export const Stockdash = () => {

    const springs = useSpring({
        from: { opacity: 0, y: -5 },
        to: [{ opacity: 1, y: 0 }],
        config: {
            mass: 5,
            friction: 35,
            tension: 120,
        },
    })

    return (<>

<animated.div
                style={{
                    ...springs,
                }}
                className="d-flex flex-column gap-5 navbar-margin"
            >
                <div className="d-flex flex-row justify-content-between flex-wrap gap-2 p-4 pt-0" style={{ width: '100%' }}>
                    <PurpleContainer >
                        <div className="text-light d-flex flex-row gap-2 justify-content-center align-items-center">
                            <img src='https://restyler.s3.ap-southeast-2.amazonaws.com/user-data/user-46/artworks/product-79/preview/thumbnails/5MPgTBYjDfQKQP7gMsmbzC8lmELrSQWwHILNnnfr-watermarked-lg-resized.gif' alt="" style={{ height: '150px', filter: 'hue-rotate(100deg)' }} />
                            <div>
                                <h1>FF. Never Forfait.</h1>
                                <h5>Go to the Moon</h5>
                                <h2>Let your Finance Flow</h2>
                                <h5>And come back as NEW man</h5>
                            </div>
                        </div>
                    </PurpleContainer>
                    <BlueContainer>
                        <Doughnut />
                    </BlueContainer>
                    <div className="d-flex flex-column gap-5 justify-content-between align-items-center p-4 " style={{ height: 700, width: '100%' }}>
                        <Table />
                        <PDFViewer>
                            <MyDocument />
                        </PDFViewer>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center p-4">
                        <PurpleContainer>
                            <div style={{ width: '90%' }}>
                                <h4>Prueba de texto componente largo</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nunc lectus,
                                    elementum sed magna et, malesuada condimentum quam. Nam posuere dolor et enim
                                    blandit lobortis. Donec cursus felis ac lectus hendrerit malesuada et imperdiet
                                    mi. Aenean fringilla suscipit nisl et ultricies. Nam quis nisi sollicitudin,
                                    imperdiet ante vel, elementum elit. Donec aliquam quam nec aliquam pellentesque.
                                    Nunc ac ligula semper felis mollis vestibulum et at sapien.
                                </p>
                            </div>
                        </PurpleContainer>
                        <YellowContainer>
                            <div style={{ width: '90%' }}>
                                <h4>Prueba de texto componente largo</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nunc lectus, 
                                    elementum sed magna et, malesuada condimentum quam. Nam posuere dolor et enim
                                    blandit lobortis. Donec cursus felis ac lectus hendrerit malesuada et imperdiet
                                    mi. Aenean fringilla suscipit nisl et ultricies. Nam quis nisi sollicitudin,
                                    imperdiet ante vel, elementum elit. Donec aliquam quam nec aliquam
                                    pellentesque. Nunc ac ligula semper felis mollis vestibulum et at sapien.
                                </p>
                            </div>
                        </YellowContainer>
                    </div>
                </div>
            </animated.div>
    
    </>)
}


