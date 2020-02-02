import React, { Fragment } from 'react';

//redux && redux actions
import { connect } from 'react-redux';

const Alert = ({ success, errors }) => {

	return(
		<Fragment>
			{ success !== "" ? 
				<div className="d-flex flex-row justify-content-center alert alert-success py-2">
				    <p className="text-center">{ success }</p>  
				</div>
			: null }

			{ errors && errors !== undefined && errors !== null && errors.length > 0 ?
				[ errors.map((error, index) => (
					<div className="d-flex flex-row justify-content-center alert alert-danger py-2" key={ index }> 
					    <p className="text-center">{ error }</p>  
					</div>
				))]
			: null }
		</Fragment>
	);

}

const mapStateToProps = (state) => ({
	success: state.alert.success,
	errors:  state.alert.errors
});

export default connect(
	mapStateToProps,
	{ }
)(Alert);
