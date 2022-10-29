
// 
// Copyright (c) 2022, John Grundback
// All rights reserved.
// 

import ApiGenerator from '../clients/ApiGenerator';



function NamespaceService({ getState }) {

	return next => action => {
		const ret = next(action);
		switch (action.type) {
			case 'GET_NAMESPACES':
				var api = new ApiGenerator(action, next);
				api.getNamespaces(action.type);
				break
			case 'GET_NAMESPACE':
				var api = new ApiGenerator(action, next);
				api.getNamespace(action.type, action.namespace);
				break
			case 'CREATE_NAMESPACE':
				var api = new ApiGenerator(action, next);
				api.createNamespace(action.type, action.namespace);
				break
			case 'UPDATE_NAMESPACE':
				var api = new ApiGenerator(action, next);
				api.updateNamespace(action.type, action.namespace, action.namespace);
				break
			case 'DELETE_NAMESPACE':
				var api = new ApiGenerator(action, next);
				api.deleteNamespace(action.type, action.namespace);
				break
			default:
				break
		}
		return ret;
	}

}

export default NamespaceService
