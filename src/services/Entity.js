
// 
// Copyright (c) 2020, 2021, John Grundback
// All rights reserved.
// 

// import ApiGenerator from '../clients/ApiGenerator';
import ApiGenerator from '../clients/APIClient';



function EntityService({ getState }) {

	return next => action => {
		const ret = next(action);
		switch (action.type) {
			case 'GET_ENTITIES':
				var api = new ApiGenerator(action, next);
				api.getEntities(action.type);
				break
			case 'GET_ENTITY':
				var api = new ApiGenerator(action, next);
				api.getEntity(action.type, action.entity_id);
				break
			case 'CREATE_ENTITY':
				var api = new ApiGenerator(action, next);
				api.createEntity(action.type, action.entity);
				break
			case 'UPDATE_ENTITY':
				var api = new ApiGenerator(action, next);
				api.updateEntity(action.type, action.entity_id, action.entity);
				break
			case 'DELETE_ENTITY':
				var api = new ApiGenerator(action, next);
				api.deleteEntity(action.type, action.entity_id);
				break
			default:
				break
		}
		return ret;
	}

}

export default EntityService
