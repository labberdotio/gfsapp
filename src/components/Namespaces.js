
// 
// Copyright (c) 2022, 2023, John Grundback
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
// import MuiLink from '@material-ui/core/Link';
// import Button from '@mui/material/Button';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';

import ExtensionIcon from '@material-ui/icons/Extension';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { 
	loadNamespacesIntoState 
} from '../actions/Namespace'

import {
	loadEntitiesIntoState, 
	invalidateEntitiesInState
} from '../actions/Entity'

import { 
	getNamespacesFromState 
} from '../stores/Namespace'

import {
	getEntitiesFromState
} from '../stores/Entity'

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

		if( namespace ) {
			if( (!this.props.tsloading) && (!this.props.tsloaded) && (!this.props.tsfailed) ) {
				if( api && namespace ) {
					this.props.loadTypes(api, namespace);
				}
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

		if( namespace ) {
			if( (!this.props.tsloading) && (!this.props.tsloaded) && (!this.props.tsfailed) ) {
				if( api && namespace ) {
					this.props.loadTypes(api, namespace);
				}
			}
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

	render() {

		var _this = this;

		const {
			// api, 
			namespace, 

			nsloading, 
			nsloaded, 
			nsfailed, 
			namespaces, 

			tsloading, 
			tsloaded, 
			tsfailed, 
			types, 

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

			{!namespace &&
				<>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="textPrimary">Namespaces</Typography>
				</Breadcrumbs>
				</>
			}

			{namespace &&
				<>
				<Breadcrumbs aria-label="breadcrumb">
					<Link color="inherit" to="/namespaces">
						Namespaces
					</Link>
					<Typography color="textPrimary">{namespace}</Typography>
				</Breadcrumbs>
				</>
			}

			<div style={{ padding: 12 }}>

			<Grid 
				// className={} 
				// className="" 
				container 
				// xs={12} 
				spacing={3} 
			>

			{namespace && types && types.length &&
				<>
				{types.map(function(type, idx) {
				// {Array.from(types).map(function(type, idx) {
					return (
						<>
						<Grid item sm={3}>
						<Grid container spacing={3}>
						<Card className={classes.root} raised={true} style={{width: "100%"}}>
							<CardHeader
								avatar={
									<ExtensionIcon/>
								}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
								title={type["title"]}
								subheader={type["name"]}
							/>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									{type["description"]}
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<Link color="inherit" to={"/namespaces/" + namespace + "/" + type["name"]}>
									View
								</Link>
							</CardActions>
						</Card>
						</Grid>
						</Grid>
						</>
					)
				})}
				</>
			}

			{namespaces && !types &&
				<>
				{namespaces.map(function(namespace, idx) {
					return (
						<>
						<Grid item sm={3}>
						<Grid container spacing={3}>
						<Card className={classes.root} raised={true} style={{width: "100%"}}>
							<CardHeader
								avatar={
									<AppsIcon/>
								}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
								title={namespace}
								subheader={namespace}
							/>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									{namespace}
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<Link color="inherit" to={"/namespaces/" + namespace}>
									View
								</Link>
							</CardActions>
						</Card>
						</Grid>
						</Grid>
						</>
					)
				})}
				</>
			}

			</Grid>
			</div>
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

		// loadTypes: (api, namespace) => dispatch(loadEntitiesIntoState(api, namespace, 'type')),
		loadTypes: (api, namespace) => dispatch(loadEntitiesIntoState(api, namespace, 'type')),

		invalidateEntities: (api, resource) => dispatch(invalidateEntitiesInState(api, resource)),

	}
}

function mapStateToProps(state, ownProps) {

	const {
		namespace
	} = ownProps;

	const {
		api,
		// namespace,
		namespaces
	} = state;

	const {
		loading: nsloading, 
		loaded: nsloaded, 
		failed: nsfailed, 
		timestamp: nstimestamp, 
		namespaces: nsnamespaces
	} = getNamespacesFromState(state, api);

	if( namespace ) {

		const {
			loading: tsloading, 
			loaded: tsloaded, 
			failed: tsfailed, 
			timestamp: ttimestamp, 
			entities: types
		} = getEntitiesFromState(state, api, namespace, 'type');

		var atypes = [];
		if( types ) {
			for( var typeid in types ) {
				if( typeid ) {
					var type = types[typeid];
					if( type ) {
						atypes.push(type);
					}
				}
			}
		}

		return {
			api, 
			namespace: namespace, 
			nsloading: nsloading, 
			nsloaded: nsloaded, 
			nsfailed: nsfailed, 
			nstimestamp: nstimestamp, 
			namespaces: nsnamespaces, 
			tsloading: tsloading, 
			tsloaded: tsloaded, 
			tsfailed: tsfailed, 
			ttimestamp: ttimestamp, 
			types: atypes, // types, 
		}

	} else {
		return {
			api, 
			namespace: namespace, 
			nsloading: nsloading, 
			nsloaded: nsloaded, 
			nsfailed: nsfailed, 
			nstimestamp: nstimestamp, 
			namespaces: nsnamespaces, 
			// tsloading: tsloading, 
			// tsloaded: tsloaded, 
			// tsfailed: tsfailed, 
			// ttimestamp: ttimestamp, 
			// types: types, 
		}
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(Namespaces);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Namespaces));
