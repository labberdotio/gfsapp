
// 
// Copyright (c) 2020, 2021, 2022, 2023, 2024, 2026, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'

import {
	Routes, 
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch, 
	useParams, 
	useNavigate
} from "react-router-dom";

import AgenticChat from './AgenticChat';


// class Chat extends Component {
const Chat = class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}

		var _this = this;

		// 

	}

	state = {
		
	};

	updateDimensions() {
		var resize = this.state.resize;
		this.setState({
			resize: !resize // this.state.resize
		});
	}

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		var _this = this;

		const {
			api, 
			account, 
			namespace
		} = this.props;

		if( _this.mainRef && _this.mainRef.current ) {
			if( _this.state.mainWidth != _this.mainRef.current.offsetWidth ) {
				if( _this.resizeTimeout ) {
					clearTimeout(_this.resizeTimeout);
				}
				_this.resizeTimeout = setTimeout(function() {
					if( _this.mainRef && _this.mainRef.current ) {
						_this.showInSnackbar("Readjusting size");
						_this.setState({
							mainWidth: _this.mainRef.current.offsetWidth, 
							mainHeight: _this.mainRef.current.offsetHeight
						});
					}
					_this.resizeTimeout = null;
				}.bind(this), 1000)
			}
		}

	}

	componentDidMount() {

		var _this = this;

		const {
			api, 
			account, 
			namespace
		} = this.props;

		if( _this.mainRef && _this.mainRef.current ) {
			if( _this.state.mainWidth != _this.mainRef.current.offsetWidth ) {
				if( _this.resizeTimeout ) {
					clearTimeout(_this.resizeTimeout);
				}
				_this.resizeTimeout = setTimeout(function() {
					if( _this.mainRef && _this.mainRef.current ) {
						_this.showInSnackbar("Readjusting size");
						_this.setState({
							mainWidth: _this.mainRef.current.offsetWidth, 
							mainHeight: _this.mainRef.current.offsetHeight
						});
					}
					_this.resizeTimeout = null;
				}.bind(this), 1000)
			}
		}

		// 
		window.addEventListener("resize", this.updateDimensions);

	}

	componentWillUnmount() {

		// 
		window.removeEventListener("resize", this.updateDimensions);

	}	

	/*
	 * 
	 */

	showInSnackbar(message) {
		var _this = this;
		if( !_this.state.snackbarOpen ) {
			_this.setState({
				snackbarMessage: message,
				snackbarOpen: true
			});
		} else {
		}
	}

	onCloseSnackbar() {
		this.setState({
			snackbarMessage: undefined,
			snackbarOpen: false
		});
	}

	render() {

		var _this = this;

		const {
			api, 
			account, 
			namespace
		} = this.props;

		// 

		return (
			<>
			<AgenticChat/>
			</>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {

	}
}

function mapStateToProps(state, ownProps) {

	const {
		api, 
		// account, 
		// namespace
	} = state;

	var account = undefined;
	if( ownProps && ownProps.params ) {
		account = ownProps.params.account;
	}

	var namespace = undefined;
	if( ownProps && ownProps.params ) {
		namespace = ownProps.params.namespace;
	}

	return {
		api, 
		account: account, 
		namespace: namespace
	}

}

export default Chat
