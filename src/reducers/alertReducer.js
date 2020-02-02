import { SUCCESS_MESSAGE, ERROR_MESSAGE, EMPTY_MESSAGE } from '../actions/appTypes';

const initialState = {
	success: "",
	errors:  []
};

export default function(state = initialState, action){
	switch(action.type) {
		case SUCCESS_MESSAGE:
			return {
				...state,
				success: action.payload
			};
		case ERROR_MESSAGE:
			return {
				...state,
				errors: action.payload
			};
		case EMPTY_MESSAGE:
			return {
				...state,
				success: "",
				errors: []
			};
		default:
			return state;
	}
}