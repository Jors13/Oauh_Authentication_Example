import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
	return (
		<div className="errorPage">
			<h1>Problem, we have an Error</h1>
			<p>
				<Link to="/">Back to Home</Link>
			</p>
		</div>
	);
};

export default Unauthorized;
