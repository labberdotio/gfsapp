
// 
// Copyright (c) 2020, 2021, John Grundback
// All rights reserved.
// 

function loadEntityIntoState(endpoint, namespace, resource, entity_id, accept = 'application/json') {
	return {
		type: 'GET_ENTITY',
		resource: resource,
		endpoint: endpoint,
		namespace: namespace,
		entity_id: entity_id,
		accept: accept
	}
}

function loadEntitiesIntoState(endpoint, namespace, resource, accept = 'application/json') {
	return {
		type: 'GET_ENTITIES',
		resource: resource,
		endpoint: endpoint,
		namespace: namespace,
		accept: accept
	}
}

function getEntityFromState(state, endpoint, namespace, resource, entity_id) {

	const {
		entity
	} = state;	

	/*
	 *
	 */
	var key = endpoint.api.host + '-' + namespace + '-' + resource;
	if( entity_id ) {
		key = endpoint.api.host + '-' + namespace + '-' + resource + '-' + entity_id;
	}

	const {
		loading,
		loaded,
		failed,
		invalid,
		timestamp,
		entity: _entity
	} = entity[key] || {
		loading: false,
		loaded: false,
		failed: false,
		invalid: false,
		entity: null
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

function getEntitiesFromState(state, endpoint, namespace, resource) {

	const {
		entities
	} = state;

	/*
	 *
	 */
	var key = endpoint.api.host + '-' + namespace + '-' + resource;

	const {
		loading,
		loaded,
		failed,
		invalid,
		timestamp,
		entities: _entities
	} = entities[key] || {
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
	loadEntitiesIntoState,
	loadEntityIntoState,
	getEntitiesFromState,
	getEntityFromState
};
