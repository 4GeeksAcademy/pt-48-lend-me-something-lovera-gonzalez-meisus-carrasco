import React from "react";
import { Link } from "react-router-dom";
import '../../styles/shared.sass'

export const Navbar = () => {
	return (<>
		<div className="d-flex flex-column align-items-center bg-dark vh-100  fixed-top rounded-2" style={{ "width": "6em" }}>


			<button className=" btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
				<i className="fa-solid fa-bars" style={{ "color": "#f0f2f4" }}></i>
			</button>
			<Link to={"/dashboard"}><i className="fa-solid fa-swatchbook" style={{ "color": "#f0f2f4" }}></i></Link>
			<Link to={"/"}><i className="fa-solid fa-house-laptop" style={{ "color": "#f0f2f4" }}></i></Link>
			<Link to={"/login"}><i className="fa-solid fa-user" style={{ "color": "#f0f2f4" }}></i></Link>
		</div>
		<div className="offcanvas offcanvas-start text-bg-dark bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
			<div className="offcanvas-header">
				<h5 className="offcanvas-title text-light" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
				<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body">
				<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
					<li className="nav-item">
						<a className="nav-link active" aria-current="page" href="#">home</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Link</a>
					</li>
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Dropdown
						</a>
						<ul className="dropdown-menu dropdown-menu-dark">
							<li><a className="dropdown-item" href="#">Action</a></li>
							<li><a className="dropdown-item" href="#">Another action</a></li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li><a className="dropdown-item" href="#">Something else here</a></li>
						</ul>
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
