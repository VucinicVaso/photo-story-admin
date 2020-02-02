import { LOGIN, LOGOUT, ADMIN } from '../actions/appTypes';

const initialState = {
	token: localStorage.getItem("token") === null ? "" : localStorage.getItem("token"),
	isAuthenticated: localStorage.getItem("isAuthenticated") === null ? false : JSON.parse(localStorage.getItem("isAuthenticated")),
	user: {}
};

export default function(state = initialState, action){
	switch(action.type) {
		case LOGIN:
			localStorage.setItem("token", action.payload);
			localStorage.setItem("isAuthenticated", true);
			return {
				...state,
				token: action.payload,
				isAuthenticated: true
			};
		case ADMIN:
			return {
				...state,
				user: action.payload
			};
		case LOGOUT:
			localStorage.removeItem("token");
			localStorage.removeItem("isAuthenticated");
			return {
				...state,
				token: "",
				isAuthenticated: false,
				user: {}
			};
		default:
			return state;
	}
}