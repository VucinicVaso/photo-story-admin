import { ADMIN }           from './appTypes';
import { setAlertMessage } from './alertActions';
import { emptyToken }      from './registerActions';

//API
import { API } from '../config/config';

export const getAdminData = (token) => async dispatch => {
	const response = await fetch(`${API}profile`, {
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
		type: ADMIN,
		payload: response.user
	});
}

export const updateAdminData = (token, admin) => async dispatch => {
	let formData = new FormData();
	formData.append('fullname', admin.fullname);
	formData.append('username', admin.username);
	formData.append('email', admin.email);
	formData.append('password', admin.password);
	formData.append('city', admin.city);
	formData.append('country', admin.country);
    admin.userfile !== "" ? formData.append('userfile', admin.userfile) : formData.append("userfile", "");
	formData.append('role', admin.role);
	formData.append('gender', admin.gender);

	const response = await fetch(`${API}profile/update`, {
        method: 'POST',
  		headers: {
      		//'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
           	'Authorization': 'Bearer ' + token
    	},
    	body: formData,
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
			type: ADMIN,
			payload: response.user
		});
	}
}