import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// redux && redux actions
import { connect } from 'react-redux';
import { getComments, deleteComment } from '../../actions/commentActions';

// images
import { API_IMAGES } from '../../config/config';

// components
import Alert   from '../layout/Alert';
import Sidebar from '../layout/Sidebar';

const Comments = ({token, comments, getComments, deleteComment}) => {

    useEffect(() => {
        getComments(token);
        // eslint-disable-next-line
    }, []);

    return(
    	<div className="row justify-content-center mt-1" id="page">
    		
    		<Sidebar />

			<div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
				<Alert />
				<h2 className="text-center text-white pb-1"><strong>Comments</strong></h2>

				<table className="table table-dark text-center">
					<thead>
						<tr>
							<th>Id</th>
							<th>Post</th>
							<th>User</th>
							<th>Comment</th>
							<th>Created</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
					{ comments ? [comments.map((c, index) => (
						<tr key={ index }>
							<td>{ c.id }</td>
							<td>
								<Link to={"/posts/" + c.post.id} className="mb-2">
									<img src={API_IMAGES + c.post.image} alt="" style={{ width: '175px', height: '175px' }} />
								</Link>
							</td>
							<td>
								<Link to={"/users/" + c.user.id} className="mb-2">
									<button className="btn btn-primary w-100">{ c.user.fullname }</button>
								</Link>
							</td>
							<td>{ c.comment }</td>
							<td>{ c.created_at }</td>
							<td className="d-flex flex-column flex-wrap justify-content-around">
								<button className="btn btn-danger w-100" onClick={() => { deleteComment(token, c.id); }}>
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
    token:    state.admin.token,
    comments: state.comments.comments
});

export default connect(
    mapStateToProps,
    { getComments, deleteComment }
)(Comments);