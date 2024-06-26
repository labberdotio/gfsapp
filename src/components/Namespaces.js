
// 
// Copyright (c) 2022, 2023, John Grundback
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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExtensionIcon from '@material-ui/icons/Extension';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { 
	loadNamespacesIntoState 
} from '../actions/Namespace'

import { 
	invalidateEntitiesInState
} from '../actions/Entity'

import { 
	getNamespacesFromState 
} from '../stores/Namespace'

const styles = theme => ({

});

function handleClick(event) {
	// event.preventDefault();
}

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

		const { classes } = this.props;

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
				className={classes.graphContainer} 
				className="graphContainer" 
				maxWidth="false">

			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>

			<Breadcrumbs aria-label="breadcrumb">
				<Typography color="textPrimary">Namespaces</Typography>
			</Breadcrumbs>

			<Grid 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>

			{namespaces && namespaces.data &&
				<>
				<List>
					{namespaces.data.map(function(namespace, idx) {
						return (
							<ListItem 
								button 
								selected={false} 
								component={Link} 
								to={"/namespaces/" + namespace} 
								// onClick={() => _this.selectNamespace(namespace)}
								>
								<ListItemIcon><ExtensionIcon/></ListItemIcon>
								<ListItemText>{namespace}</ListItemText>
							</ListItem>
						)
					})}
				</List>
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

export default withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Namespaces)));
