
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
// import {useLayoutEffect, useRef, useState} from 'react';
// import { useLayoutEffect } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
// import { useHistory } from "react-router-dom";

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

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Button from '@material-ui/core/Button';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import APIClient from '../clients/APIClient';

import { 
	loadEntityIntoState, 
	loadEntitiesIntoState
} from '../actions/Entity'

import { 
	getEntityFromState, 
	getEntitiesFromState 
} from '../stores/Entity'

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
    // let history = useHistory();
    return (
        <>
			<Button
				startIcon={<ArrowBackIcon />} 
				// onClick={() => history.goBack()}
			>
				Back
			</Button>
        </>
    );
};

export const ForwardNavButton = () => {
    // let history = useHistory();
    return (
		<>
			<Button
				endIcon={<ArrowForwardIcon />} 
				// onClick={() => history.goForward()}
			>
					Forward
			</Button>
        </>
    );
};

function TreeViewItems(props) {
	var items = props.items;
	var onSelectFn = props.onSelect;
	return (
		<>
		{Object.keys(items).map((key, index) => ( 
			<TreeItem 
				nodeId={ "" + items[key]["id"] }
				label={ "" + items[key]["label"] }
				onClick={event => {
					event.stopPropagation();
					event.preventDefault();
					if( items[key]["vertex"] ) {
						onSelectFn(items[key]["vertex"]);
					}
				}}>
				{items[key]["tree"] && 
				Object.keys(items[key]["tree"]).length > 0 &&
					<TreeViewItems 
						onSelect={onSelectFn} 
						items={items[key]["tree"]}
					/>
				}
			</TreeItem>
		))}
		</>
	)
}

