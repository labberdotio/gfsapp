
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import { Router, Switch, Route, Link } from "react-router-dom";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
} from "react-router-dom";

// import { createBrowserHistory } from 'history';

// import { createStore, applyMiddleware } from 'redux'
// import { combineReducers } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
// import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';

import WSClient from './clients/WSClient'
import { api, apis } from './reducers/Api';
import { namespace, namespaces } from './reducers/Namespace';
// import { namespaces } from './reducers/Namespace';
import { entity, entities } from './reducers/Entity';

import NamespaceService from './services/Namespace';
import EntityService from './services/Entity';

// import { addNamespace, selectNamespace } from './actions/Namespace';
import { addApi, selectApi } from './actions/Api'

import App from './App.js';

// import InstancesView from './components/Instances'
// import InstanceView from './components/Instance'

// import RootInstancesView from './components/RootInstances'
import { makeRootInstancesView } from './components/RootInstances'

import RootInstanceView from './components/RootInstance'

// import RootView from './components/Root'
import { makeRootView } from './components/Root'

// import SubInstancesView from './components/SubInstances'
// import SubInstanceView from './components/SubInstance'
import RelInstanceView from './components/RelInstance'

import Namespaces from './components/Namespaces'

import CreateInstanceDialog from './components/Create'

import history from './history'

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

// console.log(' >> INIT STATE: apiHostname: ' + apiHostname);
// console.log(' >> INIT STATE: apiPort: ' + apiPort);
// console.log(' >> INIT STATE: wsHostname: ' + wsHostname);
// console.log(' >> INIT STATE: wsPort: ' + wsPort);

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
		thunkMiddleware, 
		loggerMiddleware
	)
)

// var defaultNamespace = dnamespace; 

var defaultEndpoint = {
	name: name,
	title: title,
	description: description,
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
// 				if( (type) && (type["name"] == typename) ) {
// 					return type;
// 				}
// 			}
// 		}
// 	}
// 	return undefined;
// }

const rootElement = document.getElementById("root");
ReactDOM.render(
	<Provider store={store}>
	<Router history={history}>
		<Switch>
			<Route 
				exact 
				path="/" 
				render={
					(props) => 
						<>
						<App >
						<Namespaces 
							 />
						</App>
						</>
				} />
			<Route 
				exact 
				path="/namespaces" 
				render={
					(props) => 
						<>
						<App >
						<Namespaces 
							 />
						</App>
						</>
				} />
			<Route 
				exact 
				path="/namespaces/:namespace" 
				render={
					(props) => {
						const RootView = makeRootView();
						return(<>
						<App 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
						>
						<RootView 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
						/>
						</App>
						</>);
					}
				}/>
			{/* <Route 
				exact 
				path="/dashboard" 
				render={
					(props) => 
						<>
						<App 
						>
						<DashboardView 
						/>
						</App>
						</>
				} /> */}
			<Route 
				exact 
				path="/namespaces/:namespace/:typename" 
				render={
					(props) => {
						const RootInstancesView = makeRootInstancesView();
						return(<>
						<App 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
						>
						<RootInstancesView 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
						/>
						</App>
						</>);
					}
				}
			<Route 
				exact 
				path="/namespaces/:namespace/create/:typename" 
				render={
					(props) => 
						<>
						<App 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
						>
						<CreateInstanceDialog 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
						/>
						</App>
						</>
				} />
			<Route 
				exact 
				path="/namespaces/:namespace/:typename/:instanceid" 
				render={
					(props) => 
						<>
						<App 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
							instanceid={props.match.params.instanceid} 
						>
						<RootInstanceView 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
							instanceid={props.match.params.instanceid} 
						/>
						</App>
						</>
				} />
			<Route 
				exact 
				path="/namespaces/:namespace/:typename/:instanceid/:relname" 
				render={
					(props) => 
						<>
						<App 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
							instanceid={props.match.params.instanceid} 
							relname={props.match.params.relname} 
						>
						<RelInstanceView 
							namespace={props.match.params.namespace} 
							typename={props.match.params.typename} 
							instanceid={props.match.params.instanceid} 
							relname={props.match.params.relname} 
						/>
						</App>
						</>
				} />
		</Switch>
	</Router>
	</Provider>, 
	rootElement
);
