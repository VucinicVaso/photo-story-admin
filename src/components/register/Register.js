import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// redux && redux actions
import { connect }         from 'react-redux';
import { setAlertMessage } from '../../actions/alertActions';
import { registerAdmin }   from '../../actions/registerActions';

// components
import Alert from '../layout/Alert';

const Register = ({ setAlertMessage, registerAdmin }) => {

	const [ register, setRegister ] = useState({
		fullname:     	  "",
		gender:           "",
		city:             "",
		country:          "",
		birthday:         new Date(),
		email:    		  "",
		password: 		  "",
		confirm_password: "",
		agree_to_terms:   false
	});

	const { fullname, gender, city, country, birthday, email, password, confirm_password, agree_to_terms } = register;

	const onChange = (e) => { setRegister({...register, [e.target.name] : e.target.value}); } 

	const onChangeDate = (date) => { setRegister({...register, birthday: date }); };

	const onSubmit = (e) => {
		e.preventDefault();
		
		if(fullname !== "" || gender !== "" || city !== "" || country !== "" || email !== "" || password !== "" || confirm_password !== ""){
			if(password !== confirm_password){ 
				setAlertMessage('Passwords do not match!', 'error');
			}else {
				registerAdmin(register);
				setRegister({...register, fullname: "", gender: "", city: "", country: "", birthday: new Date(), email: "", password: "", confirm_password: "", agree_to_terms: false });				
			}
		}else {
			setAlertMessage('Something went wrong please try again!', 'error');
		}
	}

	return(
		<div className="row justify-content-center align-items-center" id="page">
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
				
				<div className="card border border-white my-4" id="card">
					<div className="card-body text-white">

						<div className="d-flex flex-column flex-wrap mb-3">
							<h2 className="text-center text-white" id="title"><strong>Register</strong></h2>
							<Alert />						
						</div>					

						<form onSubmit={ onSubmit } className="d-flex flex-column justify-content-center text-center">
							<div className="form-group">
								<label htmlFor="fullname">Name:</label>
								<input type="text" name="fullname" className="form-control" value={ fullname } onChange={ onChange } required />
							</div>
							<div className="form-group">
								<label htmlFor="city">City:</label>
								<input type="text" name="city" className="form-control" value={ city } onChange={ onChange } required />
							</div>
							<div className="form-group">
								<label htmlFor="name">Country:</label>
								<input type="text" name="country" className="form-control" value={ country } onChange={ onChange } required />
							</div>
							<div className="form-group justify-content-center text-center">
								<label htmlFor="sel1" className="pr-2">Date of birth:</label>	
								<DatePicker 
									placeholderText="Click to select a date"
									selected={ birthday } 
									onChange={date => onChangeDate(date) } />						
							</div>
							<div className="form-group justify-content-center">
								<label htmlFor="gender">Gender:</label>
								<div className="form-group">
									<div className="form-check-inline">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" value="male" name="gender" onChange={ onChange } />Male
										</label>
									</div>
									<div className="form-check-inline">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" value="female" name="gender" onChange={ onChange } />Female
										</label>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email:</label>
								<input type="email" name="email" className="form-control" value={ email } onChange={ onChange } required />
							</div>
							<div className="form-group">
								<label htmlFor="subject">Password:</label>
								<input type="password" name="password" className="form-control" value={ password } onChange={ onChange } required />
							</div>
							<div className="form-group">
								<label htmlFor="confirm_password">Confirm Password:</label>
								<input type="password" name="confirm_password" className="form-control" value={ confirm_password } onChange={ onChange } required />
							</div>				
							<div className="form-group">
								<label className="form-check-label">
							    	<input type="checkbox" className="form-check-input" name="agree_to_terms" value={ true } onChange={ onChange } required />I agree to the terms of service
								</label>	
							</div>	
							<button className="btn btn-primary btn-block">Submit</button>
						</form>

						<div className="d-flex flex-column flex-wrap justify-content-center text-center mt-3">
							<p className="text-white">Have an account!</p>
							<Link to="/login" className="btn btn-info">Login here!</Link>
						</div>						
					</div>
				</div>
				
			</div>
		</div>
	);

}

const mapStateToProps = (state) => ({});

export default connect(
	mapStateToProps,
	{ setAlertMessage, registerAdmin }
)(Register);