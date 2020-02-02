import React    from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

	return (
		<div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 border-right">
		    <div className="list-group list-group-flush">
		        <Link to="/admin"    className="list-group-item list-group-item bg-light">Admin</Link>
		        <Link to="/users"    className="list-group-item list-group-item bg-light">Users</Link>
		        <Link to="/posts"    className="list-group-item list-group-item bg-light">Posts</Link>
		        <Link to="/comments" className="list-group-item list-group-item bg-light">Comments</Link>
		    </div>
		</div>
	);

}

export default Sidebar;