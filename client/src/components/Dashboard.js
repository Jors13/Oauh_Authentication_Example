import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../actions/userlog.actions";

const Dashboard = props => {
	const dispatch = useDispatch();
	const [data, setdata] = useState({});

	const getRender = () => {
		const hasSession = JSON.parse(sessionStorage.hasSession);
		if (hasSession === true) {
			getState();
		} else {
			getData();
		}
	};

	const getState = () => {
		//Set last state
		const { username, email, avatar, name } = JSON.parse(sessionStorage.user);
		dispatch(logIn({ avatar, username, email, name }));
		setdata({ ...data, username, email, avatar, name });
	};

	const getData = async () => {
		//Get first data state
		const headers = {
			Authorization: `Bearer ${sessionStorage.TOK}`
		};

		try {
			const response = await axios.post(
				"http://localhost:4000/api/users",
				{},
				{
					headers: headers
				}
			);

			const { avatar, username, email, name } = response.data.user;

			const userData = {
				avatar,
				username,
				email,
				name
			};

			dispatch(logIn(userData));
			setdata({ ...data, username, email, avatar, name });

			sessionStorage.user = JSON.stringify(userData);
			sessionStorage.hasSession = true;
			sessionStorage.logged = true;
		} catch (error) {
			console.log(error);
		}
	};

	const eventLogout = e => {
		props.handleLogout(e);
		dispatch(logOut());
	};

	useEffect(getRender, []);

	return (
		<div className="dashboard">
			<h1>Dashboard</h1>
			<img
				src={data.avatar}
				alt="profile"
				width="300"
				height="300"
				className="rounded-circle"
			/>
			<p>Hello {data.username !== "Username" ? data.username : data.name}</p>
			<p>E-mail: {data.email}</p>
			<button className="btn-dark rounded" onClick={eventLogout}>
				Log Out
			</button>
			<p> Coming soon this app will have more things...</p>
		</div>
	);
};

export default Dashboard;
