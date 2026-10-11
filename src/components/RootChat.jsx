
// 
// Copyright (c) 2020, 2021, 2022, 2023, 2024, 2026, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'

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

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
import Snackbar from '@mui/material/Snackbar';
import Drawer from '@mui/material/Drawer';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import APIClient from '../clients/APIClient';

import {
	loadNamespacesIntoState
} from '../actions/Namespace'

import {
	loadEntitiesIntoState, 
	invalidateEntitiesInState
} from '../actions/Entity'

import {
	getNamespacesFromState
} from '../stores/Namespace'

import {
	getEntitiesFromState
} from '../stores/Entity'

import Layout from './Layout';
import Sidebar from './Sidebar';
import Header from './Header';
import List from './List';

import AgenticChat from './AgenticChat';

export const BackNavButton = () => {
    let navigate = useNavigate();
    return (
        <>
			<Button
				size="small" 
				variant="text" 
				color="secondary" 
				startIcon={<ArrowBackIcon />} 
				onClick={() => navigate(-1)}
			>
				Back
			</Button>
        </>
    );
};

export const ForwardNavButton = () => {
    let navigate = useNavigate();
    return (
		<>
			<Button
				size="small" 
				variant="text" 
				color="secondary" 
				endIcon={<ArrowForwardIcon />} 
				onClick={() => navigate(+1)}
			>
				Forward
			</Button>
        </>
    );
};

