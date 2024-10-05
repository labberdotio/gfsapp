
// 
// Copyright (c) 2020, 2021, 2022, 2023, 2024, John Grundback
// All rights reserved.
// 

import React, { useState, Fragment, Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux'

import {
	Link, 
	useParams, 
	useNavigate
} from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import AppsIcon from '@mui/icons-material/Apps';
import ExtensionIcon from '@mui/icons-material/Extension';

import ComputerIcon from '@mui/icons-material/Computer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputBase from '@mui/material/InputBase';

import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
// import MuiLink from '@mui/material/Link';

import Drawer from './Drawer';

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

const ThemeContext = React.createContext();

// const drawerWidth1 = 48; // 73;
// const drawerWidth2 = 240;
const drawerWidth = 240;


// theme.js - Our core theme
const theme = {
}

class ThemeProvider extends React.Component {
	render() {
		return (
			<ThemeContext.Provider value={this.props.theme}>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}

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

// function AppNavigation({ classes, variant, types, children }) {
function AppNavigation({ classes, variant, types, children }) {

	const {namespace} = useParams();

	const name = useSelector(state => state.api.name);
	const title = useSelector(state => state.api.title);
	const description = useSelector(state => state.api.description);

	// const apiHostname = useSelector(state => state.api.api.host);
	// const apiPort = useSelector(state => state.api.api.port);
	// const wsHostname = useSelector(state => state.api.ws.host);
	// const wsPort = useSelector(state => state.api.ws.port);

	// const namespace = useSelector(state => state.namespace);

	// const {namespace} = useParams();

	const apiHostname = useSelector(state => state.api.api.host);
	const apiPort = useSelector(state => state.api.api.port);
	const wsHostname = useSelector(state => state.api.ws.host);
	const wsPort = useSelector(state => state.api.ws.port);

	/*
	 * host:port
	 */
	const apiHostnamePort = String(apiHostname) + ":" + String(apiPort);
	const wsHostnamePort = String(wsHostname) + ":" + String(wsPort);

	const snamespaces = useSelector(state => state.namespaces);

	var namespaces = undefined;

	if( snamespaces && snamespaces[apiHostname] && snamespaces[apiHostname]["namespaces"] ) {
		namespaces = snamespaces[apiHostname]["namespaces"];
	}	

	var logouturl = "/logout";
	if( namespace ) {
		logouturl = "/logout?" + namespace;
	}

	var currentns = "Namespaces";
	if( namespace ) {
		currentns = namespace;
	}

	const handleDrawerToggle = () => {
		// onDrawerToggle();
	}

	const handleDrawerClose = () => {
		// onDrawerToggle();
	}

	const selectNamespace = () => {
		// onDrawerToggle();
	}

	const container = undefined;

	var topitems = [{
		"text": currentns, // "Namespaces", 
		"path": "/namespaces", 
		"icon": <AppsIcon/>, 
		"selected": true
	}
	// , 
	// {
	// 	"text": "Dashboard", 
	// 	"path": "/dashboard", 
	// 	"icon": <DashboardIcon/>, 
	// 	"selected": true
	// }
	// , 
	// {
	// 	"text": "Queries", 
	// 	"path": "/namespaces/" + currentns + "/queries", 
	// 	"icon": <QueryBuilderIcon/>, 
	// 	"selected": false
	// }, {
	// 	"text": "Templates", 
	// 	"path": "/namespaces/" + currentns + "/templates", 
	// 	"icon": <InsertDriveFileIcon/>, 
	// 	"selected": false
	// }, {
	// 	"text": "Views", 
	// 	"path": "/namespaces/"+ currentns + "/views", 
	// 	"icon": <DescriptionIcon/>, 
	// 	"selected": false
	// }
	];

	if( namespace ) {
		var topitems = [{
			"text": currentns, // "Namespaces", 
			"path": "/namespaces/" + currentns, // "/namespaces", 
			"icon": <AppsIcon/>, 
			"selected": true
		}];
	}

	/*
	 * I have this idea of showing per type specifics here
	 */
	var miditems = [];
	// if( (types) && (types["data"]) ) {
	if( (types) && ("data" in types) && (types["data"]) ) {
		for( var typeid in types["data"] ) {
			if( typeid ) {
				var type = types["data"][typeid];
				if( type ) {
					miditems.push({
						"text": type["_name"], 
						// "path": "/namespaces/" + currentns + "/" + type["_name"], 
						"path": "/namespaces/" + currentns + "/" + type["_label"] + "/" + type["_id"], 
						"icon": <ExtensionIcon/>, 
						"selected": false
					});
				}
			}
		}
	}

	var lowitems = [];

	var navitems = [];

	if( topitems ) {
		for( var idx in topitems ) {
			var item = topitems[idx];
			navitems.push(
				<>
				<ListItem 
					button 
					selected={item.selected} 
					component={Link} 
					to={item.path} 
					// onClick={onItemClick(title)} 
					title={item.text} 
				>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText>{item.text}</ListItemText>
				</ListItem>
				</>
			);
		}
	}

	navitems.push(
		<>
		<Divider />
		</>
	);

	if( miditems ) {
		for( var idx in miditems ) {
			var item = miditems[idx];
			navitems.push(
				<>
				<ListItem 
					button 
					selected={item.selected} 
					component={Link} 
					to={item.path} 
					// onClick={onItemClick(title)} 
					title={item.text} 
				>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText>{item.text}</ListItemText>
				</ListItem>
				</>
			);
		}
	}

	navitems.push(
		<>
		<Divider />
		</>
	);

	if( lowitems ) {
		for( var idx in lowitems ) {
			var item = lowitems[idx];
			navitems.push(
				<>
				<ListItem 
					button 
					selected={item.selected} 
					component={Link} 
					to={item.path} 
					// onClick={onItemClick(title)} 
					title={item.text} 
				>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText>{item.text}</ListItemText>
				</ListItem>
				</>
			);
		}
	}

	navitems.push(
		<>
		<Divider />
		</>
	);

	var toolbaritems = [];

	toolbaritems.push(
		<>
		<MuiLink color="inherit" href="/namespaces">
		<Typography variant="h6" noWrap>
			{title}			
		</Typography>
		</MuiLink>
		</>
	);

	toolbaritems.push(
		<>
		<div className="">
			<div className="">
				<ComputerIcon/>
			</div>
			<InputBase
				placeholder="API"
				value={apiHostnamePort}
				// classes={{
				// 	root: classes.inputRoot,
				// 	input: classes.inputInput,
				// }}
				inputProps={{ 'aria-label': 'search' }}
			/>
		</div>
		</>
	);

	toolbaritems.push(
		<>
		<div className="">
			<div className="">
				<NotificationsIcon/>
			</div>
			<InputBase
				placeholder="WS"
				value={wsHostnamePort}
				// classes={{
				// 	root: classes.inputRoot,
				// 	input: classes.inputInput,
				// }}
				inputProps={{ 'aria-label': 'search' }}
			/>
		</div>
		</>
	);

	toolbaritems.push(
		<>
		<div className="">
						{namespaces && namespaces.data &&
							<>
							{/* <div className={classes.searchIcon}>
								<CodeIcon/>
							</div> */}
							<FormControl 
								variant="filled" 
								// className={classes.formControl}
							>
								<InputLabel 
									htmlFor="filled-namespace-native-simple" 
									// className={classes.formControlLabel}
								>
									Namespace
								</InputLabel>
								<Select
									native
									value={namespace}
									// onClick={() => selectNamespace(namespace)}
									onChange={(event) => selectNamespace(event.target.value)}
									inputProps={{
										
									}} 
									InputLabelProps={{
										// className: classes.floatingLabelFocusStyle,
									}} 
									// className={classes.formSelect} 
								>
									<option aria-label="None" value=""/>
									<>
									{namespaces.data.map(function(namespace, idx) {
										return (
											<option value={namespace}>{namespace}</option>	
										)
									})}
									</>
								</Select>
							</FormControl>
							</>
						}
					</div>
		</>
	);

	return (
		<>
		<Drawer 
			variant="permanent" 
			title={title} 
			toolbaritems={toolbaritems} 
			navitems={navitems} 
		>
			{children}
		</Drawer>
		</>
	);

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

// const Navigation = withStyles(styles)(AppNavigation);
const Navigation = AppNavigation;

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

		// const { classes } = this.props;
		const {
			api, 
			namespace, 
			types
		} = this.props;

		return (
			<>
			<ThemeProvider theme={theme}>
			<React.Fragment>
			<CssBaseline />
			<Navigation 
				ref={this.navigationRef} 
				namespace={namespace} 
				types={types}>
				{this.props.children}
			</Navigation>
			<Notification 
				ref={this.notificationRef} 
				namespace={namespace} 
				types={types} 
			/>
			</React.Fragment>
			</ThemeProvider>
			</>
		);
	}

}

// AppNavigation.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

// AppNotification.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

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

// export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))));
export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(App)));
