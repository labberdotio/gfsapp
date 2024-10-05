
// 
// Copyright (c) 2024, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropNamespaces from 'prop-types'
import { connect } from 'react-redux'
import { styled } from "@mui/material/styles";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import {
	useParams, 
	useSearchParams, 
	useNavigate
} from "react-router-dom";

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import TextField from '@mui/material/TextField';

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

function handleClick(event) {
	// event.preventDefault();
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

		// const { classes } = this.props;

		var backdropOpen = false;

		// var scnamespace = this.props.searchParams[0].get("namespace");
		var namespace = _this.state.namespace;
		var namespaceError = _this.state.namespaceError;
		var username = _this.state.username;
		var usernameError = _this.state.usernameError;
		var password = _this.state.password;
		var passwordError = _this.state.passwordError;
		var active = _this.state.active;
		var status = _this.state.status;

		var cnamespace = namespace;
		// if( !namespace ) {
		// 	if( scnamespace ) {
		// 		cnamespace = scnamespace;
		// 	}
		// }

		return (
			<>
			<Container 
				// className={classes.loginContainer} 
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
			<h1>Login</h1>
			<form onSubmit={(e) => this.submitUser(e)}>
			<TextField 
				id="namespace" 
				type="text" 
				value={cnamespace} 
				label="Namespace" 
				labelText="Namespace" 
				placeholder="Namespace" 
				helperText={namespaceError} 
				error={namespaceError} 
				variant="filled" 
				fullWidth 
				formControlProps={{
					fullWidth: true
				}} 
				onChange={(e) => this.setNamespace(e.target.value)} 
				handleChange={(e) => this.setNamespace(e.target.value)} 
			/>
			<TextField 
				id="username" 
				type="text" 
				value={username} 
				label="Username" 
				labelText="Username" 
				placeholder="Username" 
				helperText={usernameError} 
				error={usernameError} 
				fullWidth 
				formControlProps={{
					fullWidth: true
				}}
				onChange={(e) => this.setUsername(e.target.value)} 
				handleChange={(e) => this.setUsername(e.target.value)} 
			/>
			<TextField 
				id="password" 
				value={password} 
				type="password" 
				label="Password" 
				labelText="Password" 
				placeholder="" 
				helperText={passwordError} 
				error={passwordError}  
				fullWidth 
				formControlProps={{
					fullWidth: true
				}}
				onChange={(e) => this.setPassword(e.target.value)}
				handleChange={this.handleChange}        
			/>

			{ active ? (
				<>
				<CircularProgress />
				</>
			) : (
				<>
				</>
				)
			}

			{/* <Button variant="contained" type="submit">Login</Button> */}
			<Button 
				type="submit" 
				color="primary" 
				variant="contained" 
				// className="form__custom-button"
			>
				Login
			</Button>

			</form>

			</main>

			</Grid>
			</Container>
			<Snackbar
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
	return params => <Component {...params} params={useParams()} />;
}

function withSearchParams(Component) {
	return searchParams => <Component {...searchParams} searchParams={useSearchParams()} />;
}

// export default withSearchParams(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))));
export default withSearchParams(withParams(connect(mapStateToProps, mapDispatchToProps)(Login)));
