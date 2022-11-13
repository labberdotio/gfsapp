
// 
// Copyright (c) 2022, John Grundback
// All rights reserved.
// 

// import APIClient from '../clients/APIClient';

// const ADD_NAMESPACE = 'ADD_NAMESPACE';
// const SELECT_NAMESPACE = 'SELECT_NAMESPACE';
// const CURRENT_NAMESPACE = 'CURRENT_NAMESPACE';
// const INVALIDATE_NAMESPACE = 'INVALIDATE_NAMESPACE';

const GET_NAMESPACES = 'GET_NAMESPACES';
const DO_GET_NAMESPACES = 'DO_GET_NAMESPACES';
const ON_GET_NAMESPACES = 'ON_GET_NAMESPACES';
const FAIL_GET_NAMESPACES = 'FAIL_GET_NAMESPACES';

// const GET_NAMESPACE = 'GET_NAMESPACE';
// const DO_GET_NAMESPACE = 'DO_GET_NAMESPACE';
// const ON_GET_NAMESPACE = 'ON_GET_NAMESPACE';
// const FAIL_GET_NAMESPACE = 'FAIL_GET_NAMESPACE';

const CREATE_NAMESPACE = 'CREATE_NAMESPACE';
const DO_CREATE_NAMESPACE = 'DO_CREATE_NAMESPACE';
const ON_CREATE_NAMESPACE = 'ON_CREATE_NAMESPACE';
const FAIL_CREATE_NAMESPACE = 'FAIL_CREATE_NAMESPACE';

// const UPDATE_NAMESPACE = 'UPDATE_NAMESPACE';
// const DO_UPDATE_NAMESPACE = 'DO_UPDATE_NAMESPACE';
// const ON_UPDATE_NAMESPACE = 'ON_UPDATE_NAMESPACE';
// const FAIL_UPDATE_NAMESPACE = 'FAIL_UPDATE_NAMESPACE';

const DELETE_NAMESPACE = 'DELETE_NAMESPACE';
const DO_DELETE_NAMESPACE = 'DO_DELETE_NAMESPACE';
const ON_DELETE_NAMESPACE = 'ON_DELETE_NAMESPACE';
const FAIL_DELETE_NAMESPACE = 'FAIL_DELETE_NAMESPACE';

// const INVALIDATE_NAMESPACES = 'INVALIDATE_NAMESPACES';
// const INVALIDATE_NAMESPACE = 'INVALIDATE_NAMESPACE';

// const REFRESH_NAMESPACES = 'REFRESH_NAMESPACES';
// const REFRESH_NAMESPACE = 'REFRESH_NAMESPACE';

/*
 * 
 */

// function addNamespace(namespace) {
// 	// console.log(" >> INVOKING ACTION: ADD_NAMESPACE ");
// 	// console.log(namespace);
// 	return {
// 		type: ADD_NAMESPACE,
// 		namespace
// 	};
// }

// function selectNamespace(namespace) {
// 	// console.log(" >> INVOKING ACTION: SELECT_NAMESPACE ");
// 	// console.log(namespace);
// 	return {
// 		type: SELECT_NAMESPACE,
// 		namespace
// 	};
// }

// function currentNamespace() {
// 	// console.log(" >> INVOKING ACTION: CURRENT_NAMESPACE ");
// 	return {
// 		type: CURRENT_NAMESPACE
// 	};
// }

// function invalidateNamespace(namespace) {
// 	// console.log(" >> INVOKING ACTION: INVALIDATE_NAMESPACE ");
// 	// console.log(namespace);
// 	return {
// 		type: INVALIDATE_NAMESPACE,
// 		namespace
// 	};
// }

/*
 * 
 */

function loadNamespacesIntoState(endpoint, accept = 'application/json') {
	// console.log(" >> loadNamespacesIntoState ");
	// console.log(endpoint);
	return {
		type: 'GET_NAMESPACES',
		endpoint: endpoint,
		accept: accept
	}
}

function getNamespaces(endpoint) {
	// console.log(" >> INVOKING ACTION: GET_NAMESPACES ");
	// console.log(endpoint);
	return {
		type: GET_NAMESPACES, 
		endpoint
	};
}

// function invalidateNamespacesInState(endpoint) {
// 	// console.log(" >> INVOKING ACTION: INVALIDATE_NAMESPACES ");
// 	// console.log(endpoint);
// 	return {
// 		type: 'INVALIDATE_NAMESPACES',
// 		endpoint: endpoint,
// 	}
// }

