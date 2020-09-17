import { PROCESS_LOGIN_USER, PROCESS_LOGIN_TOKEN, USER_GET, USER_LOGOUT } from "./types";

export const processLogin = provider => {
	return {
		type: PROCESS_LOGIN_USER,
		provider: provider
	};
};

export const processToken = token => {
	return {
		type: PROCESS_LOGIN_TOKEN,
		token: token
	};
};

export const logIn = user => {
	return {
		type: USER_GET,
		payload: user
	};
};

export const logOut = () => {
	return {
		type: USER_LOGOUT
	};
};
