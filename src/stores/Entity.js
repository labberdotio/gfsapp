
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

function getEntityFromState(state, endpoint, resource, entity_id) {

	const {
		// entity
		entities
	} = state;

	const {
		loading,
		loaded,
		failed,
		invalid,
		timestamp,
		entities: _entities
	// } = entity[endpoint.api.host + '-' + resource + '-' + entity_id] || {
	} = entities[endpoint.api.host + '-' + resource] || {
		loading: false,
		loaded: false,
		failed: false,
		invalid: false,
		entities: []
	}

	var _entity = undefined;
	if( _entities ) {
		if(  _entities[entity_id] ) {
			_entity = _entities[entity_id];
		}
	}

	return {
		loading: loading,
		loaded: loaded,
		failed: failed,
		invalid: invalid,
		timestamp: timestamp,
		entity: _entity
	}

}

function getEntitiesFromState(state, endpoint, resource) {

	const {
		entities
	} = state;

	const {
		loading,
		loaded,
		failed,
		invalid,
		timestamp,
		entities: _entities
	} = entities[endpoint.api.host + '-' + resource] || {
		loading: false,
		loaded: false,
		failed: false,
		invalid: false,
		entities: []
	}

	return {
		loading: loading,
		loaded: loaded,
		failed: failed,
		invalid: invalid,
		timestamp: timestamp,
		entities: _entities
	}

}

export {
	getEntitiesFromState,
	getEntityFromState
};
