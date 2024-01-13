import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import '../../styles/shared.sass'
import { useSpring, animated } from '@react-spring/web'
import { TopBarTitle } from "../component/topBarTitle.js";
import { PurpleContainer } from '../component/color_containers/purple_container.js'


export const Home = () => {
	const { store, actions } = useContext(Context);

	const springs = useSpring({
		from: { opacity: 0 },
		to: [{ opacity: 1 }],
		config: {
			duration: 1500
		},
	})

	return (<>
		<TopBarTitle topTitle='Home' />
		<div className="text-center navbar-margin">
			<animated.div
				style={{
					...springs,
				}}
			>
				<PurpleContainer style={{ width: '25%', flex: '1 0 auto' }}>
					<div className="text-light d-flex flex-row gap-2 justify-content-center align-items-center" style={{width: '85vw'}}>
						<img src='https://restyler.s3.ap-southeast-2.amazonaws.com/user-data/user-46/artworks/product-79/preview/thumbnails/5MPgTBYjDfQKQP7gMsmbzC8lmELrSQWwHILNnnfr-watermarked-lg-resized.gif' alt="" style={{ height: '150px', filter: 'hue-rotate(100deg)' }} />
						<div>
							<h1>FF. Never Forfait.</h1>
							<h5>Go to the Moon</h5>
							<h2>Let your Finance Flow</h2>
							<h5>And come back as NEW man</h5>
						</div>

					</div>

				</PurpleContainer>
			</animated.div>
		</div>
	</>
	);
};