// function refreshNamespacesInState(endpoint) {
// 	// console.log(" >> INVOKING ACTION: REFRESH_NAMESPACES ");
// 	// console.log(endpoint);
// 	return {
// 		type: 'REFRESH_NAMESPACES',
// 		endpoint: endpoint,
// 	}
// }

function shouldGetNamespaces(state, endpoint) {
	return true;
}

function getNamespacesIfNeeded(endpoint) {
	// console.log(" >> getNamespacesIfNeeded ");
	// console.log(endpoint);
	return (dispatch, getState) => {
		if (shouldGetNamespaces(getState(), endpoint)) {
			return dispatch(getNamespaces(endpoint));
		}
	};
}

/*
 * 
 */

// function loadNamespaceIntoState(endpoint, namespace, accept = 'application/json') {
// 	// console.log(" >> INVOKING ACTION: GET_NAMESPACE ");
// 	// console.log(endpoint);
// 	return {
// 		type: 'GET_NAMESPACE',
// 		endpoint: endpoint,
// 		namespace: namespace,
// 		accept: accept
// 	}
// }

// function getNamespace(endpoint, namespace) {
// 	// console.log(" >> INVOKING ACTION: GET_NAMESPACE ");
// 	// console.log(endpoint);
// 	return {
// 		type: GET_NAMESPACE, 
// 		namespace: namespace, 
// 		endpoint
// 	};
// }

// function invalidateNamespaceInState(endpoint, namespace) {
// 	// console.log(" >> INVOKING ACTION: INVALIDATE_NAMESPACE ");
// 	// console.log(endpoint);
// 	return {
// 		type: 'INVALIDATE_NAMESPACE',
// 		endpoint: endpoint,
// 		namespace: namespace
// 	}
// }

// function refreshNamespaceInState(endpoint, namespace, entity_data) {
// 	// console.log(" >> INVOKING ACTION: REFRESH_NAMESPACE ");
// 	// console.log(endpoint);
// 	return {
// 		type: 'REFRESH_NAMESPACE',
// 		endpoint: endpoint,
// 		namespace: namespace,
// 		entity_data: entity_data
// 	}
// }

// function shouldGetNamespace(state, endpoint, namespace) {
// 	return true;
// }

// function getNamespaceIfNeeded(endpoint, namespace) {
// 	// console.log(" >> getNamespaceIfNeeded ");
// 	// console.log(endpoint);
// 	return (dispatch, getState) => {
// 		if (shouldGetNamespace(getState(), endpoint, namespace)) {
// 			return dispatch(getNamespace(endpoint, namespace));
// 		}
// 	};
// }

export {

	// ADD_NAMESPACE,
	// SELECT_NAMESPACE,
	// CURRENT_NAMESPACE,

	GET_NAMESPACES,
	DO_GET_NAMESPACES,
	ON_GET_NAMESPACES,
	FAIL_GET_NAMESPACES,

	// GET_NAMESPACE,
	// DO_GET_NAMESPACE,
	// ON_GET_NAMESPACE,
	// FAIL_GET_NAMESPACE,

	CREATE_NAMESPACE,
	DO_CREATE_NAMESPACE,
	ON_CREATE_NAMESPACE,
	FAIL_CREATE_NAMESPACE,

	// UPDATE_NAMESPACE,
	// DO_UPDATE_NAMESPACE,
	// ON_UPDATE_NAMESPACE,
	// FAIL_UPDATE_NAMESPACE,

	DELETE_NAMESPACE,
	DO_DELETE_NAMESPACE,
	ON_DELETE_NAMESPACE,
	FAIL_DELETE_NAMESPACE,

	// INVALIDATE_NAMESPACES,
	// INVALIDATE_NAMESPACE,

	// REFRESH_NAMESPACES,
	// REFRESH_NAMESPACE,

	// addNamespace, 
	// selectNamespace, 
	// currentNamespace, 
	// invalidateNamespace,

	loadNamespacesIntoState,
	getNamespaces,
	// invalidateNamespacesInState,
	// refreshNamespacesInState,
	// shouldGetNamespaces,
	getNamespacesIfNeeded,

	// loadNamespaceIntoState,
	// getNamespace,
	// invalidateNamespaceInState,
	// refreshNamespaceInState,
	// shouldGetNamespace,
	// getNamespaceIfNeeded

};
