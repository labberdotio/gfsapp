
// 
// Copyright (c) 2020, 2021, 2022, 2023, 2024, John Grundback
// All rights reserved.
// 

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

// import { createBrowserHistory } from 'history';

// import { createStore, applyMiddleware } from 'redux'
// import { combineReducers } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
// import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { thunkMiddleware } from 'redux-thunk'
import {thunk} from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';

import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
// import { extendTheme } from '@mui/material/styles';

// import { orange } from '@mui/material/colors';
import { purple } from '@mui/material/colors';

import CssBaseline from '@mui/material/CssBaseline';
// import { CssVarsProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

import WSClient from './clients/WSClient'
import { api, apis } from './reducers/Api';
import { namespace, namespaces } from './reducers/Namespace';
// import { namespaces } from './reducers/Namespace';
import { entity, entities } from './reducers/Entity';

import NamespaceService from './services/Namespace';
import EntityService from './services/Entity';

// import { addNamespace, selectNamespace } from './actions/Namespace';
import { addApi, selectApi } from './actions/Api'

// import App from './App.js';
import App from './App.jsx';
// import App from './App.tsx';

// import InstancesView from './components/Instances'
// import InstanceView from './components/Instance'

import RootView from './components/Root'
import RootInstanceView from './components/RootInstance'
import RootInstancesView from './components/RootInstances'

// import SubInstancesView from './components/SubInstances'
// import SubInstanceView from './components/SubInstance'
import RelInstanceView from './components/RelInstance'

import Login from './components/Login'
// import Login from './components/Login2'
import Logout from './components/Logout'

import Namespaces from './components/Namespaces'
// import DashboardView from './components/Dashboard'
import DashboardView from './components/Dashboard2'
import ChatView from './components/Chat'

import CreateInstanceDialog from './components/Create'

import history from './history'

/*
 * Legacy Mui 4, pre Joy UI styling
 */
require('./style.css');
require('./style.light.css');
// require('./style.dark.css');

require('./index.css');

// const history = createBrowserHistory();

/*
 * Defaults
 */
// var dnamespace = process.env.REACT_APP_GFS_FS_NAME || 'gfs1';
var dapiHostname = process.env.REACT_APP_GFS_API_HOST || 'gfsapi';
var dapiPort = process.env.REACT_APP_GFS_API_PORT || 5000;
var dwsHostname = process.env.REACT_APP_GFS_WS_HOST || 'gfsapi';
var dwsPort = process.env.REACT_APP_GFS_WS_PORT || 5002;

/*
 * Overrides
 */
if( window._env_ ) {
	// dnamespace = window._env_.REACT_APP_GFS_FS_NAME;
	dapiHostname = window._env_.REACT_APP_GFS_API_HOST;
	dapiPort = window._env_.REACT_APP_GFS_API_PORT;
	dwsHostname = window._env_.REACT_APP_GFS_WS_HOST;
	dwsPort = window._env_.REACT_APP_GFS_WS_PORT;
}

const name = dapiHostname;
const description = 'GFS App';
const title = 'GFS App';

// console.log(' >> INIT STATE: apiHostname: ' + dapiHostname);
// console.log(' >> INIT STATE: apiPort: ' + dapiPort);
// console.log(' >> INIT STATE: wsHostname: ' + dwsHostname);
// console.log(' >> INIT STATE: wsPort: ' + dwsPort);

const initialState = {
	api: {
	},
	apis: {
	},
	namespace: {
	},
	namespaces: [
	],
};

const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
	api,
	apis,
	namespace,
	namespaces,
	entity,
	entities
});

const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(
		NamespaceService, 
		EntityService, 
		thunk, // thunkMiddleware, 
		loggerMiddleware
	)
)

// var defaultNamespace = dnamespace; 

var defaultEndpoint = {
	name: name,
	title: title,
	description: description,
	// account: account,
	// namespace: namespace,
	api: {
		host: dapiHostname,
		port: dapiPort
	},
	ws: {
		host: dwsHostname,
		port: dwsPort
	}
}

// store.dispatch(addNamespace(defaultNamespace));
// store.dispatch(selectNamespace(defaultNamespace));

store.dispatch(addApi(defaultEndpoint));
store.dispatch(selectApi(defaultEndpoint));

// function getType(props, types) {
// 	var typename = props["match"]["params"]["typename"];
// 	if( types ) {
// 		for( var typeid in types ) {
// 			if( typeid ) {
// 				var type = types[typeid];
// 				if( (type) && (type["_name"] == typename) ) {
// 					return type;
// 				}
// 			}
// 		}
// 	}
// 	return undefined;
// }

// Initialize the default MUI theme tokens
const defaultTheme = createTheme();

// Build your custom theme using tokens from the default theme
const theme = createTheme({
	cssVariables: true, // Enables theme.vars
	palette: {
		// Overriding the default primary color
		primary: {
			main: purple[500],
		},
	},
});

const rootElement = document.getElementById("root");
ReactDOM.render(
	<Provider store={store}>
	<ThemeProvider theme={theme}>
	<Router history={history}>
		<Routes>
			<Route 
				// exact 
				path="/" 
				element={
					<>
					<App >
					<Namespaces 
						 />
					</App>
					</>
				} />
			<Route 
				// exact 
				path="/login" 
				element={
					<>
					<App >
					<Login 
						 />
					</App>
					</>
				} />
			<Route 
				// exact 
				path="/logout" 
				element={
					<>
					<App >
					<Logout 
						 />
					</App>
					</>
				} />
			<Route 
				// exact 
			path="/account/:account/namespaces" 
				element={
					<>
					<App >
					<Namespaces 
						 />
					</App>
					</>
				} />
			<Route 
				// exact 
				path="/account/:account/namespaces/:namespace" 
				element={
					<>
					<App>
					<RootView/>
					</App>
					</>
				}/>
			<Route 
				// exact 
				path="/account/:account/namespaces/:namespace/dashboard" 
				element={
					<>
					<App>
					<DashboardView/>
					</App>
					</>
				} />
			<Route 
				// exact 
				path="/account/:account/namespaces/:namespace/chat" 
				element={
					<>
					<App>
					<ChatView/>
					</App>
					</>
				} />
			{/* <Route 
				// exact 
				path="/account/:account/namespaces/:namespace/:typename" 
				element={
					<>
					<App>
					<RootInstancesView/>
					</App>
					</>
				}
			/> */}
			<Route 
				// exact 
				path="/account/:account/namespaces/:namespace/create/:typename" 
				element={
					<>
					<App>
					<CreateInstanceDialog/>
					</App>
					</>
				}
			/>
			<Route 
				// exact 
				path="/account/:account/namespaces/:namespace/:typename/:instanceid" 
				element={
					<>
					<App>
					<RootInstanceView/>
					</App>
					</>
				}
			/>
			<Route 
				// exact 
				path="/account/:account/namespaces/:namespace/:typename/:instanceid/:relname" 
				element={
					<>
					<App>
					<RelInstanceView/>
					</App>
					</>
				}
			/>
		</Routes>
	</Router>
	</ThemeProvider>
	</Provider>, 
	rootElement
);
