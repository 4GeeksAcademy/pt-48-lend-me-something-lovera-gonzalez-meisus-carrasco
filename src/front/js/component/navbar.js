import React from "react";
import { Link } from "react-router-dom";
import '../../styles/navbar.sass'

export const Navbar = () => {
	return (<>
		<div className="d-flex flex-column align-items-center justify-content-between pb-5  bg-dark vh-100  fixed-top rounded-2" style={{ "width": "6em" }}>


			<div className=" d-flex flex-column align-items-center justify-content-between gap-5">

				<button className=" btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
					<i className="fa-solid fa-bars" ></i>
				</button>
				<div className="navbar-icons">

					<Link to={"/dashboard"}><i className="fa-solid fa-swatchbook" ></i></Link>
					<Link to={"/"}><i className="fa-solid fa-house-laptop" ></i></Link>
					<Link to={"/login"}><i className="fa-solid fa-user" ></i></Link>
					<Link to={"/"}><i className="fa-solid fa-gear" ></i></Link>
					<Link to={"/"}><i className="fa-solid fa-bell" ></i></Link>
				</div>
			</div>
			<img className="navbar-profilepicture" src="https://picsum.photos/id/64/200/200" />


		</div>


		<div className="offcanvas offcanvas-start text-bg-dark bg-dark navbarcustom d-flex flex-column justify-content-between vh-100" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
			<div className="offcanvas-header">
				<h5 className="offcanvas-title text-light" id="offcanvasDarkNavbarLabel">Options</h5>
				<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body ">

				<div className="navbar-offcanvas-icons">

					<Link className="navbar-link" to={"/dashboard"}><i className="fa-solid fa-swatchbook" ></i>Dashboard</Link>
					<Link className="navbar-link" to={"/"}><i className="fa-solid fa-house-laptop" ></i>Home</Link>
					<Link className="navbar-link" to={"/login"}><i className="fa-solid fa-user" ></i>Login</Link>
					<Link className="navbar-link" to={"/"}><i className="fa-solid fa-gear" ></i>Settings</Link>
					<Link className="navbar-link" to={"/"}><i className="fa-solid fa-bell" ></i>Notifications</Link>
				</div>

				<form className="d-flex mt-3" role="search">
					<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-success" type="submit">Search</button>
				</form>
			</div>
		</div>




	</>);
};
