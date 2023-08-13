
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

// import {
// 	// ADD_NAMESPACE,
// 	SELECT_NAMESPACE,
// 	CURRENT_NAMESPACE,
// 	GET_NAMESPACES,
// 	DO_GET_NAMESPACES,
// 	ON_GET_NAMESPACES,
// 	FAIL_GET_NAMESPACES,
// 	// GET_NAMESPACE,
// 	// DO_GET_NAMESPACE,
// 	// ON_GET_NAMESPACE,
// 	// FAIL_GET_NAMESPACE,
// 	// INVALIDATE_NAMESPACES,
// 	// INVALIDATE_NAMESPACE,
// 	// REFRESH_NAMESPACES,
// 	// REFRESH_NAMESPACE
// } from '../actions/Namespace'

import {
	GET_ENTITIES,
	DO_GET_ENTITIES,
	ON_GET_ENTITIES,
	FAIL_GET_ENTITIES,
	GET_ENTITY,
	DO_GET_ENTITY,
	ON_GET_ENTITY,
	FAIL_GET_ENTITY,
	INVALIDATE_ENTITIES,
	INVALIDATE_ENTITY,
	REFRESH_ENTITIES,
	REFRESH_ENTITY
} from '../actions/Entity'



function __entity(
	state = {
		loading: false,
		loaded: false,
		failed: false,
		invalid: false,
		entity: null
	},
	action,
	existing
) {
	switch (action.type) {
		case GET_ENTITY:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: false
			});
		case DO_GET_ENTITY:
			return Object.assign({}, state, {
				loading: true,
				loaded: false,
				failed: false,
				invalid: false
			});
		case ON_GET_ENTITY:
			return Object.assign({}, state, {
				loading: false,
				loaded: true,
				failed: false,
				invalid: false,
				entity: action.entity,
				timestamp: action.timestamp
			});
		case FAIL_GET_ENTITY:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: true,
				invalid: true,
				entity: action.entity,
				timestamp: action.timestamp
			});
		// case INVALIDATE_ENTITIES:
		case INVALIDATE_ENTITY:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: true,
				entity: action.entity,
				timestamp: null,
			});
		// case REFRESH_ENTITIES:
		case REFRESH_ENTITY:
			return Object.assign({}, state, {
				loading: false,
				loaded: true,
				failed: false,
				invalid: false,
				entity: action.entity,
				timestamp: null,
			});
		default:
			return state
	}
}

function entity(state = {}, action) {
	switch (action.type) {
		case GET_ENTITY:
		case DO_GET_ENTITY:
		case ON_GET_ENTITY:
		case FAIL_GET_ENTITY:
		// case INVALIDATE_ENTITIES:
		case INVALIDATE_ENTITY:
		// case REFRESH_ENTITIES:
		case REFRESH_ENTITY:
			var key1 = action.endpoint.name + "-" + action.namespace;
			var key2 = action.endpoint.name + "-" + action.namespace + "-" + action.resource;
			var key3 = action.endpoint.name + "-" + action.namespace + "-" + action.resource + "-" + action.entity_id;
			if( action.entity_id ) {
				return Object.assign({}, state, {
					[key3]: __entity(state[key1], action)
				});
			} else {
				return Object.assign({}, state, {
					[key2]: __entity(state[key1], action)
				});
			}
		default:
			return state;
	}
}
	
