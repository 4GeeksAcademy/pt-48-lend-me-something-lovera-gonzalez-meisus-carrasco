import React, { useContext } from "react";
import { BlueContainer } from "../component/color_containers/blue_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { PinkContainer } from "../component/color_containers/pink_container";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { TestComponent } from "../component/test";
import { TopBar } from "../component/top_searchbar";
import "../../styles/dashboard.sass"

export const Dashboard = () => {
    return (<>
        <div className="d-flex flex-column gap-5 navbar-margin">
            <TopBar />
            <div className="d-flex flex-row justify-content-between flex-wrap gap-5 p-4 pt-0" style={{ width: '100%' }}>
                <PinkContainer >
                    <TestComponent />
                </PinkContainer>
                <BlueContainer>
                    <TestComponent />
                </BlueContainer>
                <GreenContainer>
                    <TestComponent />
                </GreenContainer>
                <YellowContainer>
                    <TestComponent />
                </YellowContainer>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center p-4">
                <BlueContainer>
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
                </BlueContainer>
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