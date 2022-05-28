
// 
// Copyright (c) 2020, 2021, John Grundback
// All rights reserved.
// 

// import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";

class WSClient {

	// constructor(hostname, port, namespace, onmessage) {
	constructor(hostname, port, namespace) {

		var _this = this;

		// console.log(' >> WSClient: hostname: ' + hostname + ', port: ' + port);

		this.hostname = hostname;
		this.port = port;
		this.namespace = namespace;
		this.onmessage = onmessage;

		// this.url = 'ws://' + hostname + ':' + port;
		this.url = 'http://' + hostname + ':' + port + '/' + namespace

		// var socket = io.connect();

		// console.log(' >> WSClient: URL: ' + this.url);

		// this.ws = new WebSocket(this.url);
		// this.ws = socketIOClient(this.url);
		this.ws = io(this.url);

		// this.ws.emit("connect");
		this.ws.on("connected", function() {
			// 
		});

		// this.ws.on("message", data => {
		// 	// 
		// 	_this.onmessage(data);
		// });

	}

	onMessage(handler) {
		this.ws.on("message", data => {
			handler(data);
		});
	}

}

export default WSClient;
