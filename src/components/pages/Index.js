import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// redux && redux actions
import { connect } from 'react-redux';

const Index = ({ isAuthenticated }) => {

	return(
		<div className="row justify-content-center text-uppercase two-color-div" id="page">
			{ isAuthenticated === true ? 
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center">
				<h1 className="text-center text-white">PhotoStory</h1>
			</div>			
			:
			<Fragment>
				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center">
					<Link to ="/login" className="text-white">Login</Link>
				</div>
				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center">
					<Link to ="/register" className="text-white">Register</Link>
				</div>
			</Fragment>
			}
		</div>
	);

}

const mapStateToProps = (state) => ({
    isAuthenticated: state.admin.isAuthenticated
});

export default connect(
    mapStateToProps,
    { }
)(Index);
