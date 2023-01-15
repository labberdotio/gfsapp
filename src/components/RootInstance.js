
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
// import DependentsView from './Dependents'

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

class RootInstance extends Component {

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
			type, 
			// , 
			// , 
			// , 
			// , 
			instances, 
			ainstances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		if( (!this.props.instances["loading"]) && 
			(!this.props.instances["loaded"]) && 
			(!this.props.instances["failed"]) ) {
			if( api && namespace && typename ) {
				this.props.loadInstances(api, namespace, typename);
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

		/*
		 * Load dependencies
		 */
		if( schema && schema["entity"] && schema["entity"]["properties"] ) {
			for( var propertyname in schema["entity"]["properties"] ) {
				var property = schema["entity"]["properties"][propertyname];
				if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
					// if( property && property["type"] ) {
					if( property ) {
						if( property["type"] == "string" ) {
							// 
						} else if( property["$ref"] ) {
							// property["$ref"].replace("#/definitions/", "")
							const dtypename = property["$ref"].replace("#/definitions/", "");
							if( (!this.props.ainstances[dtypename]["loading"]) && 
								(!this.props.ainstances[dtypename]["loaded"]) && 
								(!this.props.ainstances[dtypename]["failed"]) ) {
								// if( dtypename ) {
								if( api && namespace && dtypename ) {
									this.props.loadInstances(api, namespace, dtypename);
								}
								// }
							}
						} else if( (property["type"] == "array") && 
								   (property["items"]) ) {
							// property["items"]["$ref"].replace("#/definitions/", "")
							const dtypename = property["items"]["$ref"].replace("#/definitions/", "");
							if( (!this.props.ainstances[dtypename]["loading"]) && 
								(!this.props.ainstances[dtypename]["loaded"]) && 
								(!this.props.ainstances[dtypename]["failed"]) ) {
								// if( dtypename ) {
								if( api && namespace && dtypename ) {
									this.props.loadInstances(api, namespace, dtypename);
								}
								// }
							}
						}
					}
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
			type, 
			// , 
			// , 
			// , 
			// , 
			instances, 
			ainstances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		if( (!this.props.instances["loading"]) && 
			(!this.props.instances["loaded"]) && 
			(!this.props.instances["failed"]) ) {
			if( api && namespace && typename ) {
				this.props.loadInstances(api, namespace, typename);
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

		/*
		 * Load dependencies
		 */
		if( schema && schema["entity"] && schema["entity"]["properties"] ) {
			for( var propertyname in schema["entity"]["properties"] ) {
				var property = schema["entity"]["properties"][propertyname];
				if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
					// if( property && property["type"] ) {
					if( property ) {
						if( property["type"] == "string" ) {
							// 
						} else if( property["$ref"] ) {
							// property["$ref"].replace("#/definitions/", "")
							const dtypename = property["$ref"].replace("#/definitions/", "");
							if( (!this.props.ainstances[dtypename]["loading"]) && 
								(!this.props.ainstances[dtypename]["loaded"]) && 
								(!this.props.ainstances[dtypename]["failed"]) ) {
								// if( dtypename ) {
								if( api && namespace && dtypename ) {
									this.props.loadInstances(api, namespace, dtypename);
								}
								// }
							}
						} else if( (property["type"] == "array") && 
								   (property["items"]) ) {
							// property["items"]["$ref"].replace("#/definitions/", "")
							const dtypename = property["items"]["$ref"].replace("#/definitions/", "");
							if( (!this.props.ainstances[dtypename]["loading"]) && 
								(!this.props.ainstances[dtypename]["loaded"]) && 
								(!this.props.ainstances[dtypename]["failed"]) ) {
								// if( dtypename ) {
								if( api && namespace && dtypename ) {
									this.props.loadInstances(api, namespace, dtypename);
								}
								// }
							}
						}
					}
				}
			}
		}

	}

	/*
	 * 
	 */

	// getTreeData() {
	// 
	// 	const {
	// 		api, 
	// 		namespace, 
	// 		typename, 
	// 		instanceid, 
	// 		type, 
	// 		// , 
	// 		// , 
	// 		// , 
	// 		// , 
	// 		instances, 
	// 		ainstances, 
	// 		// , 
	// 		// , 
	// 		// , 
	// 		// , 
	// 		schema
	// 	} = this.props;
	// 
	// 	var treestruc = {
	// 	};
	// 
	// 	treestruc[typename] = {
	// 		id: typename, 
	// 		name: typename, 
	// 		label: typename, 
	// 		tree: {
	// 		}
	// 	}
	// 
	// 	if( instances && instances["entities"] ) {
	// 		for( var cinstanceid in instances["entities"] ) {
	// 			var instance = instances["entities"][cinstanceid];
	// 			if( instance ) {
	// 
	// 				// if( !(instance["label"] in treestruc) ) {
	// 				// 	treestruc[instance["label"]] = {
	// 				// 		id: instance["label"], 
	// 				// 		name: instance["label"], 
	// 				// 		label: instance["label"], 
	// 				// 		tree: {
	// 				// 		}
	// 				// 	};
	// 				// }
	// 
	// 				// treestruc[instance["label"]]["tree"][instance["name"]] = {
	// 				treestruc[instance["label"]]["tree"][instance["id"]] = {
	// 					id: instance["id"], 
	// 					name: instance["name"], 
	// 					label: instance["name"], // + "." + instance["label"], 
	// 					link: this.makeInstanceLink(namespace, instance), 
	// 					instance: this.makeInstance(instance), 
	// 					tree: {
	// 					}
	// 				};
	// 
	// 			}
	// 		}
	// 	}
	// 
	// 	return treestruc;
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
			type, 
			// , 
			// , 
			// , 
			// , 
			instances, 
			ainstances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		const { classes } = this.props;

		// var treestruc = this.getTreeData(instances["entities"]);

		var backdropOpen = false;

		var instance = undefined;
		if( instanceid ) {
			if( instances["entities"] && instances["entities"][instanceid] ) {
				var cinstance = instances["entities"][instanceid];
				if( cinstance ) {
					instance = cinstance;
				}
			}
		}

		// var properties = [];
		// var dependencies = [];

		// if( schema && schema["entity"] && schema["entity"]["properties"] ) {
		// 	for( var propertyname in schema["entity"]["properties"] ) {
		// 		var property = schema["entity"]["properties"][propertyname];
		// 		if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
		// 			if( property && property["type"] ) {
		// 				if( property["type"] == "string" ) {
		// 					properties.push(propertyname);
		// 				} else if( (property["type"] == "array") && 
		// 						   (property["items"]) ) {
		// 					dependencies.push({
		// 						"name": propertyname,
		// 						"type": property["items"]["$ref"].replace("#/definitions/", "")
		// 					});
		// 				}
		// 			}
		// 		}
		// 	}
		// }

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
				<Typography color="textPrimary">{ instance && instance["name"] }</Typography>
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
					xs={4} 
					spacing={0} 
				>
					<InstancesView 
						title={typename} 
						description={typename} 
						namespace={namespace} 
						typename={typename} 
						type={type} 
						schema={schema["entity"]} 
						instances={instances["entities"]} 
						ainstances={ainstances} />
				</Grid>

				<Grid 
					// className={classes.rightGrid} 
					className="rightGrid" 
					container 
					item 
					xs={8} 
					spacing={0} 
				>
					<InstanceView 
						title={ instance && instance["name"] } 
						description={typename} 
						namespace={namespace} 
						typename={typename} 
						type={type} 
						schema={schema["entity"]} 
						instanceid={instanceid} 
						instance={instance} 
						ainstances={ainstances} />
				</Grid>
			</Grid>
			</Container>
			</>
		);
	}

}

// RootInstance.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		loadInstances: (api, namespace, typename) => dispatch(loadEntitiesIntoState(api, namespace, typename)), 

		loadSchema: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "schema", typename))

	}
}

function mapStateToProps(state, ownProps) {

	const {
		namespace, 
		typename, 
		instanceid
	} = ownProps;

	const {
		api, 
		// namespace
	} = state;

	// const {
	// 	loading: , 
	// 	loaded: , 
	// 	failed: , 
	// 	timestamp: , 
	// 	entities: instances
	// } = getEntitiesFromState(state, api, namespace, typename);
	const instances = getEntitiesFromState(state, api, namespace, typename);

	// const {
	// 	loading: , 
	// 	loaded: , 
	// 	failed: , 
	// 	timestamp: , 
	// 	entity: schema
	// } = getEntityFromState(state, api, namespace, "schema", typename);
	const schema = getEntityFromState(state, api, namespace, "schema", typename);

	// console.log( " SCHEMA >> " );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log( schema );
	// console.log( " << SCHEMA " );

	/*
	 * Load dependencies
	 */
	var ainstances = {};
	ainstances[typename] = instances;
	if( schema && schema["entity"] && schema["entity"]["properties"] ) {
		for( var propertyname in schema["entity"]["properties"] ) {
			var property = schema["entity"]["properties"][propertyname];
			if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
				// if( property && property["type"] ) {
				if( property ) {
					if( property["type"] == "string" ) {
						// 
					} else if( property["$ref"] ) {
						// property["$ref"].replace("#/definitions/", "")
						const dtypename = property["$ref"].replace("#/definitions/", "");
						const dinstances = getEntitiesFromState(state, api, namespace, dtypename);
						ainstances[dtypename] = dinstances;
					} else if( (property["type"] == "array") && 
							   (property["items"]) ) {
						// property["items"]["$ref"].replace("#/definitions/", "")
						const dtypename = property["items"]["$ref"].replace("#/definitions/", "");
						const dinstances = getEntitiesFromState(state, api, namespace, dtypename);
						ainstances[dtypename] = dinstances;
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
		// type: type, 
		// : , 
		// : , 
		// : , 
		// : , 
		instances: instances, 
		ainstances: ainstances, 
		// : , 
		// : , 
		// : , 
		// : , 
		schema: schema
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(RootInstance);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootInstance));
