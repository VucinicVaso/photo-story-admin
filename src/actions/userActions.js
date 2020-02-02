import { GET_USERS, GET_USER } from './appTypes';
import { setAlertMessage }     from './alertActions';
import { emptyToken }          from './registerActions';

//API
import { API } from '../config/config';

export const getUsers = (token) => async dispatch => {
	let response = await fetch(`${API}users`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
	})
  	.then(result => result.json())
  	.then(result => { return result; });

	if(response.unauthorized === "Unauthorized") { dispatch(emptyToken("Your token has expired.")); }

	if(response.errors && response.errors !== undefined && response.errors !== null && response.errors.length > 0) {
		dispatch( setAlertMessage(response.errors, "error") );
	}

	dispatch({
		type: GET_USERS,
		payload: response.users
	});  	
}

export const getUser = (token, id) => async dispatch => {
	let response = await fetch(`${API}users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
	})
  	.then(result => result.json())
  	.then(result => { return result; });

	if(response.unauthorized === "Unauthorized") { dispatch(emptyToken("Your token has expired.")); }

	if(response.errors && response.errors !== undefined && response.errors !== null && response.errors.length > 0) {
		dispatch( setAlertMessage(response.errors, "error") );
	}

	response.user !== null ?
		dispatch({
			type: GET_USER,
			payload: response.user
		})
		: dispatch( setAlertMessage("User not found!", "error") );
}

export const deleteUser = (token, id) => async dispatch => {
	let response = await fetch(`${API}users/destroy/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: "POST"
	})
  	.then(result => result.json())
  	.then(result => { return result; });

	if(response.unauthorized === "Unauthorized") { dispatch(emptyToken("Your token has expired.")); }

	if(response.errors && response.errors !== undefined && response.errors !== null && response.errors.length > 0) {
		dispatch( setAlertMessage(response.errors, "error") );
	}

	if(response.message !== ""){
		dispatch( setAlertMessage(response.message, "success") );

		dispatch({
			type: GET_USERS,
			payload: response.users
		});
	}
}