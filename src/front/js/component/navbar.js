import React from "react";
import { Link } from "react-router-dom";
import '../../styles/navbar.sass'

export const Navbar = () => {
	return (<>
		<div className="d-flex flex-column align-items-center navbar-background vh-100  fixed-top rounded-2" style={{ "width": "6em" }}>


			<button className=" btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
				<i className="fa-solid fa-bars" style={{ "color": "#f0f2f4" }}></i>
			</button>
			<Link to={"/dashboard"}><i className="fa-solid fa-swatchbook" style={{ "color": "#f0f2f4" }}></i></Link>
			<Link to={"/"}><i className="fa-solid fa-house-laptop" style={{ "color": "#f0f2f4" }}></i></Link>
			<Link to={"/login"}><i className="fa-solid fa-user" style={{ "color": "#f0f2f4" }}></i></Link>
		</div>
		<div className="offcanvas offcanvas-start navbar-background" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
			<div className="offcanvas-header">
				<h5 className="offcanvas-title text-light" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
				<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body navbar-background">
				<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
					<li >
					<Link className="navbar-link" to={"/dashboard"}><i className="fa-solid fa-swatchbook" style={{ "color": "#f0f2f4" }}></i>Dashboard</Link>

					</li>
					<li >
					<Link className="navbar-link" to={"/"}><i className="fa-solid fa-house-laptop" style={{ "color": "#f0f2f4" }}></i>Home</Link>
	
					</li>
					<li >
					<Link className="navbar-link" to={"/login"}><i className="fa-solid fa-user" style={{ "color": "#f0f2f4" }}></i>Login</Link>

					</li>
					
				</ul>
				<form className="d-flex mt-3" role="search">
					<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-success" type="submit">Search</button>
				</form>
			</div>
		</div>




	</>);
};
