
// 
// Copyright (c) 2022, John Grundback
// All rights reserved.
// 

// 
// https://graphcms.com/blog/querying-graphcms-content-with-urql
// 
import { createClient } from 'urql';
import { gql } from 'urql';



class GQLClient {

	// constructor(resource, endpoint, next) {
	constructor(action, next) {

		var resource = action.resource;
		var endpoint = action.endpoint;

		var namespace = endpoint.namespace;
		var hostname = endpoint.api.host;
		var port = endpoint.api.port;

		// console.log(' >> GQLClient: hostname: ' + hostname + ', port: ' + port);
		// console.log(' >> GQLClient: resource: ' + resource);
		// console.log(' >> GQLClient: namespace: ' + namespace);

		this.resource = resource;
		this.endpoint = endpoint;
		this.next = next;

		this.namespace = namespace;
		this.hostname = hostname;
		this.port = port;

		this.url = 'http://' + hostname + ':' + port + '/api/v1.0';
		this.jsontype = 'application/json';
		// this.yamltype = 'application/yaml';
		// this.texttype = 'text/plain';
		// this.accept = this.jsontype + ', ' + this.texttype;
		// this.contenttype = this.jsontype;
		// if( action.accept ) {
		// 	this.accept = action.accept;
		// 	this.contenttype = action.accept;
		// }

		// console.log(' >> GQLClient: URL: ' + this.url);

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

		// 
		// https://graphcms.com/blog/querying-graphcms-content-with-urql
		// 
		const client = createClient({
			url: '',
		});

		const query = gql`
			
		`;

		client.query(
			query, 
			{
				// 
			}
		)
		.toPromise()
		.then(result => {
			
		});

	}

	getEntity(name, entity_id) {

		// 
		// https://graphcms.com/blog/querying-graphcms-content-with-urql
		// 
		const client = createClient({
			url: '',
		});

		const query = gql`
			
		`;

		client.query(
			query, 
			{
				// 
			}
		)
		.toPromise()
		.then(result => {
			
		});

	}

	/*
	 * 
	 */

	createEntity(name, entity) {
		// 
	}

	/*
	 * 
	 */

	updateEntity(name, entity_id, entity) {
		// 
	}

	/*
	 * 
	 */

	deleteEntity(name, entity_id) {
		// 
	}

}

export default GQLClient;
