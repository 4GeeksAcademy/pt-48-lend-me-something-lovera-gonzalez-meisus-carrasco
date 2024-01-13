import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import '../../styles/shared.sass'
import { useSpring, animated } from '@react-spring/web'
import { TopBarTitle } from "../component/topBarTitle.js";


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
				<h1>Welcome to FlowFinance</h1>
			</animated.div>
		</div>
	</>
	);
};
