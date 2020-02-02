import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// redux && redux actions
import { connect }         from 'react-redux';
import { setAlertMessage } from '../../actions/alertActions';
import { loginAdmin }      from '../../actions/registerActions';

// components
import Alert from '../layout/Alert';

const Login = (props) => {

	const [ login, setLogin ] = useState({
		email:    "",
		password: ""
	});

	const { email, password } = login;

	useEffect(() => {
		if(props.isAuthenticated === true){ props.history.push('/'); }
		// eslint-disable-next-line	
	}, []);

	const onChange = (e) => { setLogin({...login, [e.target.name] : e.target.value}); } 

	const onSubmit = (e) => {
		e.preventDefault();
		
		if(email !== "" || password !== ""){
			props.loginAdmin(email, password);
			setLogin({...login, email: "", password: "" });
		}else {
			props.setAlertMessage('Email or password are empty!', 'error');
		}
	}

	return(
		<div className="row justify-content-center align-items-center" id="page">
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

				<div className="card border border-white" id="card">
					<div className="card-body text-white">
						
						<div className="d-flex flex-column flex-wrap mb-3">
							<h2 className="text-center text-white" id="title"><strong>Login</strong></h2>
							<Alert />						
						</div>

						<form onSubmit={ onSubmit } className="d-flex flex-column flex-wrap">
							<div className="form-group">
								<label htmlFor="email">Email:</label>
								<input type="email" name="email" className="form-control" value={ email } onChange={ onChange } required />
							</div>
							<div className="form-group">
								<label htmlFor="subject">Password:</label>
								<input type="password" name="password" className="form-control" value={ password } onChange={ onChange } required />
							</div>
							<button className="btn btn-primary btn-block">Submit</button>
						</form>

						<div className="d-flex flex-column flex-wrap justify-content-center text-center mt-3">
							<p>No account? Create one now.</p>
							<Link to="/register" className="btn btn-info">Register here!</Link>
						</div>

					</div>
				</div>
				
			</div>
		</div>
	);

}

const mapStateToProps = (state) => ({
	isAuthenticated: state.admin.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ setAlertMessage, loginAdmin }
)(Login);