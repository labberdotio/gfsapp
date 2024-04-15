
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, { useState, Fragment, Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import clsx from 'clsx';

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

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ComputerIcon from '@material-ui/icons/Computer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CodeIcon from '@material-ui/icons/Code';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MuiLink from '@material-ui/core/Link';

// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { fade, alpha, makeStyles, useTheme } from '@material-ui/core/styles';

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

// import DashboardIcon from '@material-ui/icons/Dashboard';
// import DashboardView from './components/Dashboard'

// import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

// import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// import DescriptionIcon from '@material-ui/icons/Description';

import CreateInstanceDialog from './components/Create'

import ExtensionIcon from '@material-ui/icons/Extension';
import AppsIcon from '@material-ui/icons/Apps';

// import InstancesView from './components/Instances'
// import InstanceView from './components/Instance'

import RootInstancesView from './components/RootInstances'
import RootInstanceView from './components/RootInstance'

// import SubInstancesView from './components/SubInstances'
// import SubInstanceView from './components/SubInstance'
import RelInstanceView from './components/RelInstance'

import Namespaces from './components/Namespaces'

const ThemeContext = React.createContext();

// const drawerWidth1 = 48; // 73;
// const drawerWidth2 = 240;
const drawerWidth = 240;

const styles = theme => ({

	root: {
		display: 'flex',
		flexGrow: 1
	},

	flex: {
		flex: 1
	},

	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},

	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},

	menuButton: {
		marginRight: 36,
	},

	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},

	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	inputRoot: {
		color: 'inherit',
	},

	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
			[theme.breakpoints.up('xl')]: {
			width: '20ch',
		},
	},

	hide: {
		display: 'none',
	},

	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},

	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},

	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},

	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},

	content: {
		flexGrow: 1,
		padding: theme.spacing(0),
	  },

	formControl: {
		color: 'inherit',
		minWidth: '20ch',
	},

	formControlLabel: {
		color: 'inherit',
	},

	formSelect: {
		color: 'inherit',
		minWidth: '20ch',
	},

	formControl: {
		// '.MuiFormLabel-root': {
		// 	color: 'inherit',
		// },
		'& .MuiFormLabel-root': {
			color: 'inherit',
		},
		// '.MuiFilledInput-root': {
		// 	backgroundColor: 'transparent',
		// },
		'& .MuiFilledInput-root': {
			backgroundColor: 'transparent',
		},
		// '.MuiSvgIcon-root': {
		// 	color: 'inherit',
		// },
		'& .MuiSvgIcon-root': {
			color: 'inherit',
		},
	},

});

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
	if( types["data"] ) {
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

// const AppToolbar = withStyles(styles)(function({ classes, title, open, onMenuClick, onDrawerToggle, namespace }) {
const AppToolbar = withStyles(styles)(function({ classes, title, open, onMenuClick, onDrawerToggle }) {

	const {namespace} = useParams();

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

	const handleDrawerToggle = () => {
		onDrawerToggle();
	}

	const selectNamespace = (namespace) => {
		// history.push("/namespaces/" + namespace);
		window.location.href = "/namespaces/" + namespace;
	}

	return (
		<Fragment>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})} >
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})} >
						<MenuIcon />
					</IconButton>
					<MuiLink color="inherit" href="/namespaces">
					<Typography variant="h6" noWrap>
						{title}			
					</Typography>
					</MuiLink>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<ComputerIcon/>
						</div>
						<InputBase
							placeholder="API"
							value={apiHostnamePort}
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>

					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<NotificationsIcon/>
						</div>
						<InputBase
							placeholder="WS"
							value={wsHostnamePort}
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>

					{/* <div className={classes.search}>
						<div className={classes.searchIcon}>
							<CodeIcon/>
						</div>
						<InputBase
							placeholder="Namespace"
							value={namespace}
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div> */}

					<div className={classes.search}>
						{namespaces && namespaces.data &&
							<>
							{/* <div className={classes.searchIcon}>
								<CodeIcon/>
							</div> */}
							<FormControl variant="filled" className={classes.formControl}>
								<InputLabel htmlFor="filled-namespace-native-simple" className={classes.formControlLabel}>
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
										className: classes.floatingLabelFocusStyle,
									}} 
									className={classes.formSelect} >
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

				</Toolbar>
			</AppBar>
			<div className={classes.toolbarMargin} />
		</Fragment>
	);
});

