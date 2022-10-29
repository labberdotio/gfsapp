
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

import React, { useState, Fragment, Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history';

import clsx from 'clsx';

// import { Router, Switch, Route, Link } from "react-router-dom";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
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

// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';

import { loadEntitiesIntoState } from './actions/Entity'
import { getEntitiesFromState } from './stores/Entity'

import DashboardIcon from '@material-ui/icons/Dashboard';
import DashboardView from './components/Dashboard'

// import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

// import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// import DescriptionIcon from '@material-ui/icons/Description';

import CreateInstanceDialog from './components/Create'

import ExtensionIcon from '@material-ui/icons/Extension';
// import InstancesView from './components/Instances'
// import InstanceView from './components/Instance'

import RootInstancesView from './components/RootInstances'
import RootInstanceView from './components/RootInstance'

import Namespaces from './components/Namespaces'

const history = createBrowserHistory();

const ThemeContext = React.createContext();

const drawerWidth1 = 48; // 73;
const drawerWidth2 = 240;

const styles = theme => ({

	root: {
		display: 'flex',
		flexGrow: 1
	},

	flex: {
		flex: 1
	},

	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth1,
			flexShrink: 0,
			overflow: 'hidden',
		},
		[theme.breakpoints.up('md')]: {
			width: drawerWidth2,
			flexShrink: 0,
			overflow: 'hidden',
		},
		position: 'relative',
		top: '64px'
	},

	drawerFull: {
		// [theme.breakpoints.up('sm')]: {
		// 	width: drawerWidth1,
		// 	flexShrink: 0,
		// },
		// [theme.breakpoints.up('md')]: {
		width: drawerWidth2,
		flexShrink: 0,
		// },
	},

	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		// [theme.breakpoints.up('sm')]: {
		// 	width: `calc(100% - ${drawerWidth1}px)`,
		// 	marginLeft: drawerWidth1,
		// },
		// [theme.breakpoints.up('md')]: {
		// 	width: `calc(100% - ${drawerWidth2}px)`,
		// 	marginLeft: drawerWidth2,
		// },
	},

	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			// display: 'none',
		},
		[theme.breakpoints.up('md')]: {
			// display: 'none',
		},
	},

	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		// backgroundColor: fade(theme.palette.common.white, 0.15),
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			// backgroundColor: fade(theme.palette.common.white, 0.25),
			backgroundColor: alpha(theme.palette.common.white, 0.25),
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
			[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},

	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		position: "relative",
		// // width: drawerWidth2,
		// [theme.breakpoints.up('sm')]: {
		// 	width: drawerWidth1,
		// },
		// [theme.breakpoints.up('md')]: {
		// 	width: drawerWidth2,
		// },
		width: drawerWidth1,
		overflowX: "hidden"
	},

	content: {
		flexGrow: 1,
		padding: 0, // theme.spacing(3),
		position: 'relative',
		top: '64px'
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
	if( types ) {
		for( var typeid in types ) {
			if( typeid ) {
				var type = types[typeid];
				if( (type) && (type["name"] == typename) ) {
					return type;
				}
			}
		}
	}
	return undefined;
}

const AppToolbar = withStyles(styles)(function({ classes, title, open, onMenuClick, onDrawerToggle }) {

	const apiHostname = useSelector(state => state.api.api.host);
	const apiPort = useSelector(state => state.api.api.port);
	const wsHostname = useSelector(state => state.api.ws.host);
	const wsPort = useSelector(state => state.api.ws.port);

	/*
	 * host:port
	 */
	const apiHostnamePort = String(apiHostname) + ":" + String(apiPort);
	const wsHostnamePort = String(wsHostname) + ":" + String(wsPort);

	// const namespace = useSelector(state => state.api.namespace);
	const namespace = useSelector(state => state.namespace["current"]);

	const handleDrawerToggle = () => {
		onDrawerToggle();
	}

	return (
		<Fragment>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton} >
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{title}
					</Typography>

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

					<div className={classes.search}>
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
					</div>

				</Toolbar>
			</AppBar>
			<div className={classes.toolbarMargin} />
		</Fragment>
	);
});

