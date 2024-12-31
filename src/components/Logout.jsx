
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

// import * as React from 'react';
// import React, {Component} from 'react';
import React, { useState, Fragment, Component } from 'react';
import PropNamespaces from 'prop-types'
import { connect } from 'react-redux'

import {
	useParams, 
	useSearchParams, 
	useNavigate
} from "react-router-dom";

import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Layout from './Layout';
import Sidebar from './Sidebar';
import Header from './Header';
import List from './List';

class Logout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			drawerOpen: false, 
			namespace: undefined, 
			active: false, 
			status: undefined, 
			snackbarMessage: undefined, 
			snackbarOpen: false
		}

		var _this = this;

	}

	state = {
		drawerOpen: false, 
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
			api
		} = this.props;

		const drawerOpen = this.state.drawerOpen;

		function setDrawerOpen(setting) {
			_this.setState({
				drawerOpen: setting
			});
		}

		function toggleDrawerOpen() {
			_this.setState({
				drawerOpen: !_this.state.drawerOpen
			});
		}

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
			<Layout.Root
				drawerOpen={drawerOpen} 
				sx={[
					drawerOpen && {
						height: '100vh',
						overflow: 'hidden',
					},
				]}
				>
				<Layout.Header
					drawerOpen={drawerOpen} 
					toggleDrawerOpen={toggleDrawerOpen} 
				>
					<Header 
						drawerOpen={drawerOpen} 
						toggleDrawerOpen={toggleDrawerOpen} 
						api={api} 
						namespace={namespace} 
					>
						<IconButton 
							onClick={() => toggleDrawerOpen()} 
							color="neutral" 
							variant="plain" 
							sx={{
								marginRight: '10px !important', 
								color: 'rgb(97, 97, 97)'
							}}
						>
							<MenuIcon 
								sx={{
									color: 'rgb(97, 97, 97)'
								}}
							/>
						</IconButton>
						<Button 
							component="a" 
							href="/" 
							size="sm" 
							color="neutral" 
							variant="plain" 
							sx={{
								alignSelf: 'center', 
								fontSize: '1.25rem', 
								color: 'rgb(97, 97, 97)'
							}}
						>
							{namespace}
						</Button>
					</Header>
				</Layout.Header>
				<Layout.Sidebar>
					<Sidebar 
						api={api} 
						namespace={namespace} 				
					/>
				</Layout.Sidebar>
				<Layout.List>
					<List
						namespace={namespace} 
						selected={false}
					/>
				</Layout.List>
				<Layout.Main>
				STATUS: {status}
				</Layout.Main>
				<Layout.Side>
					
				</Layout.Side>
			</Layout.Root>
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