// const AppDrawer = withStyles(styles)(function({ classes, variant, open, onClose, onItemClick, onDrawerToggle, namespace, types }) {
const AppDrawer = withStyles(styles)(function({ classes, variant, open, onClose, onItemClick, onDrawerToggle, types }) {

	const {namespace} = useParams();

	const name = useSelector(state => state.api.name);
	const title = useSelector(state => state.api.title);
	const description = useSelector(state => state.api.description);

	// const apiHostname = useSelector(state => state.api.api.host);
	// const apiPort = useSelector(state => state.api.api.port);
	// const wsHostname = useSelector(state => state.api.ws.host);
	// const wsPort = useSelector(state => state.api.ws.port);

	// const namespace = useSelector(state => state.namespace);

	var currentns = "Namespaces";
	if( namespace ) {
		currentns = namespace;
	}

	const handleDrawerToggle = () => {
		onDrawerToggle();
	}

	const handleDrawerClose = () => {
		onDrawerToggle();
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
	if( types["data"] ) {
		for( var typeid in types["data"] ) {
			if( typeid ) {
				var type = types["data"][typeid];
				if( type ) {
					miditems.push({
						"text": type["_name"], 
						"path": "/namespaces/" + currentns + "/" + type["_name"], 
						"icon": <ExtensionIcon/>, 
						"selected": false
					});
				}
			}
		}
	}

	var lowitems = [];

	return (
		<>
		<Drawer 
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}} >
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>
				<Container 
					style={{minHeight: 0}}
					>
				</Container>
				<Container>
					<h1 style={{display: 'none'}}>{name}</h1>
					<h2 style={{display: 'none'}}>{title}</h2>
					<p style={{display: 'none'}}>{description}</p>
				</Container>
				<Divider />
				<List>

						{topitems.map((item, index) => (
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
						))}

						<Divider />

						{miditems.map((item, index) => (
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
						))}

						<Divider />

						{lowitems.map((item, index) => (
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
						))}

				</List>

		</Drawer>
		</>
	);

});

// function AppNavigation({ classes, variant, namespace, types, children }) {
function AppNavigation({ classes, variant, types, children }) {

	const {namespace} = useParams();

	const title = useSelector(state => state.api.title);

	const dispatch = useDispatch();

	// const [drawer, setDrawer] = useState(false);
	// const toggleDrawer = () => {
	// 	setDrawer(!drawer);
	// };

	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
	  setOpen(true);
	};
  
	const handleDrawerClose = () => {
	  setOpen(false);
	};

	const closeDrawer = () => {
		setOpen(false);
	};

	const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<div className={classes.root}>
			<AppToolbar 
				title={title} 
				open={open} 
				onMenuClick={toggleDrawer} 
				onDrawerToggle={toggleDrawer} 
				onCloseToggle={closeDrawer} 
				namespace={namespace} 
				types={types} />
			<nav 
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}} >
			<AppDrawer 
				open={open} 
				onClose={toggleDrawer} 
				onDrawerToggle={toggleDrawer} 
				onCloseToggle={closeDrawer} 
				// onItemClick={onItemClick} 
				variant={variant} 
				namespace={namespace} 
				types={types} />
			</nav>
			<main
				className={classes.content} >
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
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

/*
 * https://github.com/remix-run/react-router/issues/8146
 */

function withNavigation(Component) {
	return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

// const Navigation = withParams(withStyles(styles)(AppNavigation));
// const Notification = withParams(withStyles(styles)(AppNotification));

const Navigation = withStyles(styles)(AppNavigation);
const Notification = withStyles(styles)(AppNotification);

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
				types={types} />
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

// export default withStyles(styles)(App);
// export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
export default withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
