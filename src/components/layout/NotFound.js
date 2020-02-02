import React from 'react';

const NotFound = () => {

	return (
		<div className="row justify-content-center" style={ notFoundStyle }>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-5">
		     	<div className="my-5 py-5">
		     		<h1 className="alert alert-danger text-center py-5 border border-white text-white">Page not found!</h1>
		     	</div>
			</div>
		</div>
	);

}

const notFoundStyle = {
    height: '500px' 
}

export default NotFound;