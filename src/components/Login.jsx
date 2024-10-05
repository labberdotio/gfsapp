
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

// import * as React from 'react';
// import React, {Component} from 'react';
import React, { useState, Fragment, Component } from 'react';
import PropNamespaces from 'prop-types'
import { connect } from 'react-redux'

import {
	useParams, 
	useSearchParams, 
	useNavigate
} from "react-router-dom";

import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';

/*
 * Defaults
 */
var authHostname = process.env.REACT_APP_GFS_AUTH_HOST || 'gfs-auth';
var authPort = process.env.REACT_APP_GFS_AUTH_PORT || 8081;
var authClient = process.env.REACT_APP_GFS_AUTH_CLIENT || 'client';
var authSecret = process.env.REACT_APP_GFS_AUTH_SECRET || 'secret';

/*
 * Overrides
 */
if( window._env_ ) {
	authHostname = window._env_.REACT_APP_GFS_AUTH_HOST;
	authPort = window._env_.REACT_APP_GFS_AUTH_PORT;
	authClient = window._env_.REACT_APP_GFS_AUTH_CLIENT;
	authSecret = window._env_.REACT_APP_GFS_AUTH_SECRET;
}

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			namespace: undefined, 
			namespaceError: undefined, 
			username: undefined, 
			usernameError: undefined, 
			password: undefined, 
			passwordError: undefined, 
			active: false, 
			status: undefined, 
			snackbarMessage: undefined, 
			snackbarOpen: false
		}

		var _this = this;

	}

	state = {
		namespace: undefined, 
		namespaceError: undefined, 
		username: undefined, 
		usernameError: undefined, 
		password: undefined, 
		passwordError: undefined, 
		active: false, 
		status: undefined, 
		snackbarMessage: undefined, 
		snackbarOpen: false
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

		var scnamespace = this.props.searchParams[0].get("namespace");
		if( scnamespace ) {
			this.setNamespace(scnamespace);
		}

		var cnamespace = localStorage.getItem("jwt-namespace");
		if( cnamespace ) {
			this.setNamespace(cnamespace);
		}

	}

	submitUser(event) {
		var _this = this;
		_this.setActive(true);
		event.preventDefault();
		var namespace = _this.state.namespace;
		var username = _this.state.username;
		var password = _this.state.password;
		const data = new FormData();
		var email = username + "@" + namespace; 
		data.append("namespace", namespace);
		// data.append("username", username);
		data.append("username", email);
		data.append("password", password);
		data.append("grant_type", "password");
		data.append("scope", "read write");
		fetch("http://" + authHostname + ":" + authPort + "/auth/oauth/token", {
		// fetch("http://" + authHostname + ":" + authPort + "/auth/login", {
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
				localStorage.setItem("jwt-namespace", namespace);
				localStorage.setItem("jwt-token", data.access_token);
				localStorage.setItem("jwt-user", username);
				localStorage.setItem("jwt-email", email);
				// _this.setUsername("");
				// _this.setPassword("");
				_this.setStatus("Logged in");
				_this.showInSnackbar("Logged in");
				_this.setActive(false);
				// Redirect here
				// router.push(...)
				window.location.href = "/namespaces/" + namespace;
			} else {
				console.log("Login failed: " + data.error + " " + data.error_description);	
				_this.setStatus("Login failed: " + data.error_description);
				_this.showInSnackbar("Login failed: " + data.error_description);
				this.setActive(false);
			}
		});
	}

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

	setNamespace(namespace) {
		// console.log(" setNamespace " + namespace);
		var _this = this;
		var error = undefined;
		if( !namespace ) {
			error = "Please give a valid namespace.";
		}
		_this.setState({
			namespace: namespace, 
			namespaceError: error
		});
	}

	setUsername(username) {
		// console.log(" setUsername " + username);
		var _this = this;
		var error = undefined;
		if( !username ) {
			error = "Please give a valid user in the above namespace.";
		}
		_this.setState({
			username: username, 
			usernameError: error
		});
	}

	setPassword(password) {
		var _this = this;
		var error = undefined;
		if( !password ) {
			error = "Please give a valid password for the above user.";
		}
		_this.setState({
			password: password, 
			passwordError: error
		});
	}

	setActive(active) {
		var _this = this;
		_this.setState({
			active: active
		});
	}

	setStatus(status) {
		var _this = this;
		_this.setState({
			status: status
		});
	}

	render() {

		var _this = this;

		const {
			
		} = this.props;

		var backdropOpen = false;

		// var scnamespace = this.props.searchParams[0].get("namespace");
		var namespace = _this.state.namespace;
		var namespaceError = _this.state.namespaceError;
		var namespaceColor = "primary";
		if( namespaceError ) {
			namespaceColor = "danger";
		}
		var username = _this.state.username;
		var usernameError = _this.state.usernameError;
		var usernameColor = "primary";
		if( usernameError ) {
			usernameColor = "danger";
		}
		var password = _this.state.password;
		var passwordError = _this.state.passwordError;
		var passwordColor = "primary";
		if( passwordError ) {
			passwordColor = "danger";
		}
		var active = _this.state.active;
		var status = _this.state.status;

		var cnamespace = namespace;
		// if( !namespace ) {
		// 	if( scnamespace ) {
		// 		cnamespace = scnamespace;
		// 	}
		// }

		return (
			<main>
			<CssBaseline />
			<Sheet
				sx={{
					width: 300,
					mx: 'auto', // margin left & right
					my: 4, // margin top & bottom
					py: 3, // padding top & bottom
					px: 2, // padding left & right
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					borderRadius: 'sm',
					boxShadow: 'md',
				}}
				variant="outlined"
			>
				<form onSubmit={(e) => this.submitUser(e)}>
				<div>
					<Typography level="h4" component="h1">
						<b>Welcome!</b>
					</Typography>
					<Typography level="body-sm">Sign in to continue.</Typography>
				</div>
				<FormControl>
					<FormLabel>Namespace</FormLabel>
					<Input
						// name="email"
						// type="email"
						// placeholder="johndoe@email.com"
						id="namespace" 
						type="text" 
						value={cnamespace} 
						label="Namespace" 
						labelText="Namespace" 
						placeholder="Namespace" 
						helperText={namespaceError} 
						error={namespaceError} 
						color={namespaceColor} 
						// variant=...
						// fullWidth 
						// formControlProps={{
						// 	fullWidth: true
						// }} 
						onChange={(e) => this.setNamespace(e.target.value)} 
						handleChange={(e) => this.setNamespace(e.target.value)} 
					/>
					<FormHelperText>{namespaceError}</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input
						// name="email"
						// type="email"
						// placeholder="johndoe@email.com"
						id="username" 
						type="text" 
						value={username} 
						label="Username" 
						labelText="Username" 
						placeholder="Username" 
						helperText={usernameError} 
						error={usernameError} 
						color={usernameColor} 
						// variant=...
						// fullWidth 
						// formControlProps={{
						// 	fullWidth: true
						// }}
						onChange={(e) => this.setUsername(e.target.value)} 
						handleChange={(e) => this.setUsername(e.target.value)} 
					/>
					<FormHelperText>{usernameError}</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input
						// name="password"
						// type="password"
						// placeholder="password"
						id="password" 
						value={password} 
						type="password" 
						label="Password" 
						labelText="Password" 
						placeholder="" 
						helperText={passwordError} 
						error={passwordError} 
						color={passwordColor} 
						// variant=... 
						// fullWidth 
						// formControlProps={{
						// 	fullWidth: true
						// }}
						onChange={(e) => this.setPassword(e.target.value)}
						handleChange={this.handleChange}    
					/>
					<FormHelperText>{passwordError}</FormHelperText>
				</FormControl>
				<Button 
					type="submit" 
					// color="primary" 
					// variant="contained" 
					// className="form__custom-button"
					sx={{
						mt: 1 /* margin top */
					}}
				>
					Log in
				</Button>
				{/* <Typography
					endDecorator={<Link href="/sign-up">Sign up</Link>}
					sx={{ fontSize: 'sm', alignSelf: 'center' }}
				>
					Don&apos;t have an account?
				</Typography> */}
				</form>
			</Sheet>
			{/* <Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={this.state.snackbarOpen}
				autoHideDuration={6000}
				onClose={() => this.onCloseSnackbar()}
				message={this.state.snackbarMessage}
				action={
					<React.Fragment>
					<Button color="secondary" size="small" onClick={() => this.onCloseSnackbar()}>
						Close
					</Button>
					<IconButton size="small" aria-label="close" color="inherit" onClick={() => this.onCloseSnackbar()}>
						<CloseIcon fontSize="small" />
					</IconButton>
					</React.Fragment>
				}/>
			</> */}
			<Snackbar 
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={this.state.snackbarOpen}
				autoHideDuration={3000}
				message={this.state.snackbarMessage}
				variant="solid"
				onClose={() => this.onCloseSnackbar()}
			>
				{this.state.snackbarMessage}
			</Snackbar>
			</main>
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
	return params => <Component {...params} params={useParams()} />;
}

function withSearchParams(Component) {
	return searchParams => <Component {...searchParams} searchParams={useSearchParams()} />;
}

// export default withSearchParams(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))));
export default withSearchParams(withParams(connect(mapStateToProps, mapDispatchToProps)(Login)));
