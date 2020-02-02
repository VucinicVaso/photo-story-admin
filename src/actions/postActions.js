import { GET_POSTS, GET_POST } from './appTypes';
import { setAlertMessage }     from './alertActions';
import { emptyToken }          from './registerActions';

//API
import { API } from '../config/config';

export const getPosts = (token) => async dispatch => {
	let response = await fetch(`${API}posts`, {
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
		type: GET_POSTS,
		payload: response.posts
	});  	
}

export const getPost = (token, id) => async dispatch => {
	let response = await fetch(`${API}posts/${id}`, {
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

	response.post !== null ?
		dispatch({
			type: GET_POST,
			payload: response.post
		})
		: dispatch( setAlertMessage("Post not found!", "error") );
}

export const deletePost = (token, id) => async dispatch => {
	let response = await fetch(`${API}posts/destroy/${id}`, {
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
			type: GET_POSTS,
			payload: response.posts
		});
	}
}