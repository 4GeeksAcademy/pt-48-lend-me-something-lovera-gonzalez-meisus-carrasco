import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/">
					<span className=" text-light navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-success">Login</button>
					</Link>
					<Link to="/dashboard">
						<button className="btn btn-warning">Dashboard</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