// class RootChat extends Component {
const RootChat = class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			drawerOpen: false, 
			sideDrawerOpen: false, 
			// intendedcenter: undefined, 
			// actualcenter: undefined, 
			grfloading: false, 
			grfloaded: false, 
			grffailed: false, 
			graph: undefined, 
			pgraph: undefined, 
			mainWidth: 0, 
			mainHeight: 0,
			resize: false,
			snackbarMessage: undefined,
			snackbarOpen: false
		}

		var _this = this;

		// 

	}

	state = {
		drawerOpen: false, 
		sideDrawerOpen: false, 
		// intendedcenter: undefined, 
		// actualcenter: undefined, 
		grfloading: false, 
		grfloaded: false, 
		grffailed: false, 
		graph: undefined, 
		pgraph: undefined, 
		mainWidth: 0, 
		mainHeight: 0,
		resize: false,
		snackbarMessage: undefined,
		snackbarOpen: false
	};

	updateDimensions() {
		var resize = this.state.resize;
		this.setState({
			resize: !resize // this.state.resize
		});
	}

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		var _this = this;

		const {
			api, 
			account, 
			namespace
		} = this.props;

		if( _this.mainRef && _this.mainRef.current ) {
			if( _this.state.mainWidth != _this.mainRef.current.offsetWidth ) {
				if( _this.resizeTimeout ) {
					clearTimeout(_this.resizeTimeout);
				}
				_this.resizeTimeout = setTimeout(function() {
					if( _this.mainRef && _this.mainRef.current ) {
						_this.showInSnackbar("Readjusting size");
						_this.setState({
							mainWidth: _this.mainRef.current.offsetWidth, 
							mainHeight: _this.mainRef.current.offsetHeight
						});
					}
					_this.resizeTimeout = null;
				}.bind(this), 1000)
			}
		}

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
			if( api && account ) {
				this.props.loadNamespaces(api, account);
			}
		}

		if( (!this.props.types["loading"]) && 
			(!this.props.types["loaded"]) && 
			(!this.props.types["failed"]) ) {
			if( api && account && namespace ) {
				this.props.loadTypes(api, account, namespace);
			}
		}

		// if( this.props.tsfailed ) {
		// 	if( (this.notificationRef) && (this.notificationRef.current) ) {
		// 		this.notificationRef.current.showInSnackbar(
		// 			"Failed to load data from API"
		// 		);
		// 	}
		// }

        // 

	}

	componentDidMount() {

		var _this = this;

		const {
			api, 
			account, 
			namespace, 
			typename, 
			type, 
			schema
		} = this.props;

		if( _this.mainRef && _this.mainRef.current ) {
			if( _this.state.mainWidth != _this.mainRef.current.offsetWidth ) {
				if( _this.resizeTimeout ) {
					clearTimeout(_this.resizeTimeout);
				}
				_this.resizeTimeout = setTimeout(function() {
					if( _this.mainRef && _this.mainRef.current ) {
						_this.showInSnackbar("Readjusting size");
						_this.setState({
							mainWidth: _this.mainRef.current.offsetWidth, 
							mainHeight: _this.mainRef.current.offsetHeight
						});
					}
					_this.resizeTimeout = null;
				}.bind(this), 1000)
			}
		}

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
			if( api && account ) {
				this.props.loadNamespaces(api, account);
			}
		}

		if( (!this.props.types["loading"]) && 
			(!this.props.types["loaded"]) && 
			(!this.props.types["failed"]) ) {
			if( api && account && namespace ) {
				this.props.loadTypes(api, account, namespace);
			}
		}

		// if( this.props.tsfailed ) {
		// 	if( (this.notificationRef) && (this.notificationRef.current) ) {
		// 		this.notificationRef.current.showInSnackbar(
		// 			"Failed to load data from API"
		// 		);
		// 	}
		// }

		// 

		// 
		window.addEventListener("resize", this.updateDimensions);

	}

	componentWillUnmount() {

		// 
		window.removeEventListener("resize", this.updateDimensions);

	}	

	/*
	 * 
	 */

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

	render() {

		var _this = this;

		const {
			api, 
			account, 
			namespace, 
			namespaces, 
			types, 
			typename, 
			type, 
			schema
		} = this.props;

		const drawerOpen = this.state.drawerOpen;
		const sideDrawerOpen = this.state.sideDrawerOpen;

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

		function setSideDrawerOpen(setting) {
			_this.setState({
				sideDrawerOpen: setting
			});
		}

		function toggleSideDrawerOpen() {
			_this.setState({
				sideDrawerOpen: !_this.state.sideDrawerOpen
			});
		}

		var backdropOpen = false;

		// 

		return (
			<>
			<Layout.Root
				drawerOpen={drawerOpen} 
				sx={[
					drawerOpen && {
						height: '100vh',
						overflow: 'hidden',
					}
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
						types={types} 
					>
						{!drawerOpen &&
							<IconButton 
								onClick={() => toggleDrawerOpen()} 
								// color="neutral" 
								// variant="plain" 
								sx={{
									marginRight: '10px !important', 
									color: 'rgb(97, 97, 97)',
									'&:focus': {
										outline: 'none !important',
									}
								}}
							>
								<MenuIcon 
									sx={{
										color: 'rgb(97, 97, 97)'
									}}
								/>
							</IconButton>
						}
						{/* <Button 
							component="a" 
							href="/" 
							size="sm" 
							// color="neutral" 
							// variant="plain" 
							sx={{
								alignSelf: 'center', 
								fontSize: '1.25rem', 
								color: 'rgb(97, 97, 97)'
							}}
						>
							{namespace}
						</Button> */}
						<Button
							size="small" 
							variant="text" 
							color="secondary" 
						>
							{namespace}
						</Button>
						<Button onClick={toggleSideDrawerOpen}>Chat</Button>
					</Header>
				</Layout.Header>
				<Layout.Sidebar>
					<Sidebar 
						api={api} 
						account={account} 
						namespace={namespace} 
						types={types} 
					/>
				</Layout.Sidebar>

				<Layout.Full>
					<Paper 
						ref={this.mainRef} 
						sx={{
							// display: {
							// 	xs: 'inline-block', 
							// 	sm: 'inline-block', 
							// 	md: 'inline-block', 
							// 	lg: 'inline-block'
							// },
							width: "100%", 
							height: "100%", 
							position: "relative", 
							top: "0", 
							left: "0"
						}}
					>
					<AgenticChat/>
					</Paper>
					{/* <Snackbar 
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
					</Snackbar> */}
					<Snackbar 
						open={this.state.snackbarOpen} 
						autoHideDuration={3000} 
						onClose={() => this.onCloseSnackbar()} 
						message={this.state.snackbarMessage} 
					/>
				</Layout.Full>
				<Layout.Side>
					
				</Layout.Side>
			</Layout.Root>
			<Drawer 
				anchor={"right"} 
				open={sideDrawerOpen} 
				onClose={toggleSideDrawerOpen} 
				sx={{
					// display: { xs: 'none', sm: 'block' }, 
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: '1100px' }, 
					// width: '500px'
				}}
			>
				<AgenticChat
				/>
			</Drawer>
			</>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {

		loadNamespaces: (api, account) => dispatch(loadNamespacesIntoState(api, account)),

		// loadTypes: (api, account, namespace) => dispatch(loadEntitiesIntoState(api, account, namespace, 'type')),
		loadTypes: (api, account, namespace) => dispatch(loadEntitiesIntoState(api, account, namespace, 'type')),

		invalidateEntities: (api, resource) => dispatch(invalidateEntitiesInState(api, resource)),

	}
}

function mapStateToProps(state, ownProps) {

	const {
		api, 
		// account, 
		// namespace
	} = state;

	var account = undefined;
	if( ownProps && ownProps.params ) {
		account = ownProps.params.account;
	}

	var namespace = undefined;
	if( ownProps && ownProps.params ) {
		namespace = ownProps.params.namespace;
	}

	const namespaces = getNamespacesFromState(state, api, account);
	const types = getEntitiesFromState(state, api, account, namespace, 'type');

	return {
		api, 
		account: account, 
		namespace: namespace, 
		namespaces: namespaces, 
		types: types, 
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

// export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootChat))));
export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(RootChat)));
