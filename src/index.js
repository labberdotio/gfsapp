
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
// import { namespace, namespaces } from './reducers/Namespace';
import { namespaces } from './reducers/Namespace';
import { entity, entities } from './reducers/Entity';

import NamespaceService from './services/Namespace';
import EntityService from './services/Entity';

import { addApi, selectApi } from './actions/Api'

import App from './App.js';

require('./style.css');
require('./index.css');

/*
 * Defaults
 */
var namespace = process.env.REACT_APP_GFS_FS_NAME || 'gfs1';
var apiHostname = process.env.REACT_APP_GFS_API_HOST || 'gfsapi';
var apiPort = process.env.REACT_APP_GFS_API_PORT || 5000;
var wsHostname = process.env.REACT_APP_GFS_WS_HOST || 'gfsapi';
var wsPort = process.env.REACT_APP_GFS_WS_PORT || 5002;

/*
 * Overrides
 */
if( window._env_ ) {
	namespace = window._env_.REACT_APP_GFS_FS_NAME;
	apiHostname = window._env_.REACT_APP_GFS_API_HOST;
	apiPort = window._env_.REACT_APP_GFS_API_PORT;
	wsHostname = window._env_.REACT_APP_GFS_WS_HOST;
	wsPort = window._env_.REACT_APP_GFS_WS_PORT;
}

const name = apiHostname;
const description = 'GFS UI Builder';
const title = 'GFS UI Builder';

// console.log(' >> INIT STATE: apiHostname: ' + apiHostname);
// console.log(' >> INIT STATE: apiPort: ' + apiPort);
// console.log(' >> INIT STATE: wsHostname: ' + wsHostname);
// console.log(' >> INIT STATE: wsPort: ' + wsPort);

const initialState = {
	api: {
	},
	apis: {
	},
	// namespace: {
	// },
	namespaces: [
	],
};

const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
	api,
	apis,
	// namespace,
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

var defaultEndpoint = {
	name: name,
	title: title,
	description: description,
	namespace: namespace,
	api: {
		host: apiHostname,
		port: apiPort
	},
	ws: {
		host: wsHostname,
		port: wsPort
	}
}

store.dispatch(addApi(defaultEndpoint));
store.dispatch(selectApi(defaultEndpoint));

const rootElement = document.getElementById("root");
ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>, 
	rootElement
);
