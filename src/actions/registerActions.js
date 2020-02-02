import { LOGIN, LOGOUT }   from './appTypes';
import { setAlertMessage } from './alertActions';

//API
import { API } from '../config/config';

export const registerAdmin = (admin) => async dispatch => {
	let formData = new FormData();
	formData.append('fullname', admin.fullname);
	formData.append('gender', admin.gender);
	formData.append('city', admin.city);
	formData.append('country', admin.country);
	formData.append('birthday', JSON.stringify(admin.birthday).slice(1, 11));
	formData.append('email', admin.email);
	formData.append('password', admin.password);
	
	const response = await fetch(`${API}register`, {
        headers: { 'Accept': 'application/json' },
        method: 'POST',
        body: formData
	})
  	.then(result => result.json())
  	.then(result => { return result; });

	if(response.errors && response.errors !== undefined && response.errors !== null && response.errors.length > 0){
		dispatch( setAlertMessage(response.errors, "error") );
	}else {
		dispatch( setAlertMessage(response.success, "success") );
	}
}

export const loginAdmin = (email, password) => async dispatch => {
	let formData = new FormData();
	formData.append('email', email);
	formData.append('password', password);
	
	const response = await fetch(`${API}login`, {
        headers: { 'Accept': 'application/json' },
        method: 'POST',
		body: formData
	})
  	.then(result => result.json())
  	.then(result => { return result; });

	if(response.errors && response.errors !== undefined && response.errors !== null && response.errors.length > 0){
		dispatch( setAlertMessage(response.errors, "error") );
	}else if(response.token !== ""){
		dispatch({
			type: LOGIN,
			payload: response.token
		});
	}else {
		dispatch( setAlertMessage("Login token is empty.", "error") );
	}
}

export const logoutAdmin = (token) => async dispatch => {
	const response = await fetch(`${API}logout`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST'
	})
  	.then(result => result.json())
  	.then(result => { return result; });
  	
  	if(response.logout === true){ dispatch({ type: LOGOUT }); }
}

export const emptyToken = (msg) => async dispatch => {
	dispatch( setAlertMessage(msg, "error") );
	dispatch({ type: LOGOUT });		
}