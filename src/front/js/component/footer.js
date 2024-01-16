import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="py-3 text-center">
		<div className="row">
			<div className="col-12 d-flex flex-row justify-content-center align-items-center gap-5">
				<Link to={"/aboutus"} className="text-decoration-none text-light ">
					<i className="fa-solid fa-users"></i>
					<p>
						About Us
					</p>
				</Link>
				<Link to={"/aboutus"} className="text-decoration-none text-light ">
					<i className="fa-solid fa-book"></i>
					<p>
						TyC
					</p>
				</Link>
				<Link to={"/aboutus"} className="text-decoration-none text-light ">
					<i className="fa-solid fa-glasses"></i>
					<p>
						Privacy Policy
					</p>
				</Link>
			</div>
			<div className="col-12">
				<p className="text-light">
					Made with <i className="fa fa-heart text-danger" /> by{" "}
					<a href="https://github.com/orgs/4GeeksAcademy/projects/152/views/1">LendMeSomething Team</a>
				</p>
			</div>
		</div>
	
	</footer>
);
