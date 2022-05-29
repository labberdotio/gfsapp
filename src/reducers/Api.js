
// 
// Copyright (c) 2020, 2021, John Grundback
// All rights reserved.
// 

import {
	ADD_API,
	SELECT_API,
	INVALIDATE_API
} from '../actions/Api'



function apis(state = {}, action) {
	switch (action.type) {
		case ADD_API:
			return Object.assign({}, state, {
				[action.api.name]: action.api
			});
		default:
			return state;
	}
}

function api(state = {}, action) {
	switch (action.type) {
		case SELECT_API:
			return action.api;
		default:
			return state;
	}
}

export {
	api, 
	apis
}
