
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

require('./style.css');
// require('./style.light.css');
// require('./style.dark.css');

require('./index.css');

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

const rootElement = document.getElementById("root");
ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>, 
	rootElement
);
