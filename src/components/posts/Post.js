import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// redux && redux actions
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';

// images
import { API_IMAGES } from '../../config/config';

// components
import Alert   from '../layout/Alert';
import Sidebar from '../layout/Sidebar';

const Post = (props) => {

	const { token, post, getPost } = props;

    useEffect(() => {
        getPost(token, props.match.params.id);
        // eslint-disable-next-line
    }, []);

    return(
    	<div className="row justify-content-center mt-1" id="page">
    		
    		<Sidebar />

			<div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                <div className="d-flex flex-row justify-content-center mb-2">
                    <Link to="/posts">
                    	<button className="btn btn-primary"><i className="fas fa-arrow-left"></i> Posts</button>
                    </Link>
                </div>

                <Alert />

                <div className="row justify-content-center">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						{ Object.getOwnPropertyNames(post).length > 0 ?
						<div className="card border-white text-white" id="card">
							<div className="card-body row">
								<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column flex-wrap">
									<img src={API_IMAGES + post.image}  alt="" className="img-fluid w-100" style={{ height: '300px' }} />
								</div>
								<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
									<div className="d-flex flex-column flex-wrap">
		                                <p>Id: <small className="float-right">{ post.id }</small></p>
		                                <p>User: <small className="float-right"><Link to={"/users/" + post.user.id}>{ post.user.fullname }</Link></small></p>
		                                <p>Body: <small className="float-right">{ post.body }</small></p>
		                                <p>Created: <small className="float-right">{ post.created_at }</small></p>
		                                <p>Comments: <small className="float-right">{ post.comments_count }</small></p>
									</div>
								</div>
                            </div>
						</div>
						: <p className="alert alert-warning text-center">Post not found.</p> }
					</div>
                </div>

				<div className="row justify-content-center my-2">

					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<h2 className="text-center text-white">Comments</h2>
						<table className="table table-dark">
							<thead>
						    	<tr>
						      		<th scope="col">Id</th>
						      		<th scope="col">User</th>
						      		<th scope="col">Comment</th>
						      		<th scope="col">Created at</th>
						    	</tr>
							</thead>
							<tbody>
						  	{ post.comments_with_user && post.comments_with_user.length > 0 ?
						    [ post.comments_with_user.map((c, index) => (
						    <tr>
						    	<th scope="row">{ c.id }</th>
						    	<td><Link to={"/users/" + c.user.id}>{ c.user.fullname }</Link></td>
						    	<td>{ c.comment }</td>
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
    post:  state.posts.post
});

export default connect(
    mapStateToProps,
    { getPost }
)(Post);

