import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// redux && redux actions
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../../actions/postActions';

// images
import { API_IMAGES } from '../../config/config';

// components
import Alert   from '../layout/Alert';
import Sidebar from '../layout/Sidebar';

const Posts = ({token, posts, getPosts, deletePost}) => {

    useEffect(() => {
        getPosts(token);
        // eslint-disable-next-line
    }, []);

    return(
    	<div className="row justify-content-center mt-1" id="page">
    		
    		<Sidebar />

			<div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
				<Alert />
				<h2 className="text-center text-white pb-1"><strong>Posts</strong></h2>

				<table className="table table-dark text-center">
					<thead>
						<tr>
							<th>Id</th>
							<th>User</th>
							<th>Image</th>
							<th>Body</th>
							<th>Created</th>
							<th>View / Delete</th>
						</tr>
					</thead>
					<tbody>
					{ posts ? [posts.map((p, index) => (
						<tr key={ index }>
							<td>{ p.id }</td>
							<td>
								<Link to={"/users/" + p.user.id} className="mb-2">
									<button className="btn btn-primary w-100">{ p.user.fullname }</button>
								</Link>
							</td>
							<td><img src={API_IMAGES + p.image} alt="" style={{ width: '175px', height: '175px' }} /></td>
							<td>{ p.body }</td>
							<td>{ p.created_at }</td>
							<td className="d-flex flex-column flex-wrap justify-content-around">
								<Link to={"/posts/" + p.id} className="mb-2">
									<button className="btn btn-primary w-100">
										<i className="far fa-eye"></i>
									</button>
								</Link>
								<button className="btn btn-danger w-100" onClick={() => { deletePost(token, p.id); }}>
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
    posts: state.posts.posts
});

export default connect(
    mapStateToProps,
    { getPosts, deletePost }
)(Posts);