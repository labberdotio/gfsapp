
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

function handleClick(event) {
	// event.preventDefault();
}

class Logout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}

		var _this = this;

	}

	state = {
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

	render() {

		const {
			
		} = this.props;

		const { classes } = this.props;

		var backdropOpen = false;

		localStorage.removeItem('jwt-token')

		return (
			<>
			<Container 
				className={classes.logoutContainer} 
				className="logoutContainer" 
				maxWidth="false">

			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>

			<Breadcrumbs aria-label="breadcrumb">
				<Typography color="textPrimary">Logout</Typography>
			</Breadcrumbs>

			<Grid 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>

			</Grid>
			</Container>
			</>
		);
	}

}

Logout.propNamespaces = {
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

export default withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Logout)));
