import React, { useContext } from "react";
import { BlueContainer } from "../component/color_containers/blue_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { PinkContainer } from "../component/color_containers/pink_container";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import { TestComponent } from "../component/test";
import { TopBar } from "../component/top_searchbar";
import "../../styles/dashboard.sass"
import { Doughnut } from "../component/dashboard/doughnut_chart";

export const Dashboard = () => {
    return (<>
        <div className="d-flex flex-column gap-5 navbar-margin">
            <TopBar />
            <div className="d-flex flex-row justify-content-between flex-wrap gap-2 p-4 pt-0" style={{ width: '100%' }}>
                <PurpleContainer style={{ width: '25%', flex: '1 0 auto' }}>
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
                <BlueContainer style={{ width: '25%', flex: '1 0 auto' }}>
                    <Doughnut />
                </BlueContainer>
                <PinkContainer style={{ width: '25%', flex: '1 0 auto' }} >
                    <TestComponent />
                </PinkContainer>
                <GreenContainer style={{ width: '25%', flex: '1 0 auto' }}>
                    <TestComponent />
                </GreenContainer>
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nunc lectus, elementum sed magna et, malesuada condimentum quam. Nam posuere dolor et enim blandit lobortis. Donec cursus felis ac lectus hendrerit malesuada et imperdiet mi. Aenean fringilla suscipit nisl et ultricies. Nam quis nisi sollicitudin, imperdiet ante vel, elementum elit. Donec aliquam quam nec aliquam pellentesque. Nunc ac ligula semper felis mollis vestibulum et at sapien.

                        </p>
                    </div>
                </YellowContainer>
            </div>
        </div>
    </>)
}