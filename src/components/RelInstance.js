
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
// import { createBrowserHistory } from 'history';
import { useHistory } from "react-router-dom";

// import { Router, Switch, Route, Link } from "react-router-dom";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MuiLink from '@material-ui/core/Link';
// import { Link } from '@material-ui/core';
// import {
// 	Link,
// } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';

// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MaterialTable from 'material-table';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AddIcon from '@material-ui/icons/Add';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import InstancesView from './Instances'
import InstanceView from './Instance'

import { 
	loadEntityIntoState, 
	loadEntitiesIntoState
} from '../actions/Entity'

import { 
	getEntityFromState, 
	getEntitiesFromState 
} from '../stores/Entity'

// const history = createBrowserHistory();
// const history = useHistory();
// 
// const queryString = require('query-string');

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

});

// function TreeViewItems(props) {
// 	const history = useHistory();
// 	var items = props.items;
// 	var onSelectFn = props.onSelect;
// 	return (
// 		<>
// 		{Object.keys(items).map((key, index) => ( 
// 			<TreeItem 
// 				key={ key }
// 				nodeId={ "" + items[key]["id"] }
// 				label={ "" + items[key]["label"] }
// 				onClick={event => {
// 					event.stopPropagation();
// 					event.preventDefault();
// 					if( items[key]["instance"] ) {
// 						onSelectFn(items[key]["instance"]);
// 					}
// 					if( items[key]["link"] ) {
// 						history.push(items[key]["link"]);
// 					}
// 				}}>
// 				{items[key]["tree"] && 
// 				Object.keys(items[key]["tree"]).length > 0 &&
// 					<TreeViewItems 
// 						onSelect={onSelectFn} 
// 						items={items[key]["tree"]}
// 					/>
// 				}
// 			</TreeItem>
// 		))}
// 		</>
// 	)
// }

function handleClick(event) {
	// event.preventDefault();
}

class RelInstance extends Component {

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
			namespace, 
			typename, 
			instanceid, 
			relname, 
			type, 
			schema, 
			reltype, 
			relschema, 
			instance, 
			reltypeinstances, 
			relinstances, 
			relinstance, 
			// ainstances, 	
		} = this.props;

		if( (!this.props.instance["loading"]) && 
			(!this.props.instance["loaded"]) && 
			(!this.props.instance["failed"]) ) {
			if( api && namespace && typename ) {
				this.props.loadInstance(api, namespace, typename, instanceid);
			}
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadSchema(api, namespace, typename);
			}
			// }
		}

		if( reltype ) {
			if( (!this.props.reltypeinstances["loading"]) && 
				(!this.props.reltypeinstances["loaded"]) && 
				(!this.props.reltypeinstances["failed"]) ) {
				if( api && namespace && reltype ) {
					this.props.loadInstances(api, namespace, reltype);
				}
			}
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			relname, 
			type, 
			schema, 
			reltype, 
			relschema, 
			instance, 
			reltypeinstances, 
			relinstances, 
			relinstance, 
			// ainstances, 	
		} = this.props;

		if( (!this.props.instance["loading"]) && 
			(!this.props.instance["loaded"]) && 
			(!this.props.instance["failed"]) ) {
			if( api && namespace && typename ) {
				this.props.loadInstance(api, namespace, typename, instanceid);
			}
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadSchema(api, namespace, typename);
			}
			// }
		}

		if( reltype ) {
			if( (!this.props.reltypeinstances["loading"]) && 
				(!this.props.reltypeinstances["loaded"]) && 
				(!this.props.reltypeinstances["failed"]) ) {
				if( api && namespace && reltype ) {
					this.props.loadInstances(api, namespace, reltype);
				}
			}
		}

	}

	/*
	 * 
	 */

	// getTreeData() {
	// }

	makeInstanceLink(namespace, type, id) {
		return "/namespaces/" + namespace + "/" + type + "/" + id;
	}

	makeRelInstanceLink(namespace, type, id, relname) {
		return "/namespaces/" + namespace + "/" + type + "/" + id + "/" + relname;
	}

	makeInstance(instance) {
		return instance;
	}

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			relname, 
			type, 
			schema, 
			reltype, 
			relschema, 
			instance, 
			relinstances, 
			relinstance, 
			// ainstances, 	
		} = this.props;

		const { classes } = this.props;

		// var treestruc = this.getTreeData(instances["entities"]);

		var backdropOpen = false;

		return (
			<>
			<Container 
				className={classes.mainContainer} 
				// className="mainContainer" 
				// maxWidth="false"
				>
			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>
			<Breadcrumbs aria-label="breadcrumb">
			<Link color="inherit" to="/namespaces">
					Namespaces
				</Link>
				<Link color="inherit" to={"/namespaces/" + namespace}>
					{namespace}
				</Link>
				<Link color="inherit" to={"/namespaces/" + namespace + "/" + typename}>
					{typename}
				</Link>
				<Link color="inherit" to={"/namespaces/" + namespace + "/" + typename + "/" + instanceid}>
					{ instance && instance["entity"] && instance["entity"]["name"] }
				</Link>
				<Typography color="textPrimary">{ relname }</Typography>
			</Breadcrumbs>
			<Grid 
				// className={} 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>
				{/* <Grid 
					className={classes.treeGrid} 
					// className="treeGrid" 
					item 
					xs={3} 
					spacing={0} 
				> */}
					{/* <TreeView
						className={classes.tree} 
						// className="tree" 
						defaultCollapseIcon={<ExpandMoreIcon />}
						defaultExpandIcon={<ChevronRightIcon />}
						defaultExpanded={[typename]}
					>
						<TreeViewItems 
							onSelect={item => {
								// 
							}}
							items={treestruc}
						/>
					</TreeView> */}
					{/* <List component="nav" className={classes.root} aria-label="Entities">
						{ instances && instances["entities"] && Object.entries(instances["entities"]).map(([entityid, entity]) => (
						<ListItem 
							button 
							selected={false} 
							component={Link} 
							to={this.makeInstanceLink(namespace, entity)} 
							// onClick={onItemClick(title)}
							>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText>{entity["name"]}</ListItemText>
						</ListItem>
						))}
					</List> */}
				{/* </Grid> */}
				<Grid 
					// className={classes.leftGrid} 
					className="leftGrid" 
					container 
					item 
					xs={12} 
					spacing={0} 
				>
					{ relname && reltype && relschema && relinstance && 
						<InstanceView 
						title={ relname } 
						description={reltype} 
						namespace={namespace} 
						typename={reltype} 
						type={relschema} 
						schema={relschema} 
						instanceid={instance.id} 
						instance={instance} 
						ainstances={[]} />
					}
					{ relname && reltype && relschema && relinstances && 
					<InstancesView 
						title={relname} 
						description={reltype} 
						namespace={namespace} 
						typename={reltype} 
						type={relschema} 
						schema={relschema} 
						instances={relinstances} 
						ainstances={[]} />
					}
				</Grid>
			</Grid>
			</Container>
			</>
		);
	}

}

// RelInstance.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		loadInstance: (api, namespace, typename, instanceid) => dispatch(loadEntityIntoState(api, namespace, typename, instanceid)), 

		loadInstances: (api, namespace, typename) => dispatch(loadEntitiesIntoState(api, namespace, typename)), 

		loadSchema: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "schema", typename))

	}
}

function mapStateToProps(state, ownProps) {

	const {
		namespace, 
		typename, 
		instanceid, 
		relname
	} = ownProps;

	const {
		api, 
		// namespace
	} = state;

	const instance = getEntityFromState(state, api, namespace, typename, instanceid);
	// console.log( " INSTANCE >> " );
	// console.log( instance );
	// console.log( " << INSTANCE " );

	const schema = getEntityFromState(state, api, namespace, "schema", typename);
	// console.log( " SCHEMA >> " );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log( schema );
	// console.log( " << SCHEMA " );

	var reltype = undefined;
	var relschema = undefined;

	var relinstances = undefined;
	var relinstance = undefined;

	/*
	 * Load dependencies
	 */
	// var ainstances = {};
	// ainstances[typename] = instances;
	if( schema && schema["entity"] && schema["entity"]["properties"] ) {
		for( var propertyname in schema["entity"]["properties"] ) {
			var property = schema["entity"]["properties"][propertyname];
			if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
				// if( property && property["type"] ) {
				if( property ) {
					if( property["type"] == "string" ) {
						// 
					} else if( property["$ref"] ) {
						if( property["title"] == relname ) {
							reltype = property["$ref"].replace("#/definitions/", "");
							relschema = schema["entity"]["definitions"][reltype];
							if( instance && instance["entity"] ) {
								relinstance = instance["entity"][relname];
							}
						}
					} else if( (property["type"] == "array") && 
							   (property["items"]) ) {
						if( property["title"] == relname ) {
							reltype = property["items"]["$ref"].replace("#/definitions/", "");
							relschema = schema["entity"]["definitions"][reltype];
							if( instance && instance["entity"] ) {
								relinstances = instance["entity"][relname];
							}
						}
					}
				}
			}
		}
	}

	var newrelinstances = undefined;
	var newrelinstance = undefined;

	var reltypeinstances = undefined;
	if( reltype ) {
		reltypeinstances = getEntitiesFromState(state, api, namespace, reltype);
		if( reltypeinstances && reltypeinstances["entities"] ) {
			if( relinstance && relinstance["id"] ) {
				if( reltypeinstances["entities"][relinstance["id"]] ) {
					newrelinstance = reltypeinstances["entities"][relinstance["id"]];
				}
			} else if( relinstances ) {
				newrelinstances = [];
				for( var crelinstanceidx in relinstances ) {
					var crelinstance = relinstances[crelinstanceidx];
					if( crelinstance && crelinstance["id"] ) {
						if( reltypeinstances["entities"][crelinstance["id"]] ) {
							newrelinstances.push( reltypeinstances["entities"][crelinstance["id"]] );
						}
					}
				}
			}
		}
	}

	return {
		api, 
		namespace: namespace, 
		typename: typename, 
		instanceid: instanceid, 
		relname: relname, 
		// type: type, 
		schema: schema, 
		reltype: reltype, 
		relschema: relschema, 
		instance: instance, 
		reltypeinstances: reltypeinstances, 
		relinstances: newrelinstances, // relinstances, 
		relinstance: newrelinstance, // relinstance, 
		// ainstances: ainstances, 
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(RelInstance);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RelInstance));
