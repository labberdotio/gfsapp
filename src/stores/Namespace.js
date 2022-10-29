
// 
// Copyright (c) 2022, John Grundback
// All rights reserved.
// 

function getCurrentNamespace(state) {

	const {
		namespace
	} = state;	

	return namespace;
}

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

export {
	getCurrentNamespace, 
	getNamespacesFromState
};
