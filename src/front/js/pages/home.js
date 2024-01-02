import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import '../../styles/shared.sass'
import { useSpring, animated } from '@react-spring/web'

export const Home = () => {
	const { store, actions } = useContext(Context);

	const springs = useSpring({
		from: { opacity: 0 },
		to: [{ opacity: 1 }],
		config: {
			duration: 1500
		},
	})

	return (
		<div className="text-center navbar-margin">
			<animated.div
				style={{
					...springs,
				}}
			>
				<h1>Hello Rigo!!</h1>
				
				<div className="alert alert-info">
					{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				</div>
				<p>
					This boilerplate comes with lots of documentation:{" "}
					<a href="https://start.4geeksacademy.com/starters/react-flask">
						Read documentation
					</a>
				</p>
			</animated.div>
		</div>
	);
};
