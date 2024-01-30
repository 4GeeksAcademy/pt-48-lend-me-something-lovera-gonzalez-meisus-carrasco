import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import '../../styles/shared.sass'
import { useSpring, animated } from '@react-spring/web'
import { TopBarTitle } from "../component/topBarTitle.js";
import { BlueContainer } from "../component/color_containers/blue_container";
import { GreenContainer } from "../component/color_containers/green_container";
import { PinkContainer } from "../component/color_containers/pink_container";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import plus from '../../../../public/plus.svg'
import { Doughnut } from "../component/dashboard/doughnut_chart.js";
import { Linear } from "../component/dashboard/linear_chart.js";
import { useAuth0 } from "@auth0/auth0-react";
import geeks from '../../../../public/4geeks.ico'


export const Home = () => {
	const { store, actions } = useContext(Context);
	const { isAuthenticated, user } = useAuth0();

	const springs = useSpring({
		from: { opacity: 0 },
		to: [{ opacity: 1 }],
		config: {
			duration: 1500
		},
	})

	return (<>
		<TopBarTitle topTitle='Welcome' />
		<div className="text-center navbar-margin">
			<animated.div
				style={{
					...springs,
				}}
				className="d-flex flex-row justify-content-around align-items-center flex-wrap gap-4"
			>
				{/* <YellowContainer style={{ flexBasis: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<i className="fa-solid fa-triangle-exclamation" style={{ color: '#ffd155', fontSize: '4em' }}></i>
				<div>Work in Progress</div>
				<i className="fa-solid fa-triangle-exclamation" style={{ color: '#ffd155', fontSize: '4em' }}></i>
			</YellowContainer> */}
				<PurpleContainer className="d-flex flex-row justify-content-around align-items-center flex-wrap gap-5 p-4 pt-0" style={{ width: '50%', flexBasis: '80%' }}>
					<div className="text-light d-flex flex-row gap-2 justify-content-center align-items-center" >
						<img src={geeks} alt="" style={{ height: '150px'}} />
						<div>
							<h1>FF. Never Forfait.</h1>
							<h5>Go to the Moon</h5>
							<h2>Let your Finance Flow</h2>
							<h5>And come back as NEW one</h5>
							{/* <img src={plus} alt="SVG PLUS" /> */}
						</div>

					</div>

				</PurpleContainer>
				<div>
					<h5>Find a better way to stay informed</h5>
					<BlueContainer>
						<Doughnut title={'Top 10 Nasdaq Stocks'} />
					</BlueContainer>
				</div>
				<div>
					<h5>Lines, Candles and much more...</h5>
					<GreenContainer>
						<Linear title={'APPL Last 3 months'} color={'green'} />
					</GreenContainer>
				</div>

				<div className="d-flex flex-row justify-content-between align-items-center p-4">
					<PinkContainer>
						<div style={{ width: '90%' }}>
							<h4>Trust</h4>
							<p>FlowFinance team provides you with total trust to manage your assets. We invite you to try it out and we asure you'd not be disappointed.
							</p>
						</div>
					</PinkContainer>
					<YellowContainer>
						<div style={{ width: '90%' }}>
							<h4>Dynamism</h4>
							<p>Find new ways to checkout information, in a single place.
							</p>
						</div>
					</YellowContainer>
				</div>
			</animated.div>
		</div >
	</>
	);
};
