
// 
// Copyright (c) 2022, John Grundback
// All rights reserved.
// 

import {
	GET_NAMESPACES,
	DO_GET_NAMESPACES,
	ON_GET_NAMESPACES,
	FAIL_GET_NAMESPACES,
	GET_NAMESPACE,
	DO_GET_NAMESPACE,
	ON_GET_NAMESPACE,
	FAIL_GET_NAMESPACE,
	INVALIDATE_NAMESPACES,
	INVALIDATE_NAMESPACE,
	REFRESH_NAMESPACES,
	REFRESH_NAMESPACE
} from '../actions/Namespace'



function __namespace(
	state = {
		loading: false,
		loaded: false,
		failed: false,
		invalid: false,
		namespace: {}
	},
	action,
	existing
) {
	switch (action.type) {
		case GET_NAMESPACE:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: false
			});
		case DO_GET_NAMESPACE:
			return Object.assign({}, state, {
				loading: true,
				loaded: false,
				failed: false,
				invalid: false
			});
		case ON_GET_NAMESPACE:
			var namespace = {};
			namespace = action.namespace;
			return Object.assign({}, state, {
				loading: false,
				loaded: true,
				failed: false,
				invalid: false,
				namespace: namespace, // action.namespace,
				timestamp: action.timestamp
			});
		case FAIL_GET_NAMESPACE:
			var namespace = {}
			// if( ... ) {
			// 	...
			// }
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: true,
				invalid: true,
				namespace: namespace, // {},
				timestamp: action.timestamp
			});
		// case INVALIDATE_NAMESPACES:
		case INVALIDATE_NAMESPACE:
			var namespace = {}
			// if( ... ) {
			// 	...
			// }
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: true,
				namespace: namespace, // {},
				timestamp: null,
			});
		// case REFRESH_NAMESPACES:
		case REFRESH_NAMESPACE:
			var namespace = {}
			// if( ... ) {
			// 	...
			// }
			return Object.assign({}, state, {
				loading: false,
				loaded: true,
				failed: false,
				invalid: false,
				namespace: namespace, // {},
				timestamp: null,
			});
		default:
			return state
	}
}

// function namespace(state = {}, action) {
// 	switch (action.type) {
// 		case GET_NAMESPACE:
// 		case DO_GET_NAMESPACE:
// 		case ON_GET_NAMESPACE:
// 		case FAIL_GET_NAMESPACE:
// 		// case INVALIDATE_NAMESPACES:
// 		case INVALIDATE_NAMESPACE:
// 		// case REFRESH_NAMESPACES:
// 		case REFRESH_NAMESPACE:
// 			return Object.assign({}, state, {
// 				// [action.endpoint.name + "-" + action.namespace]: __namespace(state[action.endpoint.name], action)
// 				[action.endpoint.name]: __namespace(state[action.endpoint.name], action)
// 			});
// 		default:
// 			return state;
// 	}
// }
	
function __namespaces(
	state = {
		loading: false,
		loaded: false,
		failed: false,
		invalid: false,
		namespaces: []
	},
	action,
	existing
) {
	switch (action.type) {
		case GET_NAMESPACES:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: false
			});
		case DO_GET_NAMESPACES:
			return Object.assign({}, state, {
				loading: true,
				loaded: false,
				failed: false,
				invalid: false
			});
		case ON_GET_NAMESPACES:
			var namespaces = [];
			namespaces = action.namespaces;
			return Object.assign({}, state, {
				loading: false,
				loaded: true,
				failed: false,
				invalid: false,
				namespaces: namespaces, // action.namespaces,
				timestamp: action.timestamp
			});
		case FAIL_GET_NAMESPACES:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: true,
				invalid: true,
				namespaces: [], // action.namespaces,
				timestamp: action.timestamp
			});
		case INVALIDATE_NAMESPACES:
		// case INVALIDATE_NAMESPACE:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: true,
				namespaces: [],
				timestamp: null,
			});
		case REFRESH_NAMESPACES:
		// case REFRESH_NAMESPACE:
			var namespaces = []
			// if( ... ) {
			// 	...
			// }
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: true,
				namespaces: namespaces, // [],
				timestamp: null,
			});
		default:
			return state
	}
}

function namespaces(state = {}, action) {
	switch (action.type) {

		case GET_NAMESPACE:
		case DO_GET_NAMESPACE:
		case ON_GET_NAMESPACE:
		case FAIL_GET_NAMESPACE:
		// case INVALIDATE_NAMESPACES:
		case INVALIDATE_NAMESPACE:
		// case REFRESH_NAMESPACES:
		case REFRESH_NAMESPACE:
			return Object.assign({}, state, {
				// [action.endpoint.name + "-" + "-" + action.namespace]: __namespace(state[action.endpoint.name], action)
				[action.endpoint.name]: __namespace(
					state[action.endpoint.name], 
					action,
					state[action.endpoint.name]
				)
			});

		case GET_NAMESPACES:
		case DO_GET_NAMESPACES:
		case ON_GET_NAMESPACES:
		case FAIL_GET_NAMESPACES:
		case INVALIDATE_NAMESPACES:
		// case INVALIDATE_NAMESPACE:
		case REFRESH_NAMESPACES:
		// case REFRESH_NAMESPACE:
			return Object.assign({}, state, {
				[action.endpoint.name]: __namespaces(
					state[action.endpoint.name], 
					action,
					state[action.endpoint.name]
				)
			});

		default:
			return state;

	}
}

export {
	// namespace,
	namespaces
};
