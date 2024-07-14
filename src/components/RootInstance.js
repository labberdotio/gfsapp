
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
// import {useLayoutEffect, useRef, useState} from 'react';
// import { useLayoutEffect } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';

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
    let navigate = useNavigate();
    return (
        <>
			<Button
				startIcon={<ArrowBackIcon />} 
				onClick={() => navigate(-1)}
			>
				Back
			</Button>
        </>
    );
};

export const ForwardNavButton = () => {
    let navigate = useNavigate();
    return (
		<>
			<Button
				endIcon={<ArrowForwardIcon />} 
				onClick={() => navigate(+1)}
			>
				Forward
			</Button>
        </>
    );
};

function TreeViewItems(props) {
	var items = props.items;
	// var onSelectFn = props.onSelect;
	return (
		<>
		{Object.keys(items).map((key, index) => ( 
			<TreeItem 
				nodeId={ "" + items[key]["id"] }
				// label={ "" + items[key]["label"] }
				label={items[key]["link"]
					? <Link 
						color="inherit" 
						to={ "" + items[key]["link"] }
						// style={{color: "white"}}
						>
						{ "" + items[key]["label"] }
					</Link>
					: "" + items[key]["label"]
				}
				// onClick={event => {	
				// }}
				>
				{items[key]["tree"] && 
				Object.keys(items[key]["tree"]).length > 0 &&
					<TreeViewItems 
						// onSelect={onSelectFn} 
						items={items[key]["tree"]}
					/>
				}
			</TreeItem>
		))}
		</>
	)
}

