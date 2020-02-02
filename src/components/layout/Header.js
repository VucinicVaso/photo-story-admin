import React, { Fragment } from 'react';
import { Link }            from 'react-router-dom';

//redux && redux actions
import { connect }     from 'react-redux';
import { logoutAdmin } from '../../actions/registerActions';

const Header = ({ token, isAuthenticated, logoutAdmin }) => {

    return (
		<nav className="navbar navbar-expand-lg sticky-top navbar-dark nav-dark-blue border-bottom border-white py-0">
			<div className="container-fluid px-0">
			
				<Link className="navbar-brand" to="/">PhotoStoryAdmin</Link>

				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
				aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

			  	<div className="collapse navbar-collapse" id="basicExampleNav">

					<ul className="navbar-nav mr-auto"></ul>

					<ul className="navbar-nav justify-content-right">
					{ isAuthenticated === true ?
			    		<Fragment>
							<li className="nav-item">
								<Link className="nav-link pt-3" to="/admin">Profile</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link pt-3" to="/logout" onClick={()  => { logoutAdmin(token); }}>Logout</Link>
							</li>
			    		</Fragment>
					:
			    		<Fragment>
							<li className="nav-item">
								<Link className="nav-link pt-3" to="/login">Login</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link pt-3" to="/register">Register</Link>
							</li>
						</Fragment>
					}
					</ul>

				</div>
			
		  	</div>
		</nav>
    );

}

const mapStateToProps = (state) => ({
	token: state.admin.token,
    isAuthenticated: state.admin.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ logoutAdmin }
)(Header);
