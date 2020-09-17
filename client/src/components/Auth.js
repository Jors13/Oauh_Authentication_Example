import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { processLogin, processToken } from "../actions/userlog.actions";

const Auth = props => {
	const dispatch = useDispatch();
	const token = new URLSearchParams(props.location.search).get("token"); //Save on session storage

	const sessionState = () => {
		if (token !== null) {
			props.handleLogin();
			sessionStorage.TOK = token;
			sessionStorage.hasSession = false;
			dispatch(processToken(token));
		}
	};

	const eventLogin = e => {
		dispatch(processLogin(props.loginWith.provider));
	};

	useEffect(sessionState, []);

	if (token !== null) {
		return <Redirect to="/dashboard" />;
	} else {
		return (
			<div className="button">
				<a onClick={eventLogin} href={props.url}>
					<p style={{ backgroundColor: props.color }}>
						<img src={props.icon} alt={props.provider} width={25} heigth={25} />
						Login with {props.provider}
					</p>
				</a>
			</div>
		);
	}
};

export default Auth;
