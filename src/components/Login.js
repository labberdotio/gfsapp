
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropNamespaces from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';

import debounce from 'lodash.debounce';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({

});

/*
 * Defaults
 */
var authHostname = process.env.REACT_APP_GFS_AUTH_HOST || 'gfsauth';
var authPort = process.env.REACT_APP_GFS_AUTH_PORT || 8182;
var authClient = process.env.REACT_APP_GFS_AUTH_CLIENT || 'client';
var authSecret = process.env.REACT_APP_GFS_AUTH_SECRET || 'secret';

/*
 * Overrides
 */
if( window._env_ ) {
	authHostname = window._env_.REACT_APP_GFS_WS_HOST;
	authPort = window._env_.REACT_APP_GFS_WS_PORT;
	authClient = window._env_.REACT_APP_GFS_AUTH_CLIENT;
	authSecret = window._env_.REACT_APP_GFS_AUTH_SECRET;
}

function handleClick(event) {
	// event.preventDefault();
}

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: undefined, 
			password: undefined
		}

		var _this = this;

	}

	state = {
		username: undefined, 
		password: undefined
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api
		} = this.props;

	}

	componentDidMount() {

		const {
			api
		} = this.props;

	}

	submitUser(event) {
		var _this = this;
		event.preventDefault();
		var username = _this.state.username;
		var password = _this.state.password;
		const data = new FormData();
		data.append("username", username);
		data.append("password", password);
		data.append("grant_type", "password");
		data.append("scope", "read write");
		fetch("http://" + authHostname + ":" + authPort + "/gfsauth/oauth/token", {
		// fetch("http://" + authHostname + ":" + authPort + "/gfsauth/login", {
			method: "POST",
			headers: {
				// "content-type": ..., 
				"Authorization": "Basic " + window.btoa(authClient + ":" + authSecret)
			},
			body: data
		})
		.then((res) => res.json())
		.then((data) => {
			if (!data.error) {
				console.log("Login successfull");
				console.log("JWT token: ");
				console.log(data.access_token);
				localStorage.setItem("jwt-token", data.access_token)
				_this.setUsername("")
				_this.setPassword("")
				// Redirect here
				// router.push(...)
			} else {
				console.log("Login failed");
				console.log(data.error);
				console.log(data.error_description);
				alert(data.error + data.error_description)
			}
		});
	}

	setUsername(username) {
		var _this = this;
		_this.setState({
			username: username
		});
	}

	setPassword(password) {
		var _this = this;
		_this.setState({
			password: password
		});
	}

	render() {

		var _this = this;

		const {
			
		} = this.props;

		const { classes } = this.props;

		var backdropOpen = false;

		var username = _this.state.username;
		var password = _this.state.password;

		return (
			<>
			<Container 
				className={classes.loginContainer} 
				className="loginContainer" 
				maxWidth="false">

			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>

			<Breadcrumbs aria-label="breadcrumb">
				<Typography color="textPrimary">Login</Typography>
			</Breadcrumbs>

			<Grid 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>

<main style={{ padding: '50px' }}>
        <h1>Login </h1>
        <br />

        <form onSubmit={(e) => this.submitUser(e)}>
          <input
            value={username}
            type="text"
            placeholder="Username"
            onChange={(e) => this.setUsername(e.target.value)}
          />
          <br />
          <br />

          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => this.setPassword(e.target.value)}
          />
          <br />
          <br />

          <button type="submit">Login</button>
        </form>
      </main>

			</Grid>
			</Container>
			</>
		);
	}

}

Login.propNamespaces = {
	dispatch: PropNamespaces.func.isRequired
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

function mapStateToProps(state, ownProps) {

	const {
		api
	} = state;

	return {
		api	
	}

}

/*
 * https://github.com/remix-run/react-router/issues/8146
 */

function withNavigation(Component) {
	return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login)));