// class RootInstance extends Component {
const RootInstance = class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			intendedcenter: undefined, 
			actualcenter: undefined, 
			grfloading: false, 
			grfloaded: false, 
			grffailed: false, 
			graph: undefined, 
			pgraph: undefined
		}

		var _this = this;

		this.gridRef = React.createRef();

		this.selectItem = this.selectItem.bind(this);
		this.contextCommand = this.contextCommand.bind(this);

	}

	state = {
		intendedcenter: undefined, 
		actualcenter: undefined, 
		grfloading: false, 
		grfloaded: false, 
		grffailed: false, 
		graph: undefined, 
		pgraph: undefined
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

		var center = instanceid; // undefined;
		if( !center ) {
			if( type && type["entity"] && type["entity"]["_id"] ) {
				center = type["entity"]["_id"];
			}
		}

		if( center != this.state.intendedcenter ) {
			this.setState({
				intendedcenter: center, 
				grfloading: false, 
				grfloaded: false, 
				grffailed: false
			});
		}

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		// if( (!this.props.type["loading"]) && 
		// 	(this.props.type["loaded"]) && 
		// 	(!this.props.type["failed"]) ) {
			if( (!this.state.grfloading) && 
				(!this.state.grfloaded) && 
				(!this.state.grffailed) ) {
				this.loadInstance(
					api, 
					namespace, 
					"graph", 
					center
				)
			}
		// }

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
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

		var center = instanceid; // undefined;
		if( !center ) {
			if( type && type["entity"] && type["entity"]["_id"] ) {
				center = type["entity"]["_id"];
			}
		}

		if( center != this.state.intendedcenter ) {
			this.setState({
				intendedcenter: center, 
				grfloading: false, 
				grfloaded: false, 
				grffailed: false
			});
		}

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		// if( (!this.props.type["loading"]) && 
		// 	(this.props.type["loaded"]) && 
		// 	(!this.props.type["failed"]) ) {
			if( (!this.state.grfloading) && 
				(!this.state.grfloaded) && 
				(!this.state.grffailed) ) {
				this.loadInstance(
					api, 
					namespace, 
					"graph", 
					center
				)
			}
		// }

	}

	getGraph() {
		var allvertexes = {};
		var alledges = {};
		if( this.state.pgraph ) {
			var vertexes = this.state.pgraph["@value"]["vertices"];
			if( vertexes ) {
				for( var i=0; i<vertexes.length; i++ ) {
					var vertex = vertexes[i]["@value"];
					if( (vertex) && (vertex["_id"]) ) {
						allvertexes[vertex["_id"]] = {
							"@type": "g:Vertex", 
							"@value": vertex
						};
					}
				}
			}
			var edges = this.state.pgraph["@value"]["edges"];
			if( edges ) {
				for( var i=0; i<edges.length; i++ ) {
					var edge = edges[i]["@value"];
					if( (edge) && (edge["_id"]) ) {
						alledges[edge["_id"]] = {
							"@type": "g:Edge", 
							"@value": edge
						};
					}
				}
			}
		}
		if( this.state.graph ) {
			var vertexes = this.state.graph["@value"]["vertices"];
			if( vertexes ) {
				for( var i=0; i<vertexes.length; i++ ) {
					var vertex = vertexes[i]["@value"];
					if( (vertex) && (vertex["_id"]) ) {
						allvertexes[vertex["_id"]] = {
							"@type": "g:Vertex", 
							"@value": vertex
						};
					}
				}
			}
			var edges = this.state.graph["@value"]["edges"];
			if( edges ) {
				for( var i=0; i<edges.length; i++ ) {
					var edge = edges[i]["@value"];
					if( (edge) && (edge["_id"]) ) {
						alledges[edge["_id"]] = {
							"@type": "g:Edge", 
							"@value": edge
						};
					}
				}
			}
		}
		var fullgraph = {
			"@type": "tinker:graph", 
			"@value": {
				"vertices": Object.values(allvertexes), // [], 
				"edges": Object.values(alledges), // []
			}
		};
		return fullgraph;
	}

	getGraphNode(id) {
		var graph = this.getGraph();
		if( graph ) {
			var vertexes = graph["@value"]["vertices"];
			if( vertexes ) {
				for( var i=0; i<vertexes.length; i++ ) {
					var vertex = vertexes[i]["@value"];
					if( (vertex) && (vertex["_id"]) ) {
						if( vertex["_id"] == id ) {
							return vertex;
						}
					}
				}
			}
		}
	}

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

	getTreeData(api, namespace, graph) {

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
							link: undefined, 
							tree: {
							}
						};
					}
					// treestruc[vertex["_label"]]["tree"][vertex["properties"]["_name"]] = {
					treestruc[vertex["_label"]]["tree"][vertex["_id"]] = {
						id: vertex["_id"], 
						name: vertex["properties"]["_name"], 
						label: vertex["properties"]["_name"], // + "." + vertex["_label"], 
						link: "/namespaces/" + namespace + "/" + vertex["_label"] + "/" + vertex["_id"], 
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
								treestruc[source["_label"]]["tree"][source["_id"]]["tree"][edge["_label"]] = {
									id: edge["_id"], 
									name: edge["_label"], 
									label: edge["_label"], 
									link: undefined, 
									tree: {
									}
								};
							}
							treestruc[source["_label"]]["tree"][source["_id"]]["tree"][edge["_label"]]["tree"][target["_id"]] = {
								id: target["_id"], 
								name: target["properties"]["_name"], 
								label: target["properties"]["_name"], // + "." + target["_label"], 
								link: "/namespaces/" + namespace + "/" + target["_label"] + "/" + target["_id"], 
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
		// 	grfloading: false, 
		// 	grfloaded: false, 
		// 	grffailed: false, 
		// });
		// }
		// if( (!this.state.grfloading) && 
		// 	(!this.state.grfloaded) && 
		// 	(!this.state.grffailed) ) {
		try {
			this.setState({
				intendedcenter: instanceid, 
				actualcenter: this.state.actualcenter, 
				grfloading: true, 
				grfloaded: false, 
				grffailed: false, 
				graph: this.state.graph, 
				pgraph: this.state.pgraph
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
						intendedcenter: instanceid, 
						actualcenter: instanceid, 
						grfloading: false, 
						grfloaded: true, 
						grffailed: false, 
						graph: this.buildGraph(data), 
						pgraph: this.state.graph
					});
				});

		} catch {
			this.setState({
				intendedcenter: instanceid, 
				actualcenter: this.state.actualcenter, 
				grfloading: false, 
				grfloaded: false, 
				grffailed: true, 
				graph: this.state.graph, 
				pgraph: this.state.pgraph
			});
		}
		// }
	}

	/*
	 * 
	 */

	contextCommand(type, command, selected, allselected) {

	};

	selectItem(id) {
		if(id) {
			var iid = id;
			if( iid != this.state.instanceid ) {
				// var graph = this.getGraph();
				var node = this.getGraphNode(id);
				if( node ) {
					var namespace = this.props.namespace;
					var typename = node["_label"];
					this.props.navigate("/namespaces/" + namespace + "/" + typename + "/" + id);
					// this.setState({
					// 	grfloading: false, 
					// 	grfloaded: false, 
					// 	grffailed: false, 
					// });
				}
			}
		} else {
			var iid = undefined;
			// if( this.state.instanceid ) {
			var namespace = this.props.namespace;
			this.props.navigate("/namespaces/" + namespace);
			// this.setState({
			// 	grfloading: false, 
			// 	grfloaded: false, 
			// 	grffailed: false, 
			// });
			// }
		}
	}

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
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
		var graph = this.getGraph();
		var instance = this.getGraphNode(this.state.actualcenter);

		var highlighted = undefined;
		var exploded = undefined;
		var selected = undefined;

		var pulsed = undefined;
		var runLayout = true;
		var zoomFit = true;

		if( this.state.actualcenter ) {
			highlighted = this.state.actualcenter;
			exploded = this.state.actualcenter;
			selected = this.state.actualcenter;
		}

		var hidden = false;
		var open = true;
		var direction = "up";

		var actions = [
			
		];

		// var graph = {}
		var treestruc = this.getTreeData(api, namespace, graph);

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
							// onSelect={item => {
							// 	this.selectItem( String( item["_id"] ) );
							// }}
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
							<Link color="inherit" to={"/namespaces/" + namespace + "/" + typename}>
								{typename}
							</Link>
							<Typography color="textPrimary">{ instance && ( instance["_label"] + " (" + instance["_id"] + ")") }</Typography>
							<ForwardNavButton></ForwardNavButton>
						</Breadcrumbs>
						<Graph
							graph={graph}
							width={graphwidth} 
							height={graphheight} 
							highlighted={highlighted} 
							exploded={exploded} 
							selected={selected} 
							pulsed={pulsed} 
							runLayout={runLayout} 
							zoomFit={zoomFit} 
							selectItem={this.selectItem} 
							contextCommand={this.contextCommand}/>
						{/* <ThreeDeeGraph
							graph={graph}
							width={graphwidth} 
							height={graphheight} 
							highlighted={highlighted} 
							exploded={exploded} 
							selected={selected} 
							pulsed={pulsed} 
							runLayout={runLayout} 
							zoomFit={zoomFit} 
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
		// namespace,
	} = state;

	var namespace = undefined;
	if( ownProps && ownProps.params ) {
		namespace = ownProps.params.namespace;
	}

	var typename = undefined;
	if( ownProps && ownProps.params ) {
		typename = ownProps.params.typename;
	}

	var instanceid = undefined;
	if( ownProps && ownProps.params ) {
		instanceid = ownProps.params.instanceid;
	}

	const type = getEntityFromState(state, api, namespace, "type", typename);

	const schema = getEntityFromState(state, api, namespace, "schema", typename);

	return {
		api, 
		namespace: namespace, 
		typename: typename, 
		instanceid: instanceid, 
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

export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootInstance))));
