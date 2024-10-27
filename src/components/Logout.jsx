
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropNamespaces from 'prop-types'
import { connect } from 'react-redux'

import {
	useParams, 
	useSearchParams, 
	useNavigate
} from "react-router-dom";

import Layout from './Layout';

class Logout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			namespace: undefined, 
			active: false, 
			status: undefined, 
			snackbarMessage: undefined, 
			snackbarOpen: false
		}

		var _this = this;

	}

	state = {
		namespace: undefined, 
		active: false, 
		status: undefined, 
		snackbarMessage: undefined, 
		snackbarOpen: false
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api
		} = this.props;

	}

	componentDidMount() {

		const {
			api
		} = this.props;

		var scnamespace = this.props.searchParams[0].get("namespace");
		if( scnamespace ) {
			this.setNamespace(scnamespace);
		}

		var cnamespace = localStorage.getItem("jwt-namespace");
		if( cnamespace ) {
			this.setNamespace(cnamespace);
		}

		// 
		this.unsetToken(cnamespace);

	}

	unsetToken(namespace) {
		var _this = this;
		_this.setStatus("Logging out...");
		_this.showInSnackbar("Logging out...");
		console.log("Logging out...");
		localStorage.removeItem('jwt-token');
		// Redirect here
		// router.push(...)
		console.log("Redirecting to login.");
		window.location.href = "/login?namespace=" + namespace;
	}

	showInSnackbar(message) {
		var _this = this;
		if( !_this.state.snackbarOpen ) {
			_this.setState({
				snackbarMessage: message,
				snackbarOpen: true
			});
		} else {
		}
	}

	onCloseSnackbar() {
		this.setState({
			snackbarMessage: undefined,
			snackbarOpen: false
		});
	}

	setNamespace(namespace) {
		var _this = this;
		_this.setState({
			namespace: namespace
		});
	}

	setActive(active) {
		var _this = this;
		_this.setState({
			active: active
		});
	}

	setStatus(status) {
		var _this = this;
		_this.setState({
			status: status
		});
	}

	render() {

		var _this = this;

		const {
			
		} = this.props;

		var backdropOpen = false;

		// var scnamespace = this.props.searchParams[0].get("namespace");
		var namespace = _this.state.namespace;
		var status = _this.state.status;

		var cnamespace = namespace;
		// if( !namespace ) {
		// 	if( scnamespace ) {
		// 		cnamespace = scnamespace;
		// 	}
		// }

		/*
		 * Do not do this here, as it can cause an endless state update loop.
		 */
		// this.unsetToken(cnamespace);

		return (
			<>
			<Layout.Breadcrumb>
			{/* <Breadcrumbs aria-label="breadcrumb">
				<Typography color="textPrimary">Logout</Typography>
			</Breadcrumbs> */}
			</Layout.Breadcrumb>
			<Layout.Main>
			STATUS: {status}
			</Layout.Main>
			</>
		);
	}

}

Logout.propNamespaces = {
	dispatch: PropNamespaces.func.isRequired
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

function mapStateToProps(state, ownProps) {

	const {
		api
	} = state;

	return {
		api	
	}

}

/*
 * https://github.com/remix-run/react-router/issues/8146
 */

function withNavigation(Component) {
	return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
	return params => <Component {...params} params={useParams()} />;
}

function withSearchParams(Component) {
	return searchParams => <Component {...searchParams} searchParams={useSearchParams()} />;
}

// export default withSearchParams(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Logout))));
export default withSearchParams(withParams(connect(mapStateToProps, mapDispatchToProps)(Logout)));