function __entities(
	state = {
		loading: false,
		loaded: false,
		failed: false,
		invalid: false,
		entities: {} // []
	},
	action,
	existing
) {
	switch (action.type) {
		case GET_ENTITIES:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: false
			});
		case DO_GET_ENTITIES:
			return Object.assign({}, state, {
				loading: true,
				loaded: false,
				failed: false,
				invalid: false
			});
		case ON_GET_ENTITIES:
			var entities = {}
			/*
			* Graphson 2.0 lists are straight up []
			* Graphson 3.0 lists are { "@type": "g:List", "@value": [] }
			*/
			// if( (vertexes) && (vertexes['@value']) ) {
			// 	vertexes = vertexes['@value'];
			// }
			// if( action.entities ) {
			// 	// for( var entity in action.entities ) {
			// 	for( let index = 0; index < action.entities.length; ++index ) {
			// 		const entity = action.entities[index];
			// 		if( (entity) && 
			// 			(entity["@value"]) && 
			// 			(entity["@value"]["_id"]) && 
			// 			(entity["@value"]["properties"]) ) {
			// 				var centity = entity["@value"]["properties"];
			// 				if( centity ) {
			// 					for( var key in centity ) {
			// 						if( centity.hasOwnProperty(key) ) {
			// 							var value = centity[key];
			// 							// if( (value) && (value['@value']) ) {
			// 							// if( (value) && ('@value' in value) ) {
			// 							if( (value) && (value.hasOwnProperty('@value')) ) {
			// 								centity[key] = value['@value']
			// 							} 
			// 						}
			// 					}
			// 				}
			// 				entities[ centity["_id"] ] = centity;
			// 		} else if( 
			// 			(entity) && 
			// 			(entity["@value"]) && 
			// 			(entity["@value"]["_id"]) ) {
			// 				var centity = entity["@value"];
			// 				if( centity ) {
			// 					for( var key in centity ) {
			// 						if( centity.hasOwnProperty(key) ) {
			// 							var value = centity[key];
			// 							// if( (value) && (value['@value']) ) {
			// 							// if( (value) && ('@value' in value) ) {
			// 							if( (value) && (value.hasOwnProperty('@value')) ) {
			// 								centity[key] = value['@value']
			// 							} 
			// 						}
			// 					}
			// 				}
			// 				entities[ centity["_id"] ] = centity;
			// 		} else if( 
			// 			(entity) && 
			// 			(entity["_id"]) ) {
			// 				// var centity = entity;
			// 				// if( centity ) {
			// 				// 	for( var key in centity ) {
			// 				// 		if( centity.hasOwnProperty(key) ) {
			// 				// 			var value = centity[key];
			// 				// 			if( (value) ) {
			// 				// 				centity[key] = value
			// 				// 			} 
			// 				// 		}
			// 				// 	}
			// 				// }
			// 				// entities[ centity["_id"] ] = centity;
			// 				entities[ entity["_id"] ] = entity;
			// 		}
			// 		// else {
			// 		// 	entities[ entity["@value"]["_id"] ] = entity;
			// 		// }
			// 	}
			// }

			return Object.assign({}, state, {
				loading: false,
				loaded: true,
				failed: false,
				invalid: false,
				// entities: entities, // action.entities,
				entities: action.entities,
				timestamp: action.timestamp
			});
		case FAIL_GET_ENTITIES:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: true,
				invalid: true,
				entities: {}, // action.entities,
				timestamp: action.timestamp
			});
		case INVALIDATE_ENTITIES:
		// case INVALIDATE_ENTITY:
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: true,
				entities: {}, // [],
				timestamp: null,
			});
		case REFRESH_ENTITIES:
		// case REFRESH_ENTITY:
			var entities = {}
			// if( ... ) {
			// 	...
			// }
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: false,
				invalid: true,
				entities: entities, // [],
				timestamp: null,
			});
		default:
			return state
	}
}

function entities(state = {}, action) {
	switch (action.type) {

		// case GET_ENTITY:
		// case DO_GET_ENTITY:
		// case ON_GET_ENTITY:
		// case FAIL_GET_ENTITY:
		// // case REFRESH_ENTITIES:
		// case REFRESH_ENTITY:
		// 	var key1 = action.endpoint.name + "-" + action.namespace ;
		// 	var key2 = action.endpoint.name + "-" + action.namespace  + "-" + action.resource;
		// 	var key3 = action.endpoint.name + "-" + action.namespace  + "-" + action.resource + "-" + action.entity_id;
		// 	return Object.assign({}, state, {
		// 		// [key3]: __entity(state[key1], action)
		// 		[key2]: __entity(
		// 			state[key1], 
		// 			action,
		// 			state[key2]
		// 		)
		// 	});

		// // case INVALIDATE_ENTITIES:
		// case INVALIDATE_ENTITY:
		// 	// return Object.assign({}, state, {
		// 	// });
		// 	return {};

		case GET_ENTITIES:
		case DO_GET_ENTITIES:
		case ON_GET_ENTITIES:
		case FAIL_GET_ENTITIES:
		case REFRESH_ENTITIES:
		// case REFRESH_ENTITY:
			var key1 = action.endpoint.name + "-" + action.namespace;
			var key2 = action.endpoint.name + "-" + action.namespace + "-" + action.resource;
			return Object.assign({}, state, {
				[key2]: __entities(
					state[key1], 
					action,
					state[key2]
				)
			});

		case INVALIDATE_ENTITIES:
		// case INVALIDATE_ENTITY:
			// return Object.assign({}, state, {
			// });
			return {};

		// case SELECT_NAMESPACE:
		// 	if( state && state.current ) {
		// 		if( state.current == action.namespace ) {
		// 			return state;
		// 		} 
		// 	}
		// 	return {};

		default:
			return state;

	}
}

export {
	entity,
	entities
};
