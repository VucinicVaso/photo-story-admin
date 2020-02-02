import React                       from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//redux && redux actions
import { connect } from 'react-redux';

// components
import Index     from '../pages/Index';
import NotFound  from '../layout/NotFound';
import Register  from '../register/Register';
import Login     from '../register/Login';
import Admin     from '../admin/Admin';
import AdminEdit from '../admin/AdminEdit';
import Users     from '../users/Users';
import User      from '../users/User';
import Posts     from '../posts/Posts';
import Post      from '../posts/Post';
import Comments  from '../comments/Comments';

const Routes = ({ isAuthenticated }) => {

	return(
		<Switch>
			<Route exact path="/" component={ Index } />
			<Route exact path="/login"      render={(props) => ( isAuthenticated ? <Redirect to="/" /> : <Login /> )} />
			<Route exact path="/register"   render={(props) => ( isAuthenticated ? <Redirect to="/" /> : <Register /> )} />
            <Route exact path="/admin"      render={(props) => ( isAuthenticated ? <Admin />           : <Redirect to="/login" /> )} />
            <Route exact path="/admin/edit" render={(props) => ( isAuthenticated ? <AdminEdit />       : <Redirect to="/login" /> )} />
            <Route exact path="/users"      render={(props) => ( isAuthenticated ? <Users />           : <Redirect to="/login" /> )} />
            <Route exact path="/users/:id"  render={(props) => ( isAuthenticated ? <User {...props} /> : <Redirect to="/login" /> )} />
            <Route exact path="/posts"      render={(props) => ( isAuthenticated ? <Posts />           : <Redirect to="/login" /> )} />
            <Route exact path="/posts/:id"  render={(props) => ( isAuthenticated ? <Post {...props} /> : <Redirect to="/login" /> )} />
            <Route exact path="/comments"   render={(props) => ( isAuthenticated ? <Comments />        : <Redirect to="/login" /> )} />
			<Route exact path="/logout"     render={(props) => ( <Redirect to="/login" /> )} />
			<Route component={ NotFound } />
		</Switch>
	);

}

const mapStateToProps = (state) => ({
    isAuthenticated: state.admin.isAuthenticated
});

export default connect(
    mapStateToProps,
    { }
)(Routes);
