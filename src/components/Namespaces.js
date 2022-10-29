
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

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { 
	loadNamespacesIntoState, 
	invalidateNamespacesInState, 
	refreshNamespaceInState 
} from '../actions/Namespace'

import { 
	getNamespacesFromState 
} from '../stores/Namespace'




const styles = theme => ({

	

});









class Namespaces extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}

		

		var _this = this;

		this.wsClient = props.wsClient;
		this.wsClient.onMessage(
			function(data) {
				
			}
		);
	}

	state = {
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {
		const {api} = this.props;

		if( (!this.props.nsloading) && (!this.props.nsloaded) && (!this.props.nsfailed) ) {
			this.props.loadNamespaces(api);
		}

		

	}

	componentDidMount() {
		const {api} = this.props;

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

	onSelectItem(id) {
		
	}

	selectItem(id) {
		
	}

	render() {

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

		console.log(namespace)
		console.log(nsloading)
		console.log(nsloaded)
		console.log(nsfailed)
		console.log(" >>> NAM<ESPACES ")
		console.log(namespaces)

		return (
			<>
			<Container 
				className={classes.graphContainer} 
				className="graphContainer" 
				maxWidth="false">

			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>

			<Grid 
				className={classes.fullGrid} 
				className="fullGrid" 
				container 
				xs={12} 
				spacing={0} 
			>

			NAMESPACES

			{namespaces &&
			<ul>
				{namespaces.map(function(d, idx) {
					return (<li key={idx}>{d}</li>)
				})}
			</ul>
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
		invalidateNamespaces: (api) => dispatch(invalidateNamespacesInState(api)),
		

	}
}

function mapStateToProps(state) {

	const {
		api, 
		namespaces
	} = state;

	console.log(" !!! NAMESPACES !!! ");
	console.log(api);
	console.log(namespaces);

	const {
		loading: nsloading, 
		loaded: nsloaded, 
		failed: nsfailed, 
		timestamp: ntimestamp, 
		namespaces: nnamespaces
	} = getNamespacesFromState(state, api);

	console.log(nsloading);
	console.log(nsloaded);
	console.log(nsfailed);
	console.log(ntimestamp);
	console.log(nnamespaces);

	return {
		api, 
		namespace: api.namespace, 
		nsloading: nsloading, 
		nsloaded: nsloaded, 
		nsfailed: nsfailed, 
		namespaces: nnamespaces	
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(Namespaces);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Namespaces));
