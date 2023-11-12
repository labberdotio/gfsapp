
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
// import {useLayoutEffect, useRef, useState} from 'react';
// import { useLayoutEffect } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
import { useHistory } from "react-router-dom";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import APIClient from '../clients/APIClient';

import Graph from './Graph';
import ThreeDeeGraph from './ThreeDeeGraph';

const styles = theme => ({

	mainContainer: {
		padding: 0, 
		margin: 0, 
	},

	mainPaper: {
		width: '100%', 
		marginTop: '20px', 
		marginBottom: '0px', 
	},

	speedDial: {
		position: 'fixed',
		right: 10,
		bottom: 10
	},

});

function handleClick(event) {
}

export const BackNavButton = () => {
    let history = useHistory();
    return (
        <>
			<Button
				startIcon={<ArrowBackIcon />} 
				onClick={() => history.goBack()}>
				Back
			</Button>
        </>
    );
};

export const ForwardNavButton = () => {
    let history = useHistory();
    return (
		<>
			<Button
				endIcon={<ArrowForwardIcon />} 
				onClick={() => history.goForward()}>
					Forward
			</Button>
        </>
    );
};

class Root extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}

		var _this = this;

		this.gridRef = React.createRef();

	}

	state = {
		
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace
		} = this.props;

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		this.loadInstance(api, namespace, "graph")

	}

	componentDidMount() {

		const {
			api, 
			namespace
		} = this.props;		

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		this.loadInstance(api, namespace, "graph")

	}

	getDataURL(api, namespace, typename, type, schema) {
		var dataurl = "http://" + api.api.host + ":" + api.api.port + "/api/v2.0/" + namespace + "/" + typename;
		return dataurl;
	}

	/*
	 * Have to go back to commit cc6304f for this.
	 * Sun Jul 26 20:54:32 2020 -0700
	 * Sun Mar 29 16:20:36 2020 -0500
	 */
	loadInstance(api, namespace, typename, instanceid) {
		// if( this.state.instanceid != instanceid ) {
		// this.setState({
		// 	insloading: false, 
		// 	insloaded: false, 
		// 	insfailed: false, 
		// 	instanceid: instanceid, 
		// 	instance: false
		// });
		// }
		if( (!this.state.insloading) && 
			(!this.state.insloaded) && 
			(!this.state.insfailed) ) {
			this.setState({
				insloading: true, 
				insloaded: false, 
				insfailed: false, 
				instanceid: instanceid, 
				instance: false
			});
			this.apiClient = new APIClient(
				api.api.host, 
				api.api.port
			);
			this.apiClient.getInstance(
				namespace, 
				typename, 
				instanceid, 
				(data) => {
					this.setState({
						insloading: false, 
						insloaded: true, 
						insfailed: false, 
						instanceid: instanceid, 
						instance: data
					});
				});
		}
	}

	// loadInstances(api, namespace, typename, instanceid, field) {
	// 	if( this.state.instanceid != instanceid ) {
	// 		this.setState({
	// 			insloading: false, 
	// 			insloaded: false, 
	// 			insfailed: false, 
	// 			instanceid: instanceid, 
	// 			instance: false
	// 		});
	// 	}
	// 	if( (!this.state.inssloading) && 
	// 		(!this.state.inssloaded) && 
	// 		(!this.state.inssfailed) ) {
	// 		this.setState({
	// 			inssloading: true, 
	// 			inssloaded: false, 
	// 			inssfailed: false, 
	// 			instances: false
	// 		});
	// 		this.apiClient = new APIClient(
	// 			api.api.host, 
	// 			api.api.port
	// 		);
	// 		this.apiClient.getInstanceField(
	// 			namespace, 
	// 			typename, 
	// 			instanceid, 
	// 			field, 
	// 			(data) => {
	// 				this.setState({
	// 					inssloading: false, 
	// 					inssloaded: true, 
	// 					inssfailed: false, 
	// 					instances: data
	// 				});
	// 			});
	// 	}
	// }

	// createInstance(type, data) {
	// 	const {api} = this.props;
	// 	this.props.createInstance(api, type, data);
	// 	this.createInstanceDialogElement.current.closeDialog();
	// }

	// deleteInstance() {
	// }

	// onCloseCreateInstanceDialog() {
	// 	this.setState({
	// 		createInstanceDialogOpen: false
	// 	});
	// }

	// getListCols(namespace, typename, type, schema) {
	// 	var cols = [];
	// 	return cols;
	// }

	// makeCreateInstanceLink(namespace, type) {
	// 	return "/namespaces/" + namespace + "/create/" + type;
	// }

	// makeInstanceLink(namespace, type, id) {
	// 	return "/namespaces/" + namespace + "/" + type + "/" + id;
	// }

	// makeRelInstanceLink(namespace, type, id, relname) {
	// 	return "/namespaces/" + namespace + "/" + type + "/" + id + "/" + relname;
	// }

	// makeInstance(instance) {
	// 	return instance;
	// }

	// makeInstancesView(
	// 	title, 
	// 	description, 
	// 	namespace, 
	// 	typename, 
	// 	type, 
	// 	schema, 
	// 	dataurl, 
	// 	editable, 
	// 	showdeps
	// ) {	
	// }

	// makeInstanceView(
	// 	title, 
	// 	description, 
	// 	namespace, 
	// 	typename, 
	// 	type, 
	// 	schema, 
	// 	instanceid, 
	// 	instance, 
	// 	showdeps
	// ) {
	// }

	render() {

		var _this = this;

		const {
			api, 
			namespace
		} = this.props;

		const { classes } = this.props;

		var backdropOpen = false;

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		var instance = undefined;
		if( this.state.instance ) {
			instance = this.state.instance;
		}
		var graph = instance;

		var hidden = false;
		var open = true;
		var direction = "up";

		var actions = [
			
		];

		var graphwidth = 640;
		var graphheight = 640;
		if( this.gridRef.current ) {
			graphwidth = this.gridRef.current.offsetWidth;
			graphheight = this.gridRef.current.offsetHeight;
		}

		if( graphwidth > 1280 ) {
			graphwidth = 1280;
		}

		if( graphheight > 640 ) {
			graphheight = 640;
		}

		return (
			<>
			<Container 
				className={classes.mainContainer} 
				>	
			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>
			<Breadcrumbs aria-label="breadcrumb">
				<BackNavButton></BackNavButton>
				<Link color="inherit" to="/namespaces">
					Namespaces
				</Link>
				<Typography color="textPrimary">{namespace}</Typography>
				<ForwardNavButton></ForwardNavButton>
			</Breadcrumbs>
			<Grid 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>
				<Grid 
					ref={this.gridRef}
					className="leftGrid" 
					container 
					item 
					xs={12} 
					spacing={0} 
				>
					<Graph
						graph={graph}
						width={graphwidth} 
						height={graphheight}/>
					{/* <ThreeDeeGraph
						graph={graph}
						width={graphwidth} 
						height={graphheight}/> */}
				</Grid>
			</Grid>
			<SpeedDial
				ariaLabel="GraphActions"
				className={classes.speedDial}
				hidden={hidden}
				icon={<SpeedDialIcon/>}
				onClose={this.onCloseDial}
				onOpen={this.onOpenDial}
				open={open}
				direction={direction}>
				{actions.map(action => (
					<SpeedDialAction
						key={action.name}
						icon=<Link to={action.link}>{action.icon}</Link>
						tooltipTitle={action.name}
						onClick={this.onCloseDial}/>
				))}
			</SpeedDial>
			</Container>
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
		namespace
	} = ownProps;

	const {
		api, 
		// namespace
	} = state;

	return {
		api, 
		namespace: namespace
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Root));
