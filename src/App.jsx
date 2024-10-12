
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

import Layout from './components/Layout';
// import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

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

// import { loadEntitiesIntoState } from './actions/Entity'
// import { getEntitiesFromState } from './stores/Entity'

import {
	loadNamespacesIntoState
} from './actions/Namespace'

import {
	loadEntitiesIntoState, 
	invalidateEntitiesInState
} from './actions/Entity'

import {
	getNamespacesFromState
} from './stores/Namespace'

import {
	getEntitiesFromState
} from './stores/Entity'

function getType(props, types) {
	var typename = props["match"]["params"]["typename"];
	// if( (types) && (types["data"]) ) {
	if( (types) && ("data" in types) && (types["data"]) ) {
		for( var typeid in types["data"] ) {
			if( typeid ) {
				var type = types["data"][typeid];
				if( (type) && (type["_name"] == typename) ) {
					return type;
				}
			}
		}
	}
	return undefined;
}

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
			// 
		}

		var _this = this;

		this.navigationRef = React.createRef();
		this.notificationRef = React.createRef();

	}

	state = {
		// 
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace
		} = this.props;

		if( (!this.props.nsloading) && (!this.props.nsloaded) && (!this.props.nsfailed) ) {
			if( api ) {
				this.props.loadNamespaces(api);
			}
		}

		if( (!this.props.tsloading) && (!this.props.tsloaded) && (!this.props.tsfailed) ) {
			if( api && namespace ) {
				this.props.loadTypes(api, namespace);
			}
		}

		if( this.props.tsfailed ) {
			if( (this.notificationRef) && (this.notificationRef.current) ) {
				this.notificationRef.current.showInSnackbar(
					"Failed to load data from API"
				);
			}
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace
		} = this.props;

		if( (!this.props.nsloading) && (!this.props.nsloaded) && (!this.props.nsfailed) ) {
			if( api ) {
				this.props.loadNamespaces(api);
			}
		}

		if( (!this.props.tsloading) && (!this.props.tsloaded) && (!this.props.tsfailed) ) {
			if( api && namespace ) {
				this.props.loadTypes(api, namespace);
			}
		}

		if( this.props.tsfailed ) {
			if( (this.notificationRef) && (this.notificationRef.current) ) {
				this.notificationRef.current.showInSnackbar(
					"Failed to load data from API"
				);
			}
		}

	}

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			types
		} = this.props;

		const drawerOpen = false; // true;

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
				<Layout.Root
					sx={[
						// {
						// 	gridTemplateColumns: {
						// 	},
						// },
						drawerOpen && {
							height: '100vh',
							overflow: 'hidden',
						},
					]}
				>
					<Layout.Header>
						<Header 
							namespace={namespace} 
							types={types} 
						/>
					</Layout.Header>
					<Layout.Sidebar>
						<Sidebar 
							namespace={namespace} 
							types={types} 
						/>
					</Layout.Sidebar>
					{/* <Layout.Main>
						{this.props.children}
					</Layout.Main>
					<Layout.Side>
					</Layout.Side> */}
					{this.props.children}
				</Layout.Root>
				<Notification 
					ref={this.notificationRef} 
					namespace={namespace} 
					types={types} 
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

		loadNamespaces: (api) => dispatch(loadNamespacesIntoState(api)),

		// loadTypes: (api, namespace) => dispatch(loadEntitiesIntoState(api, namespace, 'type')),
		loadTypes: (api, namespace) => dispatch(loadEntitiesIntoState(api, namespace, 'type')),

		invalidateEntities: (api, resource) => dispatch(invalidateEntitiesInState(api, resource)),

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

	const {
		loading: nsloading, 
		loaded: nsloaded, 
		failed: nsfailed, 
		timestamp: nstimestamp, 
		namespaces: nsnamespaces
	} = getNamespacesFromState(state, api);

	const {
		loading: tsloading, 
		loaded: tsloaded, 
		failed: tsfailed, 
		timestamp: ttimestamp, 
		entities: types
	} = getEntitiesFromState(state, api, namespace, 'type');

	return {
		api, 
		namespace: namespace, 
		nsloading: nsloading, 
		nsloaded: nsloaded, 
		nsfailed: nsfailed, 
		nstimestamp: nstimestamp, 	
		namespaces: nsnamespaces, 
		tsloading: tsloading, 
		tsloaded: tsloaded, 
		tsfailed: tsfailed, 
		ttimestamp: ttimestamp, 
		types: types, 
	}

}

export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(App)));
