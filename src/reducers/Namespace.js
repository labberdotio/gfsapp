
// 
// Copyright (c) 2022, John Grundback
// All rights reserved.
// 

import {
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
	// INVALIDATE_NAMESPACES,
	// INVALIDATE_NAMESPACE,
	// REFRESH_NAMESPACES,
	// REFRESH_NAMESPACE
} from '../actions/Namespace'

// function __namespace(
// 	state = {
// 		loading: false,
// 		loaded: false,
// 		failed: false,
// 		invalid: false,
// 		namespace: {}
// 	},
// 	action,
// 	existing
// ) {
// 	switch (action.type) {
// 
// 		case INVALIDATE_NAMESPACE:
// 		case REFRESH_NAMESPACE:
// 		default:
// 			return state
// 	}
// }

function namespace(state = {}, action) {
	switch (action.type) {

		// // case ADD_NAMESPACE:
		// case SELECT_NAMESPACE:
		// 	if( state && state.current ) {
		// 		if( state.current == action.namespace ) {
		// 			return state;
		// 		} 
		// 	}
		// 	var previous = state.current
		// 	return Object.assign({}, state, {
		// 		previous: previous, 	
		// 		current: action.namespace
		// 	});
		// case CURRENT_NAMESPACE:
		// 	return action.name;
		// // case INVALIDATE_NAMESPACE:
		default:
			return state;

	}
}
	
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
		// case INVALIDATE_NAMESPACES:
		// // case INVALIDATE_NAMESPACE:
		// 	return Object.assign({}, state, {
		// 		loading: false,
		// 		loaded: false,
		// 		failed: false,
		// 		invalid: true,
		// 		namespaces: [],
		// 		timestamp: null,
		// 	});
		// case REFRESH_NAMESPACES:
		// // case REFRESH_NAMESPACE:
		// 	var namespaces = []
		// 	// if( ... ) {
		// 	// 	...
		// 	// }
		// 	return Object.assign({}, state, {
		// 		loading: false,
		// 		loaded: false,
		// 		failed: false,
		// 		invalid: true,
		// 		namespaces: namespaces, // [],
		// 		timestamp: null,
		// 	});
		default:
			return state
	}
}

function namespaces(state = {}, action) {
	switch (action.type) {

		case GET_NAMESPACES:
		case DO_GET_NAMESPACES:
		case ON_GET_NAMESPACES:
		case FAIL_GET_NAMESPACES:
		// case INVALIDATE_NAMESPACES:
		// case INVALIDATE_NAMESPACE:
		// case REFRESH_NAMESPACES:
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
	namespace,
	namespaces
};
