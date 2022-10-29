
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

import { namespace } from "../reducers/Namespace";

// import APIClient from '../clients/APIClient';



const GET_ENTITIES = 'GET_ENTITIES';
const DO_GET_ENTITIES = 'DO_GET_ENTITIES';
const ON_GET_ENTITIES = 'ON_GET_ENTITIES';
const FAIL_GET_ENTITIES = 'FAIL_GET_ENTITIES';

const GET_ENTITY = 'GET_ENTITY';
const DO_GET_ENTITY = 'DO_GET_ENTITY';
const ON_GET_ENTITY = 'ON_GET_ENTITY';
const FAIL_GET_ENTITY = 'FAIL_GET_ENTITY';

const CREATE_ENTITY = 'CREATE_ENTITY';
const DO_CREATE_ENTITY = 'DO_CREATE_ENTITY';
const ON_CREATE_ENTITY = 'ON_CREATE_ENTITY';
const FAIL_CREATE_ENTITY = 'FAIL_CREATE_ENTITY';

const UPDATE_ENTITY = 'UPDATE_ENTITY';
const DO_UPDATE_ENTITY = 'DO_UPDATE_ENTITY';
const ON_UPDATE_ENTITY = 'ON_UPDATE_ENTITY';
const FAIL_UPDATE_ENTITY = 'FAIL_UPDATE_ENTITY';

const DELETE_ENTITY = 'DELETE_ENTITY';
const DO_DELETE_ENTITY = 'DO_DELETE_ENTITY';
const ON_DELETE_ENTITY = 'ON_DELETE_ENTITY';
const FAIL_DELETE_ENTITY = 'FAIL_DELETE_ENTITY';

const INVALIDATE_ENTITIES = 'INVALIDATE_ENTITIES';
const INVALIDATE_ENTITY = 'INVALIDATE_ENTITY';

const REFRESH_ENTITIES = 'REFRESH_ENTITIES';
const REFRESH_ENTITY = 'REFRESH_ENTITY';

/*
 * 
 */

function loadEntitiesIntoState(endpoint, namespace, resource, accept = 'application/json') {
	return {
		type: 'GET_ENTITIES',
		resource: resource,
		endpoint: endpoint,
		namespace: namespace,
		accept: accept
	}
}

function getEntities(endpoint, namespace, resource) {
	// console.log(" >> INVOKING ACTION: GET_ENTITIES ");
	// console.log(endpoint);
	return {
		type: GET_ENTITIES, 
		resource: resource, 
		endpoint: endpoint,
		namespace: namespace
	};
}

function invalidateEntitiesInState(endpoint, namespace, resource) {
	// console.log(" >> INVOKING ACTION: INVALIDATE_ENTITIES ");
	// console.log(endpoint);
	return {
		type: 'INVALIDATE_ENTITIES',
		resource: resource,
		endpoint: endpoint,
		namespace: namespace
	}
}

function refreshEntitiesInState(endpoint, namespace, resource) {
	// console.log(" >> INVOKING ACTION: REFRESH_ENTITIES ");
	// console.log(endpoint);
	return {
		type: 'REFRESH_ENTITIES',
		resource: resource,
		endpoint: endpoint,
		namespace: namespace
	}
}

function shouldGetEntities(state, endpoint, namespace, resource) {
	return true;
}

function getEntitiesIfNeeded(endpoint, namespace, resource) {
	// console.log(" >> getEntitiesIfNeeded ");
	// console.log(endpoint);
	return (dispatch, getState) => {
		if (shouldGetEntities(getState(), endpoint, namespace, resource)) {
			return dispatch(getEntities(endpoint, namespace, resource));
		}
	};
}

/*
 * 
 */

function loadEntityIntoState(endpoint, namespace, resource, entity_id, accept = 'application/json') {
	// console.log(" >> INVOKING ACTION: GET_ENTITY ");
	// console.log(endpoint);
	return {
		type: 'GET_ENTITY',
		resource: resource,
		endpoint: endpoint,
		namespace: namespace,
		entity_id: entity_id,
		accept: accept
	}
}

function getEntity(endpoint, namespace, resource, entity_id) {
	// console.log(" >> INVOKING ACTION: GET_ENTITY ");
	// console.log(endpoint);
	return {
		type: GET_ENTITY, 
		resource: resource, 
		entity_id: entity_id, 
		endpoint: endpoint,
		namespace: namespace
	};
}

function invalidateEntityInState(endpoint, namespace, resource, entity_id) {
	// console.log(" >> INVOKING ACTION: INVALIDATE_ENTITY ");
	// console.log(endpoint);
	return {
		type: 'INVALIDATE_ENTITY',
		resource: resource,
		endpoint: endpoint,
		namespace: namespace,
		entity_id: entity_id
	}
}

function refreshEntityInState(endpoint, namespace, resource, entity_id, entity_data) {
	// console.log(" >> INVOKING ACTION: REFRESH_ENTITY ");
	// console.log(endpoint);
	return {
		type: 'REFRESH_ENTITY',
		resource: resource,
		endpoint: endpoint,
		namespace: namespace,
		entity_id: entity_id,
		entity_data: entity_data
	}
}

function shouldGetEntity(state, endpoint, namespace, resource, entity_id) {
	return true;
}

function getEntityIfNeeded(endpoint, namespace, resource, entity_id) {
	// console.log(" >> getEntityIfNeeded ");
	// console.log(endpoint);
	return (dispatch, getState) => {
		if (shouldGetEntity(getState(), endpoint, namespace, resource, entity_id)) {
			return dispatch(getEntity(endpoint, namespace, resource, entity_id));
		}
	};
}

export {

	GET_ENTITIES,
	DO_GET_ENTITIES,
	ON_GET_ENTITIES,
	FAIL_GET_ENTITIES,

	GET_ENTITY,
	DO_GET_ENTITY,
	ON_GET_ENTITY,
	FAIL_GET_ENTITY,

	CREATE_ENTITY,
	DO_CREATE_ENTITY,
	ON_CREATE_ENTITY,
	FAIL_CREATE_ENTITY,

	UPDATE_ENTITY,
	DO_UPDATE_ENTITY,
	ON_UPDATE_ENTITY,
	FAIL_UPDATE_ENTITY,

	DELETE_ENTITY,
	DO_DELETE_ENTITY,
	ON_DELETE_ENTITY,
	FAIL_DELETE_ENTITY,

	INVALIDATE_ENTITIES,
	INVALIDATE_ENTITY,

	REFRESH_ENTITIES,
	REFRESH_ENTITY,

	loadEntitiesIntoState,
	getEntities,
	invalidateEntitiesInState,
	refreshEntitiesInState,
	// shouldGetEntities,
	getEntitiesIfNeeded,

	loadEntityIntoState,
	getEntity,
	invalidateEntityInState,
	refreshEntityInState,
	// shouldGetEntity,
	getEntityIfNeeded

};
