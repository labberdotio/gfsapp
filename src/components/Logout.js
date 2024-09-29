
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropNamespaces from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';

import debounce from 'lodash.debounce';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {
	Routes, 
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch, 
	useParams, 
	useSearchParams, 
	useNavigate
} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({

});

function handleClick(event) {
	// event.preventDefault();
}

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

		const { classes } = this.props;

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
			<Container 
				className={classes.logoutContainer} 
				className="logoutContainer" 
				maxWidth="false">

			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>

			<Breadcrumbs aria-label="breadcrumb">
				<Typography color="textPrimary">Logout</Typography>
			</Breadcrumbs>

			<Grid 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>

			STATUS: {status}

			</Grid>
			</Container>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={this.state.snackbarOpen}
				autoHideDuration={6000}
				onClose={() => this.onCloseSnackbar()}
				message={this.state.snackbarMessage}
				action={
					<React.Fragment>
					<Button color="secondary" size="small" onClick={() => this.onCloseSnackbar()}>
						Close
					</Button>
					<IconButton size="small" aria-label="close" color="inherit" onClick={() => this.onCloseSnackbar()}>
						<CloseIcon fontSize="small" />
					</IconButton>
					</React.Fragment>
				}/>
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

export default withSearchParams(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Logout))));
