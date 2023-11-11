
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

class APIClient {

	constructor(hostname, port) {

		// console.log(' >> APIClient: hostname: ' + hostname + ', port: ' + port);

		this.hostname = hostname;
		this.port = port;

		// var version = "v1.0"
		var version = "v2.0"

		// this.url = 'http://' + hostname + ':' + port + '/api/v1.0';
		this.url = 'http://' + hostname + ':' + port + '/api/' + version;

		this.jsontype = 'application/json';
		this.yamltype = 'application/yaml';
		this.texttype = 'text/plain';

		// console.log(' >> APIClient: URL: ' + this.url);

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
	 * Have to go back to commit cc6304f for this.
	 * Sun Jul 26 20:54:32 2020 -0700
	 * Sun Mar 29 16:20:36 2020 -0500
	 */
	getInstance(namespace, typename, instanceid, callback) {
		var url = this.url + '/' + namespace + '/' + typename;
		if( instanceid ) {
			url = this.url + '/' + namespace + '/' + typename +  '/' + instanceid;
		}
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': this.jsontype // this.type
			}
		})
		.then(res => res.json())
		.then((data) => {
			callback(data);
		});
	}

	getInstanceField(namespace, typename, instanceid, field, callback) {
		var url = this.url + '/' + namespace + '/' + typename +  '/' + instanceid + '/' + field + '?offset=0&limit=1000';
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': this.jsontype // this.type
			}
		})
		.then(res => res.json())
		.then((data) => {
			callback(data);
		});
	}

}

export default APIClient;
