
// 
// Copyright (c) 2020, 2021, John Grundback
// All rights reserved.
// 

const ADD_API = 'ADD_API';
const SELECT_API = 'SELECT_API';
const INVALIDATE_API = 'INVALIDATE_API';

/*
 * 
 */

function addApi(api) {
	// console.log(" >> INVOKING ACTION: ADD_API ");
	// console.log(api);
	return {
		type: ADD_API,
		api
	};
}

function selectApi(api) {
	// console.log(" >> INVOKING ACTION: SELECT_API ");
	// console.log(api);
	return {
		type: SELECT_API,
		api
	};
}

function invalidateApi(api) {
	// console.log(" >> INVOKING ACTION: INVALIDATE_API ");
	// console.log(api);
	return {
		type: INVALIDATE_API,
		api
	};
}

export {
	ADD_API, 
	SELECT_API, 
	INVALIDATE_API, 
	addApi, 
	selectApi, 
	invalidateApi
};
