import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="row">
			<div className="col-10">
				<p className="text-light">
					Made with <i className="fa fa-heart text-danger" /> by{" "}
					<a href="https://github.com/orgs/4GeeksAcademy/projects/152/views/1">LendMeSomething Team</a>
				</p>
			</div>
			<div className="col-2">
				<Link to={"/aboutus"} className="text-decoration-none text-light">
					<i className="fa-solid fa-users"></i>
					<p>
						About Us
					</p>
				</Link>
			</div>
		</div>
	
	</footer>
);
