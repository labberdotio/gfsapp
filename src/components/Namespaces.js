
// 
// Copyright (c) 2022, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropNamespaces from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';

import debounce from 'lodash.debounce';
import InputBase from '@material-ui/core/InputBase';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {
	Link
} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MuiLink from '@material-ui/core/Link';

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

		this.onSelectNamespace = this.onSelectNamespace.bind(this);
		this.selectNamespace = this.selectNamespace.bind(this);

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
			this.props.loadNamespaces(api);
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace
		} = this.props;

		if( (!this.props.nsloading) && (!this.props.nsloaded) && (!this.props.nsfailed) ) {
			this.props.loadNamespaces(api);
		}

	}

	/*
	 * 
	 */

	onContextCommand(type, command, selected, allselected) {

	};

	/*
	 *
	 */

	getTreeData(vertexes, edges) {

		var treestruc = {
			
		};

		return treestruc;
	}

	updateSearch(event) {
		
	}

	onSelectNamespace(namespace) {
	}

	selectNamespace(namespace) {
	}

	render() {

		var _this = this;

		const {
			// api, 
			namespace, 
			nsloading, 
			nsloaded, 
			nsfailed, 
			namespaces, 
			search
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

		// const debouncedUpdateSearch = debounce((event) => this.updateSearch(event), 1000);
		const debouncedUpdateSearch = debounce((event) => this.updateSearch(event), 250);

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
				className={classes.fullGrid} 
				className="fullGrid" 
				container 
				xs={12} 
				spacing={0} 
			>

			{namespaces &&
				<>
				<List>
					{namespaces.map(function(namespace, idx) {
						return (
							<ListItem 
								button 
								selected={false} 
								component={Link} 
								to={"/"} 
								onClick={() => _this.selectNamespace(namespace)}
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

function mapStateToProps(state) {

	const {
		api,
		namespace,
		namespaces
	} = state;

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

// export default connect(mapStateToProps, mapDispatchToProps)(Namespaces);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Namespaces));