// class RootInstances extends Component {
const RootInstances = class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			insloading: false, 
			insloaded: false, 
			insfailed: false, 
			instanceid: undefined, 
			instance: undefined, 
			graph: undefined, 
			selected: undefined
		}

		var _this = this;

		this.gridRef = React.createRef();

		this.selectItem = this.selectItem.bind(this);
		this.contextCommand = this.contextCommand.bind(this);

	}

	state = {
		insloading: false, 
		insloaded: false, 
		insfailed: false, 
		instanceid: undefined, 
		instance: undefined, 
		graph: undefined, 
		selected: undefined
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace, 
			typename, 
			type, 
			schema
		} = this.props;

		if( (!this.props.type["loading"]) && 
			(!this.props.type["loaded"]) && 
			(!this.props.type["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadType(api, namespace, typename);
			}
			// }
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
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		if( (!this.props.type["loading"]) && 
			(this.props.type["loaded"]) && 
			(!this.props.type["failed"]) ) {
			if( type && type["entity"] && type["entity"]["_id"] ) {
				if( (!this.state.insloading) && 
					(!this.state.insloaded) && 
					(!this.state.insfailed) ) {
					this.loadInstance(
						api, 
						namespace, 
						"graph", 
						type["entity"]["_id"] // this.state.instanceid
					)
				}
			}
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			type, 
			schema
		} = this.props;	

		if( (!this.props.type["loading"]) && 
			(!this.props.type["loaded"]) && 
			(!this.props.type["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadType(api, namespace, typename);
			}
			// }
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			this.props.loadSchema(api, namespace, typename);
			// }
		}

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		if( (!this.props.type["loading"]) && 
			(this.props.type["loaded"]) && 
			(!this.props.type["failed"]) ) {
			if( type && type["entity"] && type["entity"]["_id"] ) {
				if( (!this.state.insloading) && 
					(!this.state.insloaded) && 
					(!this.state.insfailed) ) {
					this.loadInstance(
						api, 
						namespace, 
						"graph", 
						type["entity"]["_id"] // this.state.instanceid
					)
				}
			}
		}

	}

	getGraph() {
		var fullgraph = this.state.graph;
		if( !fullgraph ) {
			fullgraph = {
				"@type": "tinker:graph", 
				"@value": {
					"vertices": [], 
					"edges": []
				}
			};
		}
		return fullgraph;
	}

	// buildGraph(subgraph) {
	// 	var fullgraph = this.state.graph;
	// 	if( !fullgraph ) {
	// 		fullgraph = {
	// 			"@type": "tinker:graph", 
	// 			"@value": {
	// 				"vertices": [], 
	// 				"edges": []
	// 			}
	// 		};
	// 	}
	// 	if( subgraph && subgraph["@value"] ) {
	// 		if( subgraph["@value"]["vertices"] ) {
	// 			var fullgraphvertices = Object.assign({}, ...fullgraph["@value"]["vertices"].map((x) => ({[x["@value"]["_id"]]: x})));
	// 			var subgraphvertices = Object.assign({}, ...subgraph["@value"]["vertices"].map((x) => ({[x["@value"]["_id"]]: x})));
	// 			var newgraphvertices = Object.assign({}, fullgraphvertices, subgraphvertices);
	// 			fullgraph["@value"]["vertices"] = Object.values(newgraphvertices);
	// 		}
	// 		if( subgraph["@value"]["edges"] ) {
	// 			var fullgraphvedges = Object.assign({}, ...fullgraph["@value"]["edges"].map((x) => ({[x["@value"]["_id"]]: x})));
	// 			var subgraphvedges = Object.assign({}, ...subgraph["@value"]["edges"].map((x) => ({[x["@value"]["_id"]]: x})));
	// 			var newgraphedges = Object.assign({}, fullgraphvedges, subgraphvedges);
	// 			fullgraph["@value"]["edges"] = Object.values(newgraphedges);
	// 		}
	// 	}
	// 	return fullgraph;
	// }

	buildGraph(subgraph) {
		var fullgraph = this.state.graph;
		if( !fullgraph ) {
			fullgraph = {
				"@type": "tinker:graph", 
				"@value": {
					"vertices": [], 
					"edges": []
				}
			};
		}
		if( subgraph && subgraph["@value"] ) {
			if( subgraph["@value"]["vertices"] ) {
				var fullgraphvertices = {}; // Object.assign({}, ...fullgraph["@value"]["vertices"].map((x) => ({[x["@value"]["_id"]]: x})));
				var subgraphvertices = Object.assign({}, ...subgraph["@value"]["vertices"].map((x) => ({[x["@value"]["_id"]]: x})));
				var newgraphvertices = Object.assign({}, fullgraphvertices, subgraphvertices);
				fullgraph["@value"]["vertices"] = Object.values(newgraphvertices);
			}
			if( subgraph["@value"]["edges"] ) {
				var fullgraphvedges = {}; // Object.assign({}, ...fullgraph["@value"]["edges"].map((x) => ({[x["@value"]["_id"]]: x})));
				var subgraphvedges = Object.assign({}, ...subgraph["@value"]["edges"].map((x) => ({[x["@value"]["_id"]]: x})));
				var newgraphedges = Object.assign({}, fullgraphvedges, subgraphvedges);
				fullgraph["@value"]["edges"] = Object.values(newgraphedges);
			}
		}
		return fullgraph;
	}

	getTreeData(graph) {

		/*
		 * I am converting the redux store to a dict, 
		 * but this expects an array.
		 */
		// if( graph ) {
		// 	graph = Object.values(graph);
		// }

		var treestruc = {
			Compose: {
				id: "Compose", 
				name: "Compose", 
				label: "Compose", 
				tree: {
				}
			}, 
			ComposeState: {
				id: "ComposeState", 
				name: "ComposeState", 
				label: "ComposeState", 
				tree: {
				}
			}, 
			type: {
				id: "type", 
				name: "type", 
				label: "Type", 
				tree: {
				}
			}, 
			interface: {
				id: "interface", 
				name: "interface", 
				label: "Interface", 
				tree: {
				}
			}, 
			enum: {
				id: "enum", 
				name: "enum", 
				label: "Enum", 
				tree: {
				}
			}, 
			// query: {
			// 	id: "query", 
			// 	name: "query", 
			// 	label: "Query", 
			// 	tree: {
			// 	}
			// }, 
			// template: {
			// 	id: "template", 
			// 	name: "template", 
			// 	label: "Template", 
			// 	tree: {
			// 	}
			// }, 
		};

		var vs = {}

		if( !graph ) {
			return treestruc;
		}

		if( !graph["@value"] ) {
			return treestruc;
		}

		var vertexes = graph["@value"]["vertices"];
		var edges = graph["@value"]["edges"];

		if( !vertexes ) {
			vertexes = [];
		}

		if( !edges ) {
			edges = [];
		}

		if( vertexes ) {
			for( var i=0; i<vertexes.length; i++ ) {
				var vertex = vertexes[i]["@value"];
				if( (vertex) && (vertex["_id"]) ) {
					vs[String(vertex["_id"])] = vertex; // true;
					var sval = vertex["_label"] + " " + vertex["properties"]["_name"];
					var included = false;
					var excluded = false;
					if( (sval) && (this.state.search) ) {
						if( sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							included = true;
						} else if( !sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							excluded = true;
						}
					}
					if( !(vertex["_label"] in treestruc) ) {
						treestruc[vertex["_label"]] = {
							id: vertex["_label"], 
							name: vertex["_label"], 
							label: vertex["_label"], 
							tree: {
							}
						};
					}
					// treestruc[vertex["_label"]]["tree"][vertex["properties"]["_name"]] = {
					treestruc[vertex["_label"]]["tree"][vertex["_id"]] = {
						id: vertex["_id"], 
						name: vertex["properties"]["_name"], 
						label: vertex["properties"]["_name"], // + "." + vertex["_label"], 
						vertex: vertex, 
						tree: {
						}
					};
				}
			}
		}

		if( edges ) {
			for( var i=0; i<edges.length; i++ ) {
				var edge = edges[i]["@value"];
				if( (edge) && (edge["_id"]) ) {
					var sval = edge["_label"];
					var included = false;
					var excluded = false;
					if( (sval) && (this.state.search) ) {
						if( sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							included = true;
						} else if( !sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							excluded = true;
						}
					}
					var _outV = String(edge["_outV"]);
					var _inV = String(edge["_inV"]);
					if( (_outV) && (_inV) ) {
						if( (vs[_outV]) && (vs[_inV]) ) {
							var source = vs[_outV];
							var target = vs[_inV];
							if( !(edge["_label"] in treestruc[source["_label"]]["tree"][source["_id"]]["tree"]) ) {
								treestruc[source["_label"]]["tree"][source["_id"]]["tree"][edge["_id"]] = {
									id: edge["_id"], 
									name: edge["_label"], 
									label: edge["_label"], 
									tree: {
									}
								};
							}
							treestruc[source["_label"]]["tree"][source["_id"]]["tree"][edge["_id"]]["tree"][target["_id"]] = {
								id: target["_id"], 
								name: target["properties"]["_name"], 
								label: target["properties"]["_name"], // + "." + target["_label"], 
								vertex: target, 
								edge: edge, 
								tree: {
								}
							}
						}
					}
				}
			}
		}

		return treestruc;
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
		// if( (!this.state.insloading) && 
		// 	(!this.state.insloaded) && 
		// 	(!this.state.insfailed) ) {
		try {
			this.setState({
				insloading: true, 
				insloaded: false, 
				insfailed: false, 
				instanceid: instanceid, 
				instance: this.state.instance, 
				graph: this.state.graph
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
						instance: data, 
						graph: this.buildGraph(data), 
					});
				});

		} catch {
			this.setState({
				insloading: false, 
				insloaded: false, 
				insfailed: true, 
				instanceid: undefined, 
				instance: this.state.instance, 
				graph: this.state.graph
			});
		}
		// }
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

	/*
	 * 
	 */

	contextCommand(type, command, selected, allselected) {

	};

	selectItem(id) {
		if(id) {
			this.setState({
				insloading: false, 
				insloaded: false, 
				insfailed: false, 
				instanceid: id.replace('v', ''), 
				instance: this.state.instance, // undefined
				selected: id,
			});
		} else {
			this.setState({
				insloading: false, 
				insloaded: false, 
				insfailed: false, 
				instanceid: undefined, 
				instance: this.state.instance, // undefined
				selected: undefined,
			});
		}
	}

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			typename, 
			type, 
			schema
		} = this.props;

		const { classes } = this.props;

		var backdropOpen = false;

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		// var instance = undefined;
		// if( this.state.instance ) {
		// 	instance = this.state.instance;
		// }
		// var graph = instance;
		var graph = this.getGraph();

		// var selected = undefined;
		// if( this.state.selected ) {
		// 	selected = this.state.selected;
		// }
		var selected = undefined;

		var hidden = false;
		var open = true;
		var direction = "up";

		var actions = [
			
		];

		// var graph = {}
		var treestruc = this.getTreeData(graph);

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
			{/* <Breadcrumbs aria-label="breadcrumb">
				<BackNavButton></BackNavButton>
				<Link color="inherit" to="/namespaces">
					Namespaces
				</Link>
				<Typography color="textPrimary">{namespace}</Typography>
				<ForwardNavButton></ForwardNavButton>
			</Breadcrumbs> */}
			<Grid 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>
				<Grid 
					className={classes.treeGrid} 
					className="treeGrid" 
					item 
					xs={3} 
					spacing={0} 
				>

					<TreeView
						className={classes.tree} 
						className="tree" 
						defaultCollapseIcon={<ExpandMoreIcon />}
						defaultExpandIcon={<ChevronRightIcon />}
					>
						<TreeViewItems 
							onSelect={item => {
								this.selectItem( "v" + String( item["_id"] ) );
							}}
							items={treestruc}
						/>
					</TreeView>
				</Grid>
				<Grid 
					className={classes.mainGrid} 
					className="mainGrid" 
					container 
					item 
					xs={9} 
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
						<Breadcrumbs aria-label="breadcrumb">
							<BackNavButton></BackNavButton>
							<Link color="inherit" to="/namespaces">
								Namespaces
							</Link>
							<Link color="inherit" to={"/namespaces/" + namespace}>
								{namespace}
							</Link>
							<Typography color="textPrimary">{typename}</Typography>
							<ForwardNavButton></ForwardNavButton>
						</Breadcrumbs>
						<Graph
							graph={graph}
							width={graphwidth} 
							height={graphheight} 
							selected={selected} 
							selectItem={this.selectItem} 
							contextCommand={this.contextCommand}/>
						{/* <ThreeDeeGraph
							graph={graph}
							width={graphwidth} 
							height={graphheight} 
							selected={selected} 
							selectItem={this.selectItem} 
							contextCommand={this.contextCommand}/> */}
					</Grid>
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

		loadType: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "type", typename)),

		loadSchema: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "schema", typename))

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

	var typename = undefined;
	if( ownProps && ownProps.params ) {
		typename = ownProps.params.typename;
	}

	const type = getEntityFromState(state, api, namespace, "type", typename);

	const schema = getEntityFromState(state, api, namespace, "schema", typename);

	return {
		api, 
		namespace: namespace, 
		typename: typename, 
		type: type, 
		schema: schema
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

export default withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootInstances)));
