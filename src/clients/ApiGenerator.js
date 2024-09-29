
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

		var hostname = endpoint.api.host;
		var port = endpoint.api.port;

		var namespace = action.namespace;

		// console.log(' >> ApiGenerator: hostname: ' + hostname + ', port: ' + port);
		// console.log(' >> ApiGenerator: resource: ' + resource);
		// console.log(' >> ApiGenerator: namespace: ' + namespace);

		this.resource = resource;
		this.endpoint = endpoint;
		this.next = next;

		this.namespace = undefined;
		if( namespace ) {
			this.namespace = namespace;
		}

		this.hostname = hostname;
		this.port = port;

		// var version = "v1.0"
		var version = "v2.0"

		// this.url = 'http://' + hostname + ':' + port + '/api/v1.0';
		this.url = 'http://' + hostname + ':' + port + '/api/' + version;

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

		this.next = this.next.bind(this);

	}

	// namespaceURL(namespace) {
	namespaceURL(namespace = null) {
		if( namespace ) {
			return this.url + '/' + "namespace" + '/' + namespace;
		}
		return this.url + '/' + "namespace";
	}

	// resourceURL(namespace, resource) {
	resourceURL(resource, namespace, path = null) {
		if( !resource ) {
			return undefined;
		}
		if( !namespace ) {
			return undefined;
		}
		if( path ) {
			return this.url + '/' + namespace + '/' + resource + '/' + path;
		}
		return this.url + '/' + namespace + '/' + resource;
	}

	/*
	 *
	 */

	getNamespaces() {
		this.next({
			type: `DO_GET_NAMESPACES`,
			endpoint: this.endpoint,
			namespace: this.namespace,
			accept: this.accept
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		// try {
		const url = apiClient.namespaceURL();
		if( !url ) {
			this.next({
				type: `FAIL_GET_NAMESPACES`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				timestamp: Date.now()
			});
			return false;
		}
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': this.accept, 
				'Authorization': "Bearer " + localStorage.getItem("jwt-token")
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
					type: `FAIL_GET_NAMESPACES`,
					endpoint: this.endpoint,
					namespace: this.namespace,
					accept: this.accept,
					timestamp: Date.now()
				});
				// if( window.location.href != "/login" ) {
				// if( !window.location.href.endsWith("/login") ) {
				if( !window.location.href.includes("/login") ) {
					if( this.namespace ) {
						window.location.href = "/login?" + this.namespace;
					} else {
						window.location.href = "/login";
					}
				}
			}
		}).then((data) => {
			this.next({
				type: `ON_GET_NAMESPACES`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				namespaces: data,
				timestamp: Date.now()
			});
		}, 
		// Note: it's important to handle errors here 
		// instead of a catch() block so that we don't swallow
		// exceptions from actual bugs in components
		err => {
			this.next({
				type: `FAIL_GET_NAMESPACES`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				timestamp: Date.now()
			});
			// if( window.location.href != "/login" ) {
			// if( !window.location.href.endsWith("/login") ) {
			if( !window.location.href.includes("/login") ) {
				if( this.namespace ) {
					window.location.href = "/login?" + this.namespace;
				} else {
					window.location.href = "/login";
				}
			}
		});
		// } catch {
		// 	this.next({
		// 		type: `FAIL_GET_NAMESPACES`,
		// 		endpoint: this.endpoint,
		//		namespace: this.namespace,
		// 		accept: this.accept,
		// 		timestamp: Date.now()
		// 	});
		// }
	}

	getNamespace(namespace) {
		this.next({
			type: `DO_GET_NAMESPACE`,
			endpoint: this.endpoint,
			namespace: this.namespace,
			accept: this.accept,
			namespace: namespace
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		// try {
		const url = apiClient.namespaceURL(namespace);
		if( !url ) {
			this.next({
				type: `FAIL_GET_NAMESPACE`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				namespace: namespace,
				timestamp: Date.now()
			});
			return false;
		}
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': this.accept, 
				'Authorization': "Bearer " + localStorage.getItem("jwt-token")
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
					type: `FAIL_GET_NAMESPACE`,
					endpoint: this.endpoint,
					namespace: this.namespace,
					accept: this.accept,
					namespace: namespace,
					timestamp: Date.now()
				});
				// if( window.location.href != "/login" ) {
				// if( !window.location.href.endsWith("/login") ) {
				if( !window.location.href.includes("/login") ) {
					if( this.namespace ) {
						window.location.href = "/login?" + this.namespace;
					} else {
						window.location.href = "/login";
					}
				}
			}
		})
		.then((data) => {
			this.next({
				type: `ON_GET_NAMESPACE`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				namespace: namespace,
				namespace: data,
				timestamp: Date.now()
			});
		}, 
		// Note: it's important to handle errors here 
		// instead of a catch() block so that we don't swallow
		// exceptions from actual bugs in components
		err => {
			this.next({
				type: `FAIL_GET_NAMESPACE`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				namespace: namespace,
				timestamp: Date.now()
			});
			// if( window.location.href != "/login" ) {
			// if( !window.location.href.endsWith("/login") ) {
			if( !window.location.href.includes("/login") ) {
				if( this.namespace ) {
					window.location.href = "/login?" + this.namespace;
				} else {
					window.location.href = "/login";
				}
			}
		});
		// } catch {
		// 	this.next({
		// 		type: `FAIL_GET_NAMESPACE`,
		// 		endpoint: this.endpoint,
		//		namespace: this.namespace,
		// 		accept: this.accept,
		// 		namespace: namespace,
		// 		timestamp: Date.now()
		// 	});
		// }
	}

	/*
	 * 
	 */

	getEntities(name) {
		this.next({
			type: `DO_${name}`,
			endpoint: this.endpoint,
			namespace: this.namespace,
			accept: this.accept,
			resource: this.resource
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		// try {
		const url = apiClient.resourceURL(this.resource, this.namespace);
		if( !url ) {
			this.next({
				type: `FAIL_${name}`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				resource: this.resource,
				timestamp: Date.now()
			});
			return false;
		}
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': this.accept, 
				'Authorization': "Bearer " + localStorage.getItem("jwt-token")
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
					namespace: this.namespace,
					accept: this.accept,
					resource: this.resource,
					timestamp: Date.now()
				});
			}
		}).then((data) => {
			this.next({
				type: `ON_${name}`,
				endpoint: this.endpoint,
				namespace: this.namespace,
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
				namespace: this.namespace,
				accept: this.accept,
				resource: this.resource,
				timestamp: Date.now()
			});
		});
		// } catch {
		// 	this.next({
		// 		type: `FAIL_${name}`,
		// 		endpoint: this.endpoint,
		//		namespace: this.namespace,
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
			namespace: this.namespace,
			accept: this.accept,
			resource: this.resource,
			entity_id: entity_id
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		// try {
		const url = apiClient.resourceURL(this.resource, this.namespace, entity_id);
		if( !url ) {
			this.next({
				type: `FAIL_${name}`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				resource: this.resource,
				entity_id: entity_id,
				timestamp: Date.now()
			});
			return false;
		}
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': this.accept, 
				'Authorization': "Bearer " + localStorage.getItem("jwt-token")
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
					namespace: this.namespace,
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
				namespace: this.namespace,
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
				namespace: this.namespace,
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
		//		namespace: this.namespace,
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
			namespace: this.namespace,
			accept: this.accept,
			resource: this.resource,
			entity: entity
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		const url = this.resourceURL(this.resource, this.namespace);
		if( !url ) {
			this.next({
				type: `FAIL_${name}`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				resource: this.resource,
				timestamp: Date.now()
			});
			return false;
		}
		var data = undefined;
		if( this.accept === "text/plain" ) {
			data = entity;
		} else if( this.accept === "application/yaml" ) {
			// 
		} else {
			data = JSON.stringify(entity);
		}
		fetch(url, {
			method: 'POST',
			body: data, // JSON.stringify(entity),
			headers: {
				'Accept': this.accept, 
				'Authorization': "Bearer " + localStorage.getItem("jwt-token"), 
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
					namespace: this.namespace,
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
				namespace: this.namespace,
				accept: this.accept,
				resource: this.resource,
				entity: data,
				timestamp: Date.now()
			});
			this.next({
				type: 'INVALIDATE_ENTITIES',
				endpoint: this.endpoint,
				namespace: this.namespace,
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
			namespace: this.namespace,
			accept: this.accept,
			resource: this.resource,
			entity_id: entity_id,
			entity: entity
		});
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		const url = this.resourceURL(this.resource, this.namespace, entity_id);
		if( !url ) {
			this.next({
				type: `FAIL_${name}`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				resource: this.resource,
				entity_id: entity_id,
				timestamp: Date.now()
			});
			return false;
		}
		var data = undefined;
		if( this.accept === "text/plain" ) {
			data = entity;
		} else if( this.accept === "application/yaml" ) {
			// 
		} else {
			data = JSON.stringify(entity);
		}
		fetch(url, {
			method: 'PUT',
			body: data, // JSON.stringify(entity),
			headers: {
				'Accept': this.accept, 
				'Authorization': "Bearer " + localStorage.getItem("jwt-token"), 
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
					namespace: this.namespace,
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
				namespace: this.namespace,
				accept: this.accept,
				resource: this.resource,
				entity_id: entity_id,
				entity: data,
				timestamp: Date.now()
			});
			this.next({
				type: 'INVALIDATE_ENTITIES',
				endpoint: this.endpoint,
				namespace: this.namespace,
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
			namespace: this.namespace,
			accept: this.accept,
			resource: this.resource,
			entity_id: entity_id
		});
		const url = this.resourceURL(this.resource, this.namespace, entity_id);
		if( !url ) {
			this.next({
				type: `FAIL_${name}`,
				endpoint: this.endpoint,
				namespace: this.namespace,
				accept: this.accept,
				resource: this.resource,
				entity_id: entity_id,
				timestamp: Date.now()
			});
			return false;
		}
		var apiClient = new APIClient(
			this.endpoint.api.host, 
			this.endpoint.api.port 
		);
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Accept': this.accept, 
				'Authorization': "Bearer " + localStorage.getItem("jwt-token")
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
					namespace: this.namespace,
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
				namespace: this.namespace,
				accept: this.accept,
				resource: this.resource,
				entity_id: entity_id,
				timestamp: Date.now()
			});
			this.next({
				type: 'INVALIDATE_ENTITIES',
				endpoint: this.endpoint,
				namespace: this.namespace,
				resource: this.resource
			});
		});
	}

}

export default ApiGenerator;

