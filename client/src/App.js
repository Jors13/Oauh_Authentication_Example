import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./static/assets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import BeforeRender from "./components/BeforeRender";
import Footer from "./components/Footer";
import loginProvider from "./static/loginServicesData";

function App() {
	let initialState = false;
	const isLogged = sessionStorage.logged ? JSON.parse(sessionStorage.logged) : false;

	BeforeRender(() => {
		if (isLogged === true) {
			initialState = true;
		}
	});

	const [user, setUser] = useState(initialState);

	const handleLogin = () => {
		setUser(true);
	};

	const handleLogout = e => {
		e.preventDefault();
		sessionStorage.clear();
		setUser(false);
	};

	return (
		<div className="App">
			<div className="container">
				<div className="row justify-content-end">
					<nav class="nav">
						<a class="nav-link disabled" href="home">
							Home
						</a>
						<a class="nav-link disabled" href="about">
							About
						</a>
						<a class="nav-link disabled" href="coming" tabindex="-1" aria-disabled="true">
							...
						</a>
					</nav>
				</div>
				<div className="row justify-content-end appWindow">
					<div className="col-md-3 col-xs-1 "></div>

					<Router>
						<Route
							exact
							path="/"
							render={props => (
								<div className="col-md-6 col-xs-10 text-left">
									<h1 className="appTitle text-center">
										Welcome to this Sample Authentication
									</h1>
									{loginProvider.map(log => (
										<Auth
											key={log.provider}
											provider={log.provider}
											url={log.url}
											icon={log.icon}
											color={log.color}
											{...props}
											user={user.toString()}
											handleLogin={handleLogin}
										/>
									))}
								</div>
							)}
						/>
						<ProtectedRoute
							exact
							path="/dashboard"
							user={user}
							handleLogout={handleLogout}
							component={Dashboard}
						/>
						<Route exact path="/unauthorized" component={Unauthorized} />
					</Router>
					<div className="col-md-3  col-xs-1 "></div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
