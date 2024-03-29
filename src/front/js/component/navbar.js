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


			<div className=" d-flex flex-column align-items-center gap-5 navbar-collapsed">

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

					<Link to={"/"}><i className="fa-solid fa-house-laptop" title="Home"></i></Link>
					{isAuthenticated && <>
						<Link to={"/dashboard"}><i className="fa-solid fa-swatchbook" title="Dashboard"></i></Link>
						<Link to={"/portfolio"}><i className="fa-solid fa-briefcase" title="Portfolio"></i></Link></>}
					<Link to={"/discover"}><i className="fa-solid fa-book-open" title="Discover"></i></Link>
					{isAuthenticated && <Link to={"/login"}><i className="fa-solid fa-user" title="Profile" ></i></Link>}
					<Link to={"/subscription"}><i className="fa-solid fa-gear" title="Subscription" ></i></Link>
					{/* {isAuthenticated && <Link to={"/notifications"}><i className="fa-solid fa-bell" title="Notifications" ></i></Link>} */}
					<Link to={"/aboutus"}><i className="fa-solid fa-users" title="About Us" ></i></Link>
				</div>
			</div>
			{isAuthenticated && <LogoffButton style={{ height: '50px', width: '50px', borderRadius: '25px', padding: 0 }} />}


		</animated.div >


		<div className="offcanvas offcanvas-start text-bg-dark bg-dark navbarcustom d-flex flex-column justify-content-between vh-100" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
			<div className="offcanvas-header">
				<h5 className="offcanvas-title text-light" id="offcanvasDarkNavbarLabel">Options</h5>
				<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body ">

				<div className="navbar-offcanvas-icons">

					<Link className="navbar-link" to={"/"}><i className="fa-solid fa-house-laptop" ></i>Home</Link>
					{isAuthenticated && <>
						<Link className="navbar-link" to={"/dashboard"}><i className="fa-solid fa-swatchbook" ></i>Dashboard</Link>
						<Link className="navbar-link" to={"/portfolio"}><i className="fa-solid fa-briefcase" ></i>Portfolio</Link></>}

					<Link className="navbar-link" to={"/discover"}><i className="fa-solid fa-book-open"></i>Discover</Link>
					{isAuthenticated && <Link className="navbar-link" to={"/login"}><i className="fa-solid fa-user" ></i>Profile</Link>}
					<Link className="navbar-link" to={"/subscription"}><i className="fa-solid fa-gear" ></i>Settings</Link>
					{/* {isAuthenticated && <Link className="navbar-link" to={"/notifications"}><i className="fa-solid fa-bell" ></i>Notifications</Link>} */}

					<Link className="navbar-link" to={"/aboutus"}><i className="fa-solid fa-users" ></i>About Us</Link>

				</div>
				<div className="d-flex mb-4 justify-content-center">
					{isAuthenticated && <LogoffButton style={{ height: '50px', width: '50px', borderRadius: '25px', padding: 0 }} />}
				</div>
			</div>
		</div>




	</>);
};
