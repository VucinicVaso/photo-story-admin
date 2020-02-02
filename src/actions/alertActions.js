import { SUCCESS_MESSAGE, ERROR_MESSAGE, EMPTY_MESSAGE } from './appTypes';

export const setAlertMessage = (msg, type) => dispatch => {
	if(type === 'error'){
		if(Array.isArray(msg)){
			dispatch({
				type: ERROR_MESSAGE,
				payload: msg
			});
		}else{
			dispatch({
				type: ERROR_MESSAGE,
				payload: [msg]
			});
		}
		setTimeout(() => dispatch({ type: EMPTY_MESSAGE }), 5000);
	}
	if(type === 'success'){
		dispatch({
			type: SUCCESS_MESSAGE,
			payload: msg
		});
		setTimeout(() => dispatch({ type: EMPTY_MESSAGE }), 5000);
	}
}

export const hideAlertMessage = () => dispatch => { dispatch({ type: EMPTY_MESSAGE }); }