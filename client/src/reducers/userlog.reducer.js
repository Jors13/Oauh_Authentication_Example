import {
	PROCESS_LOGIN_USER,
	PROCESS_LOGIN_TOKEN,
	USER_GET,
	USER_LOGOUT
} from "../actions/types";

const initialState = {};

const logUser = (state = initialState, action) => {
	switch (action.type) {
		case PROCESS_LOGIN_USER:
			return {
				...state,
				user: { login: "In process", provider: action.provider },
				loggedIn: false
			};
		case PROCESS_LOGIN_TOKEN:
			return {
				...state,
				user: { login: "In process", token: action.token }
			};
		case USER_GET:
			return {
				...state,
				user: action.payload,
				loggedIn: true
			};
		case USER_LOGOUT:
			return {
				...state,
				user: {},
				loggedIn: false
			};
		default:
			return state;
	}
};

export default logUser;
