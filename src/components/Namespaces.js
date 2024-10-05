
// 
// Copyright (c) 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropNamespaces from 'prop-types'
import { connect } from 'react-redux'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

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

import { 
	loadNamespacesIntoState 
} from '../actions/Namespace'

import { 
	invalidateEntitiesInState
} from '../actions/Entity'

import { 
	getNamespacesFromState 
} from '../stores/Namespace'

class Namespaces extends Component {

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
			api, 
			namespace
		} = this.props;

		if( (!this.props.nsloading) && (!this.props.nsloaded) && (!this.props.nsfailed) ) {
			if( api ) {
				this.props.loadNamespaces(api);
			}
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace
		} = this.props;

		if( (!this.props.nsloading) && (!this.props.nsloaded) && (!this.props.nsfailed) ) {
			if( api ) {
				this.props.loadNamespaces(api);
			}
		}

	}

	onContextCommand(type, command, selected, allselected) {

	};

	getTreeData(api, namespace, graph) {

		var treestruc = {
			
		};

		return treestruc;
	}

	updateSearch(event) {
	}

	render() {

		const {
			nsloading, 
			namespaces 
		} = this.props;

		if( !this.props.nsloading ) {
			// if( (this.props.nsloaded) && (this.props.nsfailed) ) {
			if( this.props.nsfailed ) {
				// 
			} else if( this.props.nsloaded ) {
				// 
			}
		} else {
			// 
		}

		var backdropOpen = false;
		if( nsloading ) {
			backdropOpen = true;
		}

		return (
			<>
			<Container 
				// className={classes.graphContainer} 
				className="graphContainer" 
				maxWidth="false">

			{/* <Breadcrumbs aria-label="breadcrumb">
				<Typography color="textPrimary">Namespaces</Typography>
			</Breadcrumbs> */}

			<Grid 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>

			{namespaces && namespaces.data &&
				<>
				{/* <List> */}
					{namespaces.data.map(function(namespace, idx) {
						return (
							// <ListItem 
							// 	button 
							// 	selected={false} 
							// 	component={Link} 
							// 	to={"/namespaces/" + namespace} 
							// 	// onClick={() => _this.selectNamespace(namespace)}
							// 	>
							// 	<ListItemIcon><ExtensionIcon/></ListItemIcon>
							// 	<ListItemText>{namespace}</ListItemText>
							// </ListItem>
							<div>{namespace}</div>
						)
					})}
				{/* </List> */}
				</>
			}

			</Grid>
			</Container>
			</>
		);
	}

}

Namespaces.propNamespaces = {
	dispatch: PropNamespaces.func.isRequired
}

function mapDispatchToProps(dispatch) {
	return {

		loadNamespaces: (api) => dispatch(loadNamespacesIntoState(api)),

		invalidateEntities: (api, resource) => dispatch(invalidateEntitiesInState(api, resource)),

	}
}

function mapStateToProps(state, ownProps) {

	const {
		api, 
		// namespace
	} = state;

	var namespace = undefined;
	if( ownProps && ownProps.params ) {
		namespace = ownProps.params.namespace;
	}

	const {
		loading: nsloading, 
		loaded: nsloaded, 
		failed: nsfailed, 
		timestamp: nstimestamp, 
		namespaces: nsnamespaces
	} = getNamespacesFromState(state, api);

	return {
		api, 
		namespace: namespace, 
		nsloading: nsloading, 
		nsloaded: nsloaded, 
		nsfailed: nsfailed, 
		nstimestamp: nstimestamp, 	
		namespaces: nsnamespaces	
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

// export default withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Namespaces)));
export default withParams(connect(mapStateToProps, mapDispatchToProps)(Namespaces));
