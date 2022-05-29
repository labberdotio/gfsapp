
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

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



// function __entity(
// 	state = {
// 		loading: false,
// 		loaded: false,
// 		failed: false,
// 		invalid: false,
// 		entities: null
// 	},
// 	action,
// 	existing
// ) {
// 	switch (action.type) {
// 		case GET_ENTITY:
// 			return Object.assign({}, state, {
// 				loading: false,
// 				loaded: false,
// 				failed: false,
// 				invalid: false
// 			});
// 		case DO_GET_ENTITY:
// 			return Object.assign({}, state, {
// 				loading: true,
// 				loaded: false,
// 				failed: false,
// 				invalid: false
// 			});
// 		case ON_GET_ENTITY:
// 			// action.entity,
// 			var entities = {}
// 			// if( ... ) {
// 			// 	...
// 			// }
// 			entities[action["entity_id"]] = action["entity"];
// 			console.log(entities);
// 			console.log(state);
// 			return Object.assign({}, state, {
// 				loading: false,
// 				loaded: true,
// 				failed: false,
// 				invalid: false,
// 				entities: entities, // [],
// 				timestamp: action.timestamp
// 			});
// 		case FAIL_GET_ENTITY:
// 			var entities = {}
// 			// if( ... ) {
// 			// 	...
// 			// }
// 			return Object.assign({}, state, {
// 				loading: false,
// 				loaded: false,
// 				failed: true,
// 				invalid: true,
// 				entities: entities, // [],
// 				timestamp: action.timestamp
// 			});
// 		// case INVALIDATE_ENTITIES:
// 		case INVALIDATE_ENTITY:
// 			var entities = {}
// 			// if( ... ) {
// 			// 	...
// 			// }
// 			return Object.assign({}, state, {
// 				loading: false,
// 				loaded: false,
// 				failed: false,
// 				invalid: true,
// 				entities: entities, // [],
// 				timestamp: null,
// 			});
// 		// case REFRESH_ENTITIES:
// 		case REFRESH_ENTITY:
// 			var entities = {}
// 			if( existing ) {
// 				// var 
// 				entities = existing["entities"]; // state[action.endpoint.name + "-" + action.resource]
// 				// if( ... ) {
// 				// 	...
// 				// }
// 				if( action.entity_id && action.entity_data ) {
// 					entities[action.entity_id] = action.entity_data;
// 				}
// 			}
// 			return Object.assign({}, state, {
// 				loading: false,
// 				loaded: true,
// 				failed: false,
// 				invalid: false,
// 				entities: entities, // [],
// 				timestamp: null,
// 			});
// 		default:
// 			return state
// 	}
// }

// function entity(state = {}, action) {
// 	switch (action.type) {
// 		case GET_ENTITY:
// 		case DO_GET_ENTITY:
// 		case ON_GET_ENTITY:
// 		case FAIL_GET_ENTITY:
// 		// case INVALIDATE_ENTITIES:
// 		case INVALIDATE_ENTITY:
// 		// case REFRESH_ENTITIES:
// 		case REFRESH_ENTITY:
// 			return Object.assign({}, state, {
// 				// [action.endpoint.name + "-" + action.resource + "-" + action.entity_id]: __entity(state[action.endpoint.name], action)
// 				[action.endpoint.name + "-" + action.resource]: __entity(state[action.endpoint.name], action)
// 			});
// 		default:
// 			return state;
// 	}
// }
	
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
			// action.entity,
			var entities = {}
			// if( ... ) {
			// 	...
			// }
			entities[action["entity_id"]] = action["entity"];
			console.log(entities);
			console.log(state);
			return Object.assign({}, state, {
				loading: false,
				loaded: true,
				failed: false,
				invalid: false,
				entities: entities, // [],
				timestamp: action.timestamp
			});
		case FAIL_GET_ENTITY:
			var entities = {}
			// if( ... ) {
			// 	...
			// }
			return Object.assign({}, state, {
				loading: false,
				loaded: false,
				failed: true,
				invalid: true,
				entities: entities, // [],
				timestamp: action.timestamp
			});
		// case INVALIDATE_ENTITIES:
		case INVALIDATE_ENTITY:
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
		// case REFRESH_ENTITIES:
		case REFRESH_ENTITY:
			var entities = {}
			if( existing ) {
				// var 
				entities = existing["entities"]; // state[action.endpoint.name + "-" + action.resource]
				// if( ... ) {
				// 	...
				// }
				if( action.entity_id && action.entity_data ) {
					entities[action.entity_id] = action.entity_data;
				}
			}
			return Object.assign({}, state, {
				loading: false,
				loaded: true,
				failed: false,
				invalid: false,
				entities: entities, // [],
				timestamp: null,
			});

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
			if( action.entities ) {
				// for( var entity in action.entities ) {
				for( let index = 0; index < action.entities.length; ++index ) {
					const entity = action.entities[index];
					if( (entity) && 
						(entity["@value"]) && 
						(entity["@value"]["id"]) && 
						(entity["@value"]["properties"]) ) {
							var centity = entity["@value"]["properties"];
							if( centity ) {
								for( var key in centity ) {
									if( centity.hasOwnProperty(key) ) {
										var value = centity[key];
										if( (value) && (value['@value']) ) {
											centity[key] = value['@value']
										} 
									}
								}
							}
							entities[ centity["id"] ] = centity;
					} else if( 
						(entity) && 
						(entity["@value"]) && 
						(entity["@value"]["id"]) ) {
							var centity = entity["@value"];
							if( centity ) {
								for( var key in centity ) {
									if( centity.hasOwnProperty(key) ) {
										var value = centity[key];
										if( (value) && (value['@value']) ) {
											centity[key] = value['@value']
										} 
									}
								}
							}
							entities[ centity["id"] ] = centity;
					} else if( 
						(entity) && 
						(entity["id"]) ) {
							// var centity = entity;
							// if( centity ) {
							// 	for( var key in centity ) {
							// 		if( centity.hasOwnProperty(key) ) {
							// 			var value = centity[key];
							// 			if( (value) ) {
							// 				centity[key] = value
							// 			} 
							// 		}
							// 	}
							// }
							// entities[ centity["id"] ] = centity;
							entities[ entity["id"] ] = entity;
					}
					// else {
					// 	entities[ entity["@value"]["id"] ] = entity;
					// }
				}
			}

			return Object.assign({}, state, {
				loading: false,
				loaded: true,
				failed: false,
				invalid: false,
				entities: entities, // action.entities,
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

		case GET_ENTITY:
		case DO_GET_ENTITY:
		case ON_GET_ENTITY:
		case FAIL_GET_ENTITY:
		// case INVALIDATE_ENTITIES:
		case INVALIDATE_ENTITY:
		// case REFRESH_ENTITIES:
		case REFRESH_ENTITY:
			return Object.assign({}, state, {
				[action.endpoint.name + "-" + action.resource]: __entities(
					state[action.endpoint.name], 
					action,
					state[action.endpoint.name + "-" + action.resource]
				)
			});

		case GET_ENTITIES:
		case DO_GET_ENTITIES:
		case ON_GET_ENTITIES:
		case FAIL_GET_ENTITIES:
		case INVALIDATE_ENTITIES:
		// case INVALIDATE_ENTITY:
		case REFRESH_ENTITIES:
		// case REFRESH_ENTITY:
			return Object.assign({}, state, {
				[action.endpoint.name + "-" + action.resource]: __entities(
					state[action.endpoint.name], 
					action,
					state[action.endpoint.name + "-" + action.resource]
				)
			});

		default:
			return state;

	}
}

export {
	// entity,
	entities
};
