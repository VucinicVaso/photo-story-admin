import { GET_COMMENTS } from '../actions/appTypes';

const initialState = {
	comments: []
};

export default function(state = initialState, action){
	switch(action.type) {
		case GET_COMMENTS:
			return {
				...state,
				comments: action.payload
			};
		default:
			return state;
	}
}