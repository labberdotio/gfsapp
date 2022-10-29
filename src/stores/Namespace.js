
// 
// Copyright (c) 2022, John Grundback
// All rights reserved.
// 

// /*
//  * Disabling this in favor of loadNamespacesIntoState
//  */
// // function loadNamespaceIntoState(endpoint, namespace, accept = 'application/json') {
// // 	return {
// // 		type: 'GET_NAMESPACE',
// // 		endpoint: endpoint,
// // 		namespace: namespace,
// // 		accept: accept
// // 	}
// // }
// 
// function loadNamespacesIntoState(endpoint, accept = 'application/json') {
// 	return {
// 		type: 'GET_NAMESPACES',
// 		endpoint: endpoint,
// 		accept: accept
// 	}
// }

/*
 * Disabling this in favor of getNamespacesFromState
 */
// function getNamespaceFromState(state, endpoint, namespace) {
// 
// 	const {
// 		namespace
// 	} = state;
// 
// 	const {
// 		loading,
// 		loaded,
// 		failed,
// 		invalid,
// 		timestamp,
// 		namespace: _namespace
// 	} = namespace[endpoint.api.host + '-' + namespace] || {
// 		loading: false,
// 		loaded: false,
// 		failed: false,
// 		invalid: false,
// 		namespace: null
// 	}
// 
// 	return {
// 		loading: loading,
// 		loaded: loaded,
// 		failed: failed,
// 		invalid: invalid,
// 		timestamp: timestamp,
// 		namespace: _namespace
// 	}
// 
// }

function getNamespacesFromState(state, endpoint) {

	const {
		namespaces
	} = state;

	const {
		loading,
		loaded,
		failed,
		invalid,
		timestamp,
		namespaces: _namespaces
	} = namespaces[endpoint.api.host] || {
		loading: false,
		loaded: false,
		failed: false,
		invalid: false,
		namespaces: []
	}

	return {
		loading: loading,
		loaded: loaded,
		failed: failed,
		invalid: invalid,
		timestamp: timestamp,
		namespaces: _namespaces
	}

}

// /*
//  * Disabling this in favor of invalidateNamespacesInState
//  */
// // function invalidateNamespaceInState(endpoint, namespace) {
// // 	return {
// // 		type: 'INVALIDATE_NAMESPACE',
// // 		endpoint: endpoint,
// // 		namespace: namespace
// // 	}
// // }
// 
// function invalidateNamespacesInState(endpoint) {
// 	return {
// 		type: 'INVALIDATE_NAMESPACES',
// 		endpoint: endpoint,
// 	}
// }
// 
// function refreshNamespaceInState(endpoint, namespace, namespace_data) {
// 	return {
// 		type: 'REFRESH_NAMESPACE',
// 		endpoint: endpoint,
// 		namespace: namespace,
// 		namespace_data: namespace_data
// 	}
// }
// 
// // function refreshNamespacesInState(endpoint) {
// // 	return {
// // 		type: 'REFRESH_NAMESPACES',
// // 		endpoint: endpoint,
// // 	}
// // }

export {
	// loadNamespacesIntoState,
	// // loadNamespaceIntoState,
	getNamespacesFromState,
	// getNamespaceFromState,
	// invalidateNamespacesInState,
	// // invalidateNamespaceInState,
	// // refreshNamespacesInState,
	// refreshNamespaceInState
};
