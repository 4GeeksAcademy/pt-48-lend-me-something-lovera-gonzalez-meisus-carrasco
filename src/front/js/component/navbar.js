import React from "react";
import { Link } from "react-router-dom";
import '../../styles/navbar.sass';
import { useSpring, animated } from '@react-spring/web';
import { LogoffButton } from '../component/Auth0/logoff_button.js'
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {

	const springs = useSpring({
		from: { opacity: 0, x: -90 },
		to: [{ opacity: 1, x: 0 }],
		config: {
			mass: 10,
			friction: 35,
			tension: 25,
		},
	})

	const { isAuthenticated, user } = useAuth0();
	return (<>
		<animated.div className="d-flex flex-column align-items-center justify-content-between pb-5  bg-dark vh-100  fixed-top rounded-2" style={{ ...springs, "width": "6em" }}>


			<div className=" d-flex flex-column align-items-center justify-content-between gap-5">

				<button
					className="mt-3 btn btn-dark"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasDarkNavbar"
					aria-controls="offcanvasDarkNavbar"
					aria-label="Toggle navigation">
					<i className="fa-solid fa-bars" ></i>
				</button>
				<div className="navbar-icons">

					<Link to={"/"}><i className="fa-solid fa-house-laptop" ></i></Link>
					{isAuthenticated &&
						<Link to={"/dashboard"}><i className="fa-solid fa-swatchbook" ></i></Link>}
					<Link to={"/discover"}><i className="fa-solid fa-book-open" ></i></Link>
					{isAuthenticated && <Link to={"/login"}><i className="fa-solid fa-user" ></i></Link>}
					<Link to={"/subscription"}><i className="fa-solid fa-gear" ></i></Link>
					{isAuthenticated && <Link to={"/notifications"}><i className="fa-solid fa-bell" ></i></Link>}
					<Link to={"/aboutus"}><i className="fa-solid fa-users" ></i></Link>
				</div>
			</div>
			{isAuthenticated && <LogoffButton style={{ height: '3em', width: '3em', borderRadius: '50%', padding: 0 }} />}


		</animated.div >


		<div className="offcanvas offcanvas-start text-bg-dark bg-dark navbarcustom d-flex flex-column justify-content-between vh-100" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
			<div className="offcanvas-header">
				<h5 className="offcanvas-title text-light" id="offcanvasDarkNavbarLabel">Options</h5>
				<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body ">

				<div className="navbar-offcanvas-icons">

					<Link className="navbar-link" to={"/"}><i className="fa-solid fa-house-laptop" ></i>Home</Link>
					{isAuthenticated &&
						<Link className="navbar-link" to={"/dashboard"}><i className="fa-solid fa-swatchbook" ></i>Dashboard</Link>}
					<Link className="navbar-link" to={"/discover"}><i className="fa-solid fa-book-open"></i>Discover</Link>
					{isAuthenticated && <Link className="navbar-link" to={"/login"}><i className="fa-solid fa-user" ></i>Profile</Link>}
					<Link className="navbar-link" to={"/subscription"}><i className="fa-solid fa-gear" ></i>Settings</Link>
					{isAuthenticated && <Link className="navbar-link" to={"/notifications"}><i className="fa-solid fa-bell" ></i>Notifications</Link>}

					<Link className="navbar-link" to={"/aboutus"}><i className="fa-solid fa-users" ></i>About Us</Link>

				</div>

				<form className="d-flex mt-3" role="search">
					<input className=" me-2 offcanvas-input" type="search" placeholder="Search " aria-label="Search" />
					<button className="offcanvas-button" type="submit">
						<i className="fa-solid fa-magnifying-glass " style={{ "color": "#ffffff" }}></i>
					</button>
				</form>
			</div>
		</div>




	</>);
};