// const AppDrawer = withStyles(styles)(function({ classes, variant, open, onClose, onItemClick, onDrawerToggle }) {
const AppDrawer = withStyles(styles)(function({ classes, variant, open, onClose, onItemClick, onDrawerToggle, types }) {

	const name = useSelector(state => state.api.name);
	const title = useSelector(state => state.api.title);
	const description = useSelector(state => state.api.description);

	// const apiHostname = useSelector(state => state.api.api.host);
	// const apiPort = useSelector(state => state.api.api.port);
	// const wsHostname = useSelector(state => state.api.ws.host);
	// const wsPort = useSelector(state => state.api.ws.port);

	const handleDrawerToggle = () => {
		onDrawerToggle();
	}

	const container = undefined;

	var topitems = [{
		"text": "Namespaces", 
		"path": "/", 
		"icon": <ExtensionIcon/>, 
		"selected": true
	}, {
		"text": "Dashboard", 
		"path": "/dashboard", 
		"icon": <DashboardIcon/>, 
		"selected": true
	}
	// , 
	// {
	// 	"text": "Queries", 
	// 	"path": "/list/queries", 
	// 	"icon": <QueryBuilderIcon/>, 
	// 	"selected": false
	// }, {
	// 	"text": "Templates", 
	// 	"path": "/list/templates", 
	// 	"icon": <InsertDriveFileIcon/>, 
	// 	"selected": false
	// }, {
	// 	"text": "Views", 
	// 	"path": "/list/views", 
	// 	"icon": <DescriptionIcon/>, 
	// 	"selected": false
	// }
	];

	/*
	 * I have this idea of showing per type specifics here
	 */
	var miditems = [];
	if( types ) {
		for( var typeid in types ) {
			if( typeid ) {
				var type = types[typeid];
				if( type ) {
					miditems.push({
						"text": type["name"], 
						"path": "/list/" + type["name"], 
						"icon": <ExtensionIcon/>, 
						"selected": false
					});
				}
			}
		}
	}

	var lowitems = [];

	return (
		<Router history={history}>
			<nav className={classes.drawer}>
			<Hidden smUp implementation="css">
				<Drawer
					container={container}
					variant="temporary"
					anchor='left'
					open={open}
					onClose={handleDrawerToggle}
					classes={{
						paper: classes.drawerFull,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}} >
					<Container 
						style={{minHeight: 64}}
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
							>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText>{item.text}</ListItemText>
						</ListItem>
						</>
						))}

					</List>
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation="css">
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant="permanent"
					open >
					<div
						className={clsx({
							[classes.toolbarMargin]: variant === 'persistent'
						})}
					/>
					<Container 
						style={{minHeight: 0 /* 64 */ }}
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
							>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText>{item.text}</ListItemText>
						</ListItem>
						</>
						))}

					</List>
				</Drawer>
			</Hidden>
			</nav>
			<main className={classes.content}>
				<div>
				<Switch>
				<Route 
					exact 
					path="/" 
					render={
						(props) => 
							<>
							<Namespaces 
								{...props} />
							</>
					} />
				<Route 
					exact 
					path="/dashboard" 
					render={
						(props) => 
							<>
							<DashboardView 
								{...props} />
							</>
					} />
				<Route 
					exact 
					path="/list/:typename" 
					render={
						(props) => 
							<>
							<RootInstancesView 
								{...props} 
								type={getType(props, types)} />
							</>
					} />
				<Route 
					exact 
					path="/create/:typename" 
					render={
						(props) => 
							<>
							<CreateInstanceDialog 
								{...props} 
								type={getType(props, types)} />
							</>
					} />
				<Route 
					exact 
					path="/detail/:typename/:instanceid" 
					render={
						(props) => 
							<>
							<RootInstanceView 
								{...props} 
								type={getType(props, types)} />
							</>
					} />
				</Switch>
				</div>
			</main>
		</Router>
	);

});

// function AppNavigation({ classes, variant }) {
function AppNavigation({ classes, variant, types }) {

	const [drawer, setDrawer] = useState(false);

	const title = useSelector(state => state.api.title);

	const dispatch = useDispatch();

	const toggleDrawer = () => {
		setDrawer(!drawer);
	};

	return (
		<div className={classes.root}>
			<AppToolbar 
				title={title} 
				onMenuClick={toggleDrawer} 
				onDrawerToggle={toggleDrawer} 
				types={types} />
			<AppDrawer 
				open={drawer} 
				onClose={toggleDrawer} 
				onDrawerToggle={toggleDrawer} 
				// onItemClick={onItemClick} 
				variant={variant} 
				types={types} />
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

const Navigation = withStyles(styles)(AppNavigation)
const Notification = withStyles(styles)(AppNotification)

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

		if( (!this.props.tsloading) && (!this.props.tsloaded) && (!this.props.tsfailed) ) {
			this.props.loadTypes(api, namespace);
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

		if( (!this.props.tsloading) && (!this.props.tsloaded) && (!this.props.tsfailed) ) {
			this.props.loadTypes(api, namespace);
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

		// const { classes } = this.props;
		const {
			types
		} = this.props;

		return (
			<>
			<ThemeProvider theme={theme}>
			<React.Fragment>
			<CssBaseline />
			<Navigation 
				ref={this.navigationRef} 
				types={types} />
			<Notification 
				ref={this.notificationRef} 
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

		// loadTypes: (api, namespace) => dispatch(loadEntitiesIntoState(api, namespace, 'type')),
		loadTypes: (api, namespace) => dispatch(loadEntitiesIntoState(api, namespace, 'type')),

	}
}

function mapStateToProps(state) {

	const {
		api, 
		namespace, 
		entities
	} = state;

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
		tsloading: tsloading, 
		tsloaded: tsloaded, 
		tsfailed: tsfailed, 
		ttimestamp: ttimestamp, 
		types: types, 
	}

}

// export default withStyles(styles)(App);
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
