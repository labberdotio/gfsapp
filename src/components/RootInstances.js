
// 
// Copyright (c) 2020, 2021, 2022, 2023, 2024, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'

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

import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import APIClient from '../clients/APIClient';

import {
	loadNamespacesIntoState
} from '../actions/Namespace'

import { 
	loadEntityIntoState, 
	loadEntitiesIntoState, 
	invalidateEntitiesInState
} from '../actions/Entity'

import {
	getNamespacesFromState
} from '../stores/Namespace'

import { 
	getEntityFromState, 
	getEntitiesFromState 
} from '../stores/Entity'

import Layout from './Layout';
import Sidebar from './Sidebar';
import Header from './Header';
import List from './List';
import Graph from './Graph';
// import ThreeDeeGraph from './ThreeDeeGraph';

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

// class RootInstances extends Component {
const RootInstances = class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			drawerOpen: false, 
			intendedcenter: undefined, 
			actualcenter: undefined, 
			grfloading: false, 
			grfloaded: false, 
			grffailed: false, 
			graph: undefined, 
			pgraph: undefined, 
			mainWidth: 0, 
			mainHeight: 0
		}

		var _this = this;

		this.mainRef = React.createRef();

		this.selectItem = this.selectItem.bind(this);
		this.contextCommand = this.contextCommand.bind(this);

	}

	state = {
		drawerOpen: false, 
		intendedcenter: undefined, 
		actualcenter: undefined, 
		grfloading: false, 
		grfloaded: false, 
		grffailed: false, 
		graph: undefined, 
		pgraph: undefined, 
		mainWidth: 0, 
		mainHeight: 0
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

		if( this.mainRef && this.mainRef.current ) {
			if( this.state.mainWidth != this.mainRef.current.offsetWidth ) {
				this.setState({
					mainWidth: this.mainRef.current.offsetWidth, 
					mainHeight: this.mainRef.current.offsetHeight
				});
			}
		}

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
			if( api ) {
				this.props.loadNamespaces(api);
			}
		}

		if( (!this.props.types["loading"]) && 
			(!this.props.types["loaded"]) && 
			(!this.props.types["failed"]) ) {
			if( api && namespace ) {
				this.props.loadTypes(api, namespace);
			}
		}

		// if( this.props.tsfailed ) {
		// 	if( (this.notificationRef) && (this.notificationRef.current) ) {
		// 		this.notificationRef.current.showInSnackbar(
		// 			"Failed to load data from API"
		// 		);
		// 	}
		// }

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

		var center = undefined;
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
			type, 
			schema
		} = this.props;

		if( this.mainRef && this.mainRef.current ) {
			if( this.state.mainWidth != this.mainRef.current.offsetWidth ) {
				this.setState({
					mainWidth: this.mainRef.current.offsetWidth, 
					mainHeight: this.mainRef.current.offsetHeight
				});
			}
		}

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
			if( api ) {
				this.props.loadNamespaces(api);
			}
		}

		if( (!this.props.types["loading"]) && 
			(!this.props.types["loaded"]) && 
			(!this.props.types["failed"]) ) {
			if( api && namespace ) {
				this.props.loadTypes(api, namespace);
			}
		}

		// if( this.props.tsfailed ) {
		// 	if( (this.notificationRef) && (this.notificationRef.current) ) {
		// 		this.notificationRef.current.showInSnackbar(
		// 			"Failed to load data from API"
		// 		);
		// 	}
		// }

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

		var center = undefined;
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
		} 
		// else {
		// 	var iid = undefined;
		// 	// if( this.state.instanceid ) {
		// 	var namespace = this.props.namespace;
		// 	this.props.navigate("/namespaces/" + namespace);
		// 	// this.setState({
		// 	// 	grfloading: false, 
		// 	// 	grfloaded: false, 
		// 	// 	grffailed: false, 
		// 	// });
		// 	// }
		// }
	}

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			namespaces, 
			types, 
			typename, 
			type, 
			schema
		} = this.props;

		const drawerOpen = this.state.drawerOpen;

		function setDrawerOpen(setting) {
			_this.setState({
				drawerOpen: setting
			});
		}

		function toggleDrawerOpen() {
			_this.setState({
				drawerOpen: !_this.state.drawerOpen
			});
		}

		var backdropOpen = false;

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		var graph = this.getGraph();

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
		// var treestruc = this.getTreeData(api, namespace, graph);

		var graphwidth = 640;
		var graphheight = "calc(100vh - 40px - 64px)"; // 640;
		if( this.state.mainWidth > 0 ) {
			graphwidth = this.state.mainWidth
		}
		if( this.state.mainHeight > 0 ) {
			graphheight = this.state.mainHeight
		}

		return (
			<>
			<Layout.Root
				drawerOpen={drawerOpen} 
				sx={[
					drawerOpen && {
						height: '100vh',
						overflow: 'hidden',
					},
				]}
				>
				<Layout.Header
					drawerOpen={drawerOpen} 
					toggleDrawerOpen={toggleDrawerOpen} 
				>
					<Header 
						drawerOpen={drawerOpen} 
						toggleDrawerOpen={toggleDrawerOpen} 
						api={api} 
						namespace={namespace} 
						types={types} 
					>
						<IconButton 
							onClick={() => toggleDrawerOpen()} 
							color="neutral" 
							variant="plain" 
							sx={{
								marginRight: '10px !important', 
								color: 'rgb(97, 97, 97)'
							}}
						>
							<MenuIcon 
								sx={{
									color: 'rgb(97, 97, 97)'
								}}
							/>
						</IconButton>
						<BackNavButton></BackNavButton>
						<Button 
							component="a" 
							href="/" 
							size="sm" 
							color="neutral" 
							variant="plain" 
							sx={{
								alignSelf: 'center', 
								fontSize: '1.25rem', 
								color: 'rgb(97, 97, 97)'
							}}
						>
							{typename}
						</Button>
					</Header>
				</Layout.Header>
				<Layout.Sidebar>
					<Sidebar 
						api={api} 
						namespace={namespace} 
						types={types} 
					/>
				</Layout.Sidebar>
				<Layout.List>
					<List
						namespace={namespace} 
						graph={graph} 
						selected={false}
					/>
				</Layout.List>
				{/* <Layout.Breadcrumb>
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
				</Layout.Breadcrumb> */}
				<Layout.Main>
					<Sheet 
						sx={{
							display: {
								xs: 'none',
								sm: 'none', 
								md: 'none',
								lg: 'none'
							}							
						}}
					>
					<List
						namespace={namespace} 
						graph={graph} 
						selected={false}
					/>
					</Sheet>
					<Sheet 
						ref={this.mainRef} 
						sx={{
							display: {
								xs: 'initial',
								sm: 'initial', 
								md: 'initial',
								lg: 'initial'
							}, 
							width: "100%", 
							height: "100%"
						}}
					>
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
						contextCommand={this.contextCommand}
					/>
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
						contextCommand={this.contextCommand}
					/> */}
					</Sheet>
				</Layout.Main>
				<Layout.Side>
					<Graph
						graph={graph}
						width={300} 
						height={300} 
						highlighted={highlighted} 
						exploded={exploded} 
						selected={selected} 
						pulsed={pulsed} 
						runLayout={runLayout} 
						zoomFit={zoomFit} 
						selectItem={this.selectItem} 
						contextCommand={this.contextCommand}
					/>
				</Layout.Side>
			</Layout.Root>
			</>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {

		loadNamespaces: (api) => dispatch(loadNamespacesIntoState(api)),

		// loadTypes: (api, namespace) => dispatch(loadEntitiesIntoState(api, namespace, 'type')),
		loadTypes: (api, namespace) => dispatch(loadEntitiesIntoState(api, namespace, 'type')),

		loadType: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "type", typename)),

		loadSchema: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "schema", typename)),

		invalidateEntities: (api, resource) => dispatch(invalidateEntitiesInState(api, resource)),

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

	const namespaces = getNamespacesFromState(state, api);
	const types = getEntitiesFromState(state, api, namespace, 'type');
	const type = getEntityFromState(state, api, namespace, "type", typename);
	const schema = getEntityFromState(state, api, namespace, "schema", typename);

	return {
		api, 
		namespace: namespace, 
		typename: typename, 
		namespaces: namespaces, 
		types: types, 
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

// export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootInstances))));
export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(RootInstances)));
