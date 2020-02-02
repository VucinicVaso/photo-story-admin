import { combineReducers } from 'redux';

// reducers
import adminReducer   from './adminReducer';
import alertReducer   from './alertReducer';
import userReducer    from './userReducer';
import postReducer    from './postReducer';
import commentReducer from './commentReducer';

export default combineReducers({
	admin:    adminReducer,
	alert:    alertReducer,
	users:    userReducer,
	posts:    postReducer,
	comments: commentReducer
});