import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// redux && redux actions
import { connect }      from 'react-redux';
import { getAdminData } from '../../actions/adminActions';

// images
import { API_IMAGES } from '../../config/config';

// components
import Alert   from '../layout/Alert';
import Sidebar from '../layout/Sidebar';

const Admin = ({token, user, getAdminData}) => {

    useEffect(() => {
        getAdminData(token);
        // eslint-disable-next-line
    }, []);

	return (
		<div className="row justify-content-center my-1" id="page">

			<Sidebar />

			<div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
				<Alert />
				<h2 className="text-center text-white pb-1"><strong>Admin Panel</strong></h2>
				
				{ Object.getOwnPropertyNames(user).length > 0 ?
                    <div className="card border-white" id="card">
                        <div className="card-body row text-white">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <p>Fullname: <small className="float-right">{ user.fullname }</small></p>
                                <p>Username: <small className="float-right">{ user.username }</small></p>  
                                <p>Email: <small className="float-right">{ user.email }</small></p>
                                <p>City/Country: <small className="float-right">{ user.city }, { user.country }</small></p>
                              	<p>Role: <small className="float-right">{ user.role }</small></p>
                                <p>Age: <small className="float-right">{ user.dateofbirth }</small></p>                    
                                <p>Gender: <small className="float-right">{ user.gender }</small></p>
                                <p>Profile created: <small className="float-right">{ user.created_at }</small></p>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <img src={API_IMAGES + user.profile_image} alt="" className="img-fluid w-100" style={{ height: '300px' }} />
                            </div>
                        </div>
                        <div className="card-footer">
                            <Link to="/admin/edit" className="btn btn-primary w-100">EDIT</Link>
                        </div>
                    </div>
				: <p className="alert alert-danger text-white text-center">User not found!</p> }

			</div>

		</div>
	);

}

const mapStateToProps = (state) => ({
    token: state.admin.token,
    user:  state.admin.user,
});

export default connect(
    mapStateToProps,
    { getAdminData }
)(Admin);
