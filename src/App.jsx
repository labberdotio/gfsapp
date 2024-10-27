
// 
// Copyright (c) 2020, 2021, 2022, 2023, 2024, John Grundback
// All rights reserved.
// 

import React, { useState, Fragment, Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Sheet from '@mui/joy/Sheet';
import Snackbar from '@mui/joy/Snackbar';

import { extendTheme } from '@mui/joy/styles';

import {
	Routes, 
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch, 
	useParams, 
	useNavigate
} from "react-router-dom";

class AppNotification extends Component {

	constructor(props) {
		super(props);
		this.state = {
			snackbarMessage: undefined,
			snackbarOpen: false
		}

		var _this = this;

		this.onCloseSnackbar = this.onCloseSnackbar.bind(this);

	}

	state = {
		snackbarMessage: undefined,
		snackbarOpen: false
	};

	showInSnackbar(message) {
		if( !this.state.snackbarOpen ) {
			// console.log(' >> AppNotification: showing snackbar message: ' + message);
			this.setState({
				snackbarMessage: message,
				snackbarOpen: true
			});
		} else {
			// console.log(' >> AppNotification: ignoring snackbar message: ' + message);
		}
	}

	onCloseSnackbar() {
		this.setState({
			snackbarMessage: undefined,
			snackbarOpen: false
		});
	}

	render() {
		return (
			<>
			{/* <Snackbar
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
				}
			/> */}
			<Snackbar 
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={this.state.snackbarOpen}
				autoHideDuration={3000}
				message={this.state.snackbarMessage}
				variant="solid"
				onClose={() => this.onCloseSnackbar()}
			>
				{this.state.snackbarMessage}
			</Snackbar>
			</>
		);
	}

}

/*
 * https://github.com/remix-run/react-router/issues/8146
 */

function withNavigation(Component) {
	return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

// const Notification = withNavigation(withParams(withStyles(styles)(AppNotification)));
// const Notification = withStyles(styles)(AppNotification);
const Notification = AppNotification;

class App extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	constructor(props) {
		super(props);
		this.state = {
			drawerOpen: false
		}

		var _this = this;

		this.navigationRef = React.createRef();
		this.notificationRef = React.createRef();

	}

	state = {
		drawerOpen: false
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace
		} = this.props;

	}

	componentDidMount() {

		const {
			api, 
			namespace
		} = this.props;

	}

	render() {

		var _this = this;

		const {
			api, 
			namespace
		} = this.props;

		const drawerOpen = this.state.drawerOpen;

		// function setDrawerOpen(setting) {
		// 	_this.setState({
		// 		drawerOpen: setting
		// 	});
		// }

		// function toggleDrawerOpen() {
		// 	_this.setState({
		// 		drawerOpen: !_this.state.drawerOpen
		// 	});
		// }

		const theme = extendTheme({
			colorSchemes: {
				light: {
					palette: {
						neutral: {
							// plainColor: ..., 
							// plainActiveBg: ..., 
							solidColor: 'rgb(125, 125, 125)', 
							solidBg: '#333333', 
							solidActiveColor: 'white', 
							solidActiveBg: '#333333', 
							// solidHoverColor: ..., 
							solidHoverBg: '#333333'
						},
						primary: {
							// plainColor: ..., 
							// plainActiveBg: ..., 
							solidColor: 'white', 
							solidBg: '#333333', 
							solidActiveColor: 'white', 
							solidActiveBg: '#333333', 
							// solidHoverColor: ..., 
							solidHoverBg: '#333333'
						},
						background: {
							body: '#ffffff', 
							level1: '#f3f3f3', 
							level3: '#333333', 
							// active: ...
						},
						text: {
							primary: '#ffffff', 
							icon: '#ffffff'
						}
					},
				},
				dark: {
					palette: {
						neutral: {
							// plainColor: ..., 
							// plainActiveBg: ..., 
							solidColor: 'rgb(125, 125, 125)', 
							solidBg: '#333333', 
							solidActiveColor: 'white', 
							solidActiveBg: '#333333', 
							// solidHoverColor: ..., 
							solidHoverBg: '#333333'
						},
						primary: {
							// plainColor: ..., 
							// plainActiveBg: ..., 
							solidColor: 'white', 
							solidBg: '#333333', 
							solidActiveColor: 'white', 
							solidActiveBg: '#333333', 
							// solidHoverColor: ..., 
							solidHoverBg: '#333333'
						},
						background: {
							body: '#ffffff', 
							level1: '#f3f3f3', 
							level3: '#333333', 
							// active: ...
						},
						text: {
							primary: '#ffffff', 
							icon: '#ffffff'
						}
					},
				},
			},
		});

		return (
			// <CssVarsProvider disableTransitionOnChange>
			<CssVarsProvider theme={theme} disableTransitionOnChange>
				<CssBaseline />
				<>
				{this.props.children}
				</>
				<Notification 
					ref={this.notificationRef} 
					namespace={namespace} 
				/>
			</CssVarsProvider>
		);

	}

}

// App.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {
	}
}

function mapStateToProps(state, ownProps) {

	const {
		api, 
		// namespace,
	} = state;

	var namespace = undefined;
	if( ownProps && ownProps.params ) {
		namespace = ownProps.params.namespace;
	}

	return {
		api, 
		namespace: namespace
	}	

}

export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(App)));
