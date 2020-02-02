import { GET_COMMENTS }    from './appTypes';
import { setAlertMessage } from './alertActions';
import { emptyToken }      from './registerActions';

//API
import { API } from '../config/config';

export const getComments = (token) => async dispatch => {
	let response = await fetch(`${API}comments`, {
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
		type: GET_COMMENTS,
		payload: response.comments
	});  	
}

export const deleteComment = (token, id) => async dispatch => {
	let response = await fetch(`${API}comments/destroy/${id}`, {
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
			type: GET_COMMENTS,
			payload: response.comments
		});
	}
}