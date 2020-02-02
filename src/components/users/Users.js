import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// redux && redux actions
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../actions/userActions';

// images
import { API_IMAGES } from '../../config/config';

// components
import Alert   from '../layout/Alert';
import Sidebar from '../layout/Sidebar';

const Users = ({token, users, getUsers, deleteUser}) => {

    useEffect(() => {
        getUsers(token);
        // eslint-disable-next-line
    }, []);

    return(
    	<div className="row justify-content-center mt-1" id="page">
    		
    		<Sidebar />

			<div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
				<Alert />
				<h2 className="text-center text-white pb-1"><strong>Users</strong></h2>

				<table className="table table-dark text-center">
					<thead>
						<tr>
							<th>Id</th>
							<th>Fullname</th>
							<th>Profile image</th>
							<th>Profile created</th>
							<th>View / Delete</th>
						</tr>
					</thead>
					<tbody>
					{ users ? [users.map((u, index) => (
						<tr key={ index }>
							<td>{ u.id }</td>
							<td>{ u.fullname }</td>
							<td><img src={API_IMAGES + u.profile_image} alt="" style={{ width: '175px', height: '175px' }} /></td>
							<td>{ u.created_at }</td>
							<td className="d-flex flex-column flex-wrap justify-content-around">
								<Link to={"/users/" + u.id} className="mb-2">
									<button className="btn btn-primary w-100">
										<i className="far fa-eye"></i>
									</button>
								</Link>
								<button className="btn btn-danger w-100" onClick={() => { deleteUser(token, u.id); }}>
									<i className="fas fa-minus"></i>
								</button>
							</td>
						</tr>
					)) ] : null }
					</tbody>
				</table>

    		</div>

    	</div>
    );

}

const mapStateToProps = (state) => ({
    token: state.admin.token,
    users: state.users.users
});

export default connect(
    mapStateToProps,
    { getUsers, deleteUser }
)(Users);