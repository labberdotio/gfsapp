
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

import APIClient from './APIClient';
// import WSClient from './WSClient';



class ApiGenerator {

	// constructor(resource, endpoint, next) {
	constructor(action, next) {

		var resource = action.resource;
		var endpoint = action.endpoint;

		var namespace = endpoint.namespace;
		var hostname = endpoint.api.host;
		var port = endpoint.api.port;

		// console.log(' >> ApiGenerator: hostname: ' + hostname + ', port: ' + port);
		// console.log(' >> ApiGenerator: resource: ' + resource);
		// console.log(' >> ApiGenerator: namespace: ' + namespace);

		this.resource = resource;
		this.endpoint = endpoint;
		this.next = next;

		this.namespace = namespace;
		this.hostname = hostname;
		this.port = port;

		this.url = 'http://' + hostname + ':' + port + '/api/v1.0';
		this.jsontype = 'application/json';
		this.yamltype = 'application/yaml';
		this.texttype = 'text/plain';
		this.accept = this.jsontype + ', ' + this.texttype;
		this.contenttype = this.jsontype;
		if( action.accept ) {
			this.accept = action.accept;
			this.contenttype = action.accept;
		}

		// console.log(' >> ApiGenerator: URL: ' + this.url);

//		var wshostname = endpoint.ws.host;
//		var wsport = endpoint.ws.port;
//		this.wsurl = 'http://' + wshostname + ':' + wsport;
//
//		console.log(' >> ApiGenerator: WS URL: ' + this.wsurl);
//
//		this.wsClient = new WSClient(
//			this.endpoint.ws.host, 
//			this.endpoint.ws.port, 
//			this.namespace, 
//			function(data) {
//				// console.log(' >> ApiGenerator: inbound message: ');
//				// console.log(data);
//			}
//		);

		this.next = this.next.bind(this);

	}

	// resourceURL(namespace, resource) {
	resourceURL(resource, namespace, path = null) {
		if( path ) {
			return this.url + '/' + namespace + '/' + resource + '/' + path;
		}
		return this.url + '/' + namespace + '/' + resource;
	}

	/*
	 * 
	 */

	getEntities(name) {
		this.next({
			type: `DO_${name}`,
			endpoint: this.endpoint,
			accept: this.accept,
			resource: this.resource
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		// try {
		fetch(apiClient.resourceURL(this.resource, this.endpoint.namespace), {
			method: 'GET',
			headers: {
				'Accept': this.accept
			}
		}).then((res) => {
			// Unfortunately, fetch doesn't send (404 error) into the cache itself
			// You have to send it, as I have done below
			if( res.ok ) {
				if( this.accept === "text/plain" ) {
					return res.text();
				} else if( this.accept === "application/yaml" ) {
					return res.text();
				} else {
					return res.json();
				}
			} else {
				this.next({
					type: `FAIL_${name}`,
					endpoint: this.endpoint,
					accept: this.accept,
					resource: this.resource,
					timestamp: Date.now()
				});
			}
		}).then((data) => {
			this.next({
				type: `ON_${name}`,
				endpoint: this.endpoint,
				accept: this.accept,
				resource: this.resource,
				entities: data,
				timestamp: Date.now()
			});
		}, 
		// Note: it's important to handle errors here 
		// instead of a catch() block so that we don't swallow
		// exceptions from actual bugs in components
		err => {
			this.next({
				type: `FAIL_${name}`,
				endpoint: this.endpoint,
				accept: this.accept,
				resource: this.resource,
				timestamp: Date.now()
			});
		});
		// } catch {
		// 	this.next({
		// 		type: `FAIL_${name}`,
		// 		endpoint: this.endpoint,
		// 		accept: this.accept,
		// 		resource: this.resource,
		// 		timestamp: Date.now()
		// 	});
		// }
	}

	getEntity(name, entity_id) {
		this.next({
			type: `DO_${name}`,
			endpoint: this.endpoint,
			accept: this.accept,
			resource: this.resource,
			entity_id: entity_id
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		// try {
		fetch(apiClient.resourceURL(this.resource, this.endpoint.namespace, entity_id), {
			method: 'GET',
			headers: {
				'Accept': this.accept
			}
		})
		.then((res) => {
			// Unfortunately, fetch doesn't send (404 error) into the cache itself
			// You have to send it, as I have done below
			if( res.ok ) {
				if( this.accept === "text/plain" ) {
					return res.text();
				} else if( this.accept === "application/yaml" ) {
					return res.text();
				} else {
					return res.json();
				}
			} else {
				this.next({
					type: `FAIL_${name}`,
					endpoint: this.endpoint,
					accept: this.accept,
					resource: this.resource,
					entity_id: entity_id,
					timestamp: Date.now()
				});
			}
		})
		.then((data) => {
			this.next({
				type: `ON_${name}`,
				endpoint: this.endpoint,
				accept: this.accept,
				resource: this.resource,
				entity_id: entity_id,
				entity: data,
				timestamp: Date.now()
			});
		}, 
		// Note: it's important to handle errors here 
		// instead of a catch() block so that we don't swallow
		// exceptions from actual bugs in components
		err => {
			this.next({
				type: `FAIL_${name}`,
				endpoint: this.endpoint,
				accept: this.accept,
				resource: this.resource,
				entity_id: entity_id,
				timestamp: Date.now()
			});
		});
		// } catch {
		// 	this.next({
		// 		type: `FAIL_${name}`,
		// 		endpoint: this.endpoint,
		// 		accept: this.accept,
		// 		resource: this.resource,
		// 		entity_id: entity_id,
		// 		timestamp: Date.now()
		// 	});
		// }
	}

	/*
	 * 
	 */

	createEntity(name, entity) {
		this.next({
			type: `DO_${name}`,
			endpoint: this.endpoint,
			accept: this.accept,
			resource: this.resource,
			entity: entity
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		var data = undefined;
		if( this.accept === "text/plain" ) {
			data = entity;
		} else if( this.accept === "application/yaml" ) {
			// 
		} else {
			data = JSON.stringify(entity);
		}
		fetch(this.resourceURL(this.resource, this.endpoint.namespace), {
			method: 'POST',
			body: data, // JSON.stringify(entity),
			headers: {
				'Accept': this.accept,
				'Content-Type': this.contenttype
			}
		})
		// .then(res => res.json())
		.then((res) => {
			if( res.ok ) {
				if( this.accept === "text/plain" ) {
					return res.text();
				} else if( this.accept === "application/yaml" ) {
					return res.text();
				} else {
					return res.json();
				}
			} else {
				this.next({
					type: `FAIL_${name}`,
					endpoint: this.endpoint,
					accept: this.accept,
					resource: this.resource,
					timestamp: Date.now()
				});
			}
		})
		.then((data) => {
			this.next({
				type: `ON_${name}`,
				endpoint: this.endpoint,
				accept: this.accept,
				resource: this.resource,
				entity: data,
				timestamp: Date.now()
			});
			this.next({
				type: 'INVALIDATE_ENTITIES',
				endpoint: this.endpoint,
				accept: this.accept,
				resource: this.resource
			});
		});
	}

	/*
	 * 
	 */

	updateEntity(name, entity_id, entity) {
		this.next({
			type: `DO_${name}`,
			endpoint: this.endpoint,
			accept: this.accept,
			resource: this.resource,
			entity_id: entity_id,
			entity: entity
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		var data = undefined;
		if( this.accept === "text/plain" ) {
			data = entity;
		} else if( this.accept === "application/yaml" ) {
			// 
		} else {
			data = JSON.stringify(entity);
		}
		fetch(this.resourceURL(this.resource, this.endpoint.namespace, entity_id), {
			method: 'PUT',
			body: data, // JSON.stringify(entity),
			headers: {
				'Accept': this.accept,
				'Content-Type': this.contenttype
			}
		})
		// .then(res => res.json())
		.then((res) => {
			if( res.ok ) {
				if( this.accept === "text/plain" ) {
					return res.text();
				} else if( this.accept === "application/yaml" ) {
					return res.text();
				} else {
					return res.json();
				}
			} else {
				this.next({
					type: `FAIL_${name}`,
					endpoint: this.endpoint,
					accept: this.accept,
					resource: this.resource,
					entity_id: entity_id,
					timestamp: Date.now()
				});
			}
		})
		.then((data) => {
			this.next({
				type: `ON_${name}`,
				endpoint: this.endpoint,
				accept: this.accept,
				resource: this.resource,
				entity_id: entity_id,
				entity: data,
				timestamp: Date.now()
			});
			this.next({
				type: 'INVALIDATE_ENTITIES',
				endpoint: this.endpoint,
				resource: this.resource
			});
		});
	}

	/*
	 * 
	 */

	deleteEntity(name, entity_id) {
		this.next({
			type: `DO_${name}`,
			endpoint: this.endpoint,
			accept: this.accept,
			resource: this.resource,
			entity_id: entity_id
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		fetch(this.resourceURL(this.resource, this.endpoint.namespace, entity_id), {
			method: 'DELETE',
			headers: {
				'Accept': this.accept
			}
		})
		// .then(res => res.json())
		.then((res) => {
			if( res.ok ) {
				if( this.accept === "text/plain" ) {
					return res.text();
				} else if( this.accept === "application/yaml" ) {
					return res.text();
				} else {
					return res.json();
				}
			} else {
				this.next({
					type: `FAIL_${name}`,
					endpoint: this.endpoint,
					accept: this.accept,
					resource: this.resource,
					entity_id: entity_id,
					timestamp: Date.now()
				});
			}
		})
		.then((data) => {
			this.next({
				type: `ON_${name}`,
				endpoint: this.endpoint,
				accept: this.accept,
				resource: this.resource,
				entity_id: entity_id,
				timestamp: Date.now()
			});
			this.next({
				type: 'INVALIDATE_ENTITIES',
				endpoint: this.endpoint,
				resource: this.resource
			});
		});
	}

}

export default ApiGenerator;
