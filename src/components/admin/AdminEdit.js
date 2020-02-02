import React, { useState, useEffect } from 'react';
import { Link }                       from 'react-router-dom';

// redux && redux actions
import { connect }         from 'react-redux';
import { setAlertMessage } from '../../actions/alertActions';
import { updateAdminData } from '../../actions/adminActions';

// components
import Alert   from '../layout/Alert';
import Sidebar from '../layout/Sidebar';

const AdminEdit = ({ token, user, setAlertMessage, updateAdminData }) => {

    const [ update, setUpdateProfile ] = useState({
        fullname:      "",
        username:      "",
        email:         "",
        password:      "",
        city:          "",
        country:       "",
        userfile:      "",
        role:          "",
        gender:        ""
    });

    const { fullname, username, email, password, city, country, userfile, role, gender } = update;

    useEffect(() => {
        if(user){
            setUpdateProfile({...update, fullname: user.fullname, username: user.username, email: user.email, city: user.city, country: user.country, role: user.role, gender: user.gender });
        }
    }, [user]);

    const onChange = (e) => { setUpdateProfile({...update, [e.target.name] : e.target.value}); } 

	const onChangeFile = (e) => { setUpdateProfile({...update, userfile: e.target.files[0] }); } 

    const onSubmit = (e) => {
        e.preventDefault();
        if(fullname !== "" && username !== "" && email !== "" && city !== "" && country !== "" && role !== "" && gender !== ""){
            updateAdminData(token, update);
            setUpdateProfile({...update, password : "", userfile: "" });
        }else {
            setAlertMessage('Something went wrong. Please try again!', 'error');
        }
    }

	return(
		<div className="row justify-content-center my-1" id="page">
			
			<Sidebar />

			<div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">

                <div className="d-flex flex-row justify-content-center mb-2">
                    <Link to="/admin">
                    	<button className="btn btn-primary"><i className="fas fa-arrow-left"></i> Edit Admin Profile</button>
                    </Link>
                </div>

                <Alert />

				<div className="card border-white text-center text-white" id="card">               
                    <div className="card-body">
                    <form onSubmit={ onSubmit } encType="multipart/form-data">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 form-group">
                                        <label htmlFor="fullname">Fullname:</label>
                                        <input type="text" name="fullname" className="form-control" value={ fullname } onChange={ onChange } />                         
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 form-group">
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" name="username" className="form-control" value={ username } onChange={ onChange } />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 form-group">
                                        <label htmlFor="city">City:</label>
                                        <input type="text" name="city" className="form-control" value={ city } onChange={ onChange } />
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 form-group">
                                        <label htmlFor="name">Country:</label>
                                        <input type="text" name="country" className="form-control" value={ country } onChange={ onChange } />
                                    </div> 
                                </div>
                                <div className="form-group justify-content-center row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                        <label htmlFor="role">Role:</label>
                                        { role === "admin" ? 
                                        <div className="form-group">
                                            <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" value="admin" name="role" onChange={ onChange } checked />Admin
                                                </label>
                                            </div>
                                            <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" value="user" name="role" onChange={ onChange } />User
                                                </label>
                                            </div>
                                        </div>
                                        :
                                        <div className="form-group">
                                            <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" value="admin" name="role" onChange={ onChange } />Admin
                                                </label>
                                            </div>
                                            <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" value="user" name="role" onChange={ onChange } checked />User
                                                </label>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                        <label htmlFor="gender">Gender:</label>
                                        { gender === "male" ? 
                                        <div className="form-group">
                                            <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" value="male" name="gender" onChange={ onChange } checked />Male
                                                </label>
                                            </div>
                                            <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" value="female" name="gender" onChange={ onChange } />Female
                                                </label>
                                            </div>
                                        </div>
                                        :
                                        <div className="form-group">
                                            <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" value="male" name="gender" onChange={ onChange } />Male
                                                </label>
                                            </div>
                                            <div className="form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" value="female" name="gender" onChange={ onChange } checked />Female
                                                </label>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>       
                            </div>
                             <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name="email" className="form-control" value={ email } onChange={ onChange } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" name="password" className="form-control" value={ password } onChange={ onChange } />
                                </div>
								<div className="form-group">
									<label htmlFor="userfile">Profile image: </label>
									<input type="file" name="userfile" className="form-control" onChange={ onChangeFile } />
								</div>
                                <button className="btn btn-primary btn-block">Update</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>

			</div>

		</div>
	);

}

const mapStateToProps = (state) => ({
	token: state.admin.token,
	user: state.admin.user
});

export default connect(
    mapStateToProps,
    { setAlertMessage, updateAdminData }
)(AdminEdit);