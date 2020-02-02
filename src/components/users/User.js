import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// redux && redux actions
import { connect } from 'react-redux';
import { getUser } from '../../actions/userActions';

// images
import { API_IMAGES } from '../../config/config';

// components
import Alert   from '../layout/Alert';
import Sidebar from '../layout/Sidebar';

const User = (props) => {

	const { token, user, getUser } = props;

    useEffect(() => {
        getUser(token, props.match.params.id);
        // eslint-disable-next-line
    }, []);

    return(
    	<div className="row justify-content-center mt-1" id="page">
    		
    		<Sidebar />

			<div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                <div className="d-flex flex-row justify-content-center mb-2">
                    <Link to="/users">
                    	<button className="btn btn-primary"><i className="fas fa-arrow-left"></i> Users</button>
                    </Link>
                </div>

                <Alert />

                <div className="row justify-content-center">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						{ Object.getOwnPropertyNames(user).length > 0 ?
						<div className="card border-white text-white" id="card">
							<div className="card-body row">
								<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column flex-wrap">
									<h2 className="text-center">User: { user.fullname }</h2>
									<img src={API_IMAGES + user.profile_image}  alt="" className="img-fluid w-100" style={{ height: '300px' }} />
								</div>
								<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
									<div className="d-flex flex-column flex-wrap">
		                                <p>Fullname: <small className="float-right">{ user.fullname }</small></p>
		                                <p>Username: <small className="float-right">{ user.username }</small></p>
		                                <p>Email: <small className="float-right">{ user.email }</small></p>                    
		                                <p>City: <small className="float-right">{ user.city }</small></p>                      
		                                <p>Country: <small className="float-right">{ user.country }</small></p>                        
		                                <p>Age: <small className="float-right">{ user.dateofbirth }</small></p>                    
		                                <p>Role: <small className="float-right">{ user.role }</small></p>
		                                <p>Gender: <small className="float-right">{ user.gender }</small></p>
		                                <p>Profile created: <small className="float-right">{ user.created_at }</small></p>
		                                <p>Posts: <small className="float-right">{ user.posts_count }</small></p>
		                                <p>Comments: <small className="float-right">{ user.comments_count }</small></p>
									</div>
								</div>
                            </div>
						</div>
						: <p className="alert alert-warning text-center">User not found.</p> }
					</div>
                </div>

				<div className="row justify-content-center my-2">
					
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-white">
						<h2 className="text-center">Spots</h2>
					{ user.posts && user.posts.length > 0 ? 
					[ user.posts.map((p, index) => (
						<div className="card border-white mt-1" id="card" key={ index }>
							<div className="card-body d-flex flex-column flex-wrap">
								<Link to={"/posts/" + p.id}>
									<img src={API_IMAGES + p.image} alt="" className="img-fluid w-100" style={{ height: '200px' }} />
								</Link>
							</div>
						</div>
					))] 
					: null }
					</div>

					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
						<h2 className="text-center text-white">Comments</h2>
						<table className="table table-dark">
							<thead>
						    	<tr>
						      		<th scope="col">Id</th>
						      		<th scope="col">Comment</th>
						      		<th scope="col">Post</th>
						      		<th scope="col">Created at</th>
						    	</tr>
							</thead>
							<tbody>
						  	{ user.comments_with_post && user.comments_with_post.length > 0 ?
						    [ user.comments_with_post.map((c, index) => (
						    <tr>
						    	<th scope="row">{ c.id }</th>
						    	<td>{ c.comment }</td>
						    	<td>
						    		<Link to={"/posts/" + c.post.id}>
						    			<img src={API_IMAGES + c.post.image} alt="" className="img-fluid w-100" style={{ height: '100px' }} />
						    		</Link>
						    	</td>
						      	<td>{ c.created_at }</td>
						    </tr>
						    )) ] : null }
						  </tbody>
						</table>
					</div>

				</div>

			</div>
    	</div>
    );

}

const mapStateToProps = (state) => ({
    token: state.admin.token,
    user:  state.users.user
});

export default connect(
    mapStateToProps,
    { getUser }
)(User);