
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

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
import Snackbar from '@mui/material/Snackbar';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import APIClient from '../clients/APIClient';

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
				size="small" 
				variant="text" 
				color="secondary" 
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
				size="small" 
				variant="text" 
				color="secondary" 
				endIcon={<ArrowForwardIcon />} 
				onClick={() => navigate(+1)}
			>
				Forward
			</Button>
        </>
    );
};

// class Root extends Component {
const Root = class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			drawerOpen: false, 
			// intendedcenter: undefined, 
			// actualcenter: undefined, 
			grfloading: false, 
			grfloaded: false, 
			grffailed: false, 
			graph: undefined, 
			pgraph: undefined, 
			mainWidth: 0, 
			mainHeight: 0,
			resize: false,
			snackbarMessage: undefined,
			snackbarOpen: false
		}

		var _this = this;

		this.mainRef = React.createRef();

		this.selectItem = this.selectItem.bind(this);
		this.contextCommand = this.contextCommand.bind(this);

		this.resizeTimeout = null;
		this.updateDimensions = this.updateDimensions.bind(this);

	}

	state = {
		drawerOpen: false, 
		// intendedcenter: undefined, 
		// actualcenter: undefined, 
		grfloading: false, 
		grfloaded: false, 
		grffailed: false, 
		graph: undefined, 
		pgraph: undefined, 
		mainWidth: 0, 
		mainHeight: 0,
		resize: false,
		snackbarMessage: undefined,
		snackbarOpen: false
	};

	updateDimensions() {
		var resize = this.state.resize;
		this.setState({
			resize: !resize // this.state.resize
		});
	}

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		var _this = this;

		const {
			api, 
			account, 
			namespace
		} = this.props;

		if( _this.mainRef && _this.mainRef.current ) {
			if( _this.state.mainWidth != _this.mainRef.current.offsetWidth ) {
				if( _this.resizeTimeout ) {
					clearTimeout(_this.resizeTimeout);
				}
				_this.resizeTimeout = setTimeout(function() {
					if( _this.mainRef && _this.mainRef.current ) {
						_this.showInSnackbar("Readjusting size");
						_this.setState({
							mainWidth: _this.mainRef.current.offsetWidth, 
							mainHeight: _this.mainRef.current.offsetHeight
						});
					}
					_this.resizeTimeout = null;
				}.bind(this), 1000)
			}
		}

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
			if( api && account ) {
				this.props.loadNamespaces(api, account);
			}
		}

		if( (!this.props.types["loading"]) && 
			(!this.props.types["loaded"]) && 
			(!this.props.types["failed"]) ) {
			if( api && account && namespace ) {
				this.props.loadTypes(api, account, namespace);
			}
		}

		// if( this.props.tsfailed ) {
		// 	if( (this.notificationRef) && (this.notificationRef.current) ) {
		// 		this.notificationRef.current.showInSnackbar(
		// 			"Failed to load data from API"
		// 		);
		// 	}
		// }

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
					account, 
					namespace, 
					"graph", 
					undefined
				)
			}
		// }

	}

	componentDidMount() {

		var _this = this;

		const {
			api, 
			account, 
			namespace, 
			typename, 
			type, 
			schema
		} = this.props;

		if( _this.mainRef && _this.mainRef.current ) {
			if( _this.state.mainWidth != _this.mainRef.current.offsetWidth ) {
				if( _this.resizeTimeout ) {
					clearTimeout(_this.resizeTimeout);
				}
				_this.resizeTimeout = setTimeout(function() {
					if( _this.mainRef && _this.mainRef.current ) {
						_this.showInSnackbar("Readjusting size");
						_this.setState({
							mainWidth: _this.mainRef.current.offsetWidth, 
							mainHeight: _this.mainRef.current.offsetHeight
						});
					}
					_this.resizeTimeout = null;
				}.bind(this), 1000)
			}
		}

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
			if( api && account ) {
				this.props.loadNamespaces(api, account);
			}
		}

		if( (!this.props.types["loading"]) && 
			(!this.props.types["loaded"]) && 
			(!this.props.types["failed"]) ) {
			if( api && account && namespace ) {
				this.props.loadTypes(api, account, namespace);
			}
		}

		// if( this.props.tsfailed ) {
		// 	if( (this.notificationRef) && (this.notificationRef.current) ) {
		// 		this.notificationRef.current.showInSnackbar(
		// 			"Failed to load data from API"
		// 		);
		// 	}
		// }

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
					account, 
					namespace, 
					"graph", 
					undefined
				)
			}
		// }

		// 
		window.addEventListener("resize", this.updateDimensions);

	}

	componentWillUnmount() {

		// 
		window.removeEventListener("resize", this.updateDimensions);

	}

	getGraph() {
		var allvertexes = {};
		var alledges = {};
		if( this.state.pgraph ) {
			var vertexes = this.state.pgraph["@value"]["vertices"];
			if( vertexes ) {
				for( var i=0; i<vertexes.length; i++ ) {
					var vertex = vertexes[i]["@value"];
					if( (vertex) && (vertex["id"]) ) {
						allvertexes[vertex["id"]] = {
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
					if( (edge) && (edge["id"]) ) {
						alledges[edge["id"]] = {
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
					if( (vertex) && (vertex["id"]) ) {
						allvertexes[vertex["id"]] = {
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
					if( (edge) && (edge["id"]) ) {
						alledges[edge["id"]] = {
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
					if( (vertex) && (vertex["id"]) ) {
						if( vertex["id"] == id ) {
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
				var fullgraphvertices = {}; // Object.assign({}, ...fullgraph["@value"]["vertices"].map((x) => ({[x["@value"]["id"]]: x})));
				var subgraphvertices = Object.assign({}, ...subgraph["@value"]["vertices"].map((x) => ({[x["@value"]["id"]]: x})));
				var newgraphvertices = Object.assign({}, fullgraphvertices, subgraphvertices);
				fullgraph["@value"]["vertices"] = Object.values(newgraphvertices);
			}
			if( subgraph["@value"]["edges"] ) {
				var fullgraphvedges = {}; // Object.assign({}, ...fullgraph["@value"]["edges"].map((x) => ({[x["@value"]["id"]]: x})));
				var subgraphvedges = Object.assign({}, ...subgraph["@value"]["edges"].map((x) => ({[x["@value"]["id"]]: x})));
				var newgraphedges = Object.assign({}, fullgraphvedges, subgraphvedges);
				fullgraph["@value"]["edges"] = Object.values(newgraphedges);
			}
		}
		return fullgraph;
	}

	getTreeData(api, account, namespace, graph) {

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
				if( (vertex) && (vertex["id"]) ) {
					vs[String(vertex["id"])] = vertex; // true;
					var sval = vertex["label"] + " " + vertex["properties"]["name"];
					var included = false;
					var excluded = false;
					if( (sval) && (this.state.search) ) {
						if( sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							included = true;
						} else if( !sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							excluded = true;
						}
					}
					if( !(vertex["label"] in treestruc) ) {
						treestruc[vertex["label"]] = {
							id: vertex["label"], 
							name: vertex["label"], 
							label: vertex["label"], 
							link: undefined, 
							tree: {
							}
						};
					}
					// treestruc[vertex["label"]]["tree"][vertex["properties"]["name"]] = {
					treestruc[vertex["label"]]["tree"][vertex["id"]] = {
						id: vertex["id"], 
						name: vertex["properties"]["name"], 
						label: vertex["properties"]["name"], // + "." + vertex["label"], 
						link: "/account/" + account + "/namespaces/" + namespace + "/" + vertex["label"] + "/" + vertex["id"], 
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
				if( (edge) && (edge["id"]) ) {
					var sval = edge["label"];
					var included = false;
					var excluded = false;
					if( (sval) && (this.state.search) ) {
						if( sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							included = true;
						} else if( !sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							excluded = true;
						}
					}
					var outV = String(edge["outV"]);
					var inV = String(edge["inV"]);
					if( (outV) && (inV) ) {
						if( (vs[outV]) && (vs[inV]) ) {
							var source = vs[outV];
							var target = vs[inV];
							if( !(edge["label"] in treestruc[source["label"]]["tree"][source["id"]]["tree"]) ) {
								treestruc[source["label"]]["tree"][source["id"]]["tree"][edge["label"]] = {
									id: edge["id"], 
									name: edge["label"], 
									label: edge["label"], 
									link: undefined, 
									tree: {
									}
								};
							}
							treestruc[source["label"]]["tree"][source["id"]]["tree"][edge["label"]]["tree"][target["id"]] = {
								id: target["id"], 
								name: target["properties"]["name"], 
								label: target["properties"]["name"], // + "." + target["label"], 
								link: "/account/" + account + "/namespaces/" + namespace + "/" + target["label"] + "/" + target["id"], 
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

	getDataURL(api, account, namespace, typename, type, schema) {
		var dataurl = "http://" + api.api.host + ":" + api.api.port + "/api/v2.0/" + namespace + "/" + typename;
		return dataurl;
	}

	/*
	 * Have to go back to commit cc6304f for this.
	 * Sun Jul 26 20:54:32 2020 -0700
	 * Sun Mar 29 16:20:36 2020 -0500
	 */
	loadInstance(api, account, namespace, typename, instanceid) {
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
				// intendedcenter: instanceid, 
				// actualcenter: this.state.actualcenter, 
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
				account, 
				namespace, 
				typename, 
				instanceid, 
				(data) => {
					this.setState({
						// intendedcenter: instanceid, 
						// actualcenter: instanceid, 
						grfloading: false, 
						grfloaded: true, 
						grffailed: false, 
						graph: this.buildGraph(data), 
						pgraph: this.state.graph
					});
				});

		} catch {
			this.setState({
				// intendedcenter: instanceid, 
				// actualcenter: this.state.actualcenter, 
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
					var account = this.props.account;
					var namespace = this.props.namespace;
					var typename = node["label"];
					this.props.navigate("/account/" + account + "/namespaces/" + namespace + "/" + typename + "/" + id);
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
		//  var account = this.props.account;
		// 	var namespace = this.props.namespace;
		// 	this.props.navigate("/account/" + account + "/namespaces/" + namespace);
		// 	// this.setState({
		// 	// 	grfloading: false, 
		// 	// 	grfloaded: false, 
		// 	// 	grffailed: false, 
		// 	// });
		// 	// }
		// }
	}

	showInSnackbar(message) {
		var _this = this;
		if( !_this.state.snackbarOpen ) {
			_this.setState({
				snackbarMessage: message,
				snackbarOpen: true
			});
		} else {
		}
	}

	onCloseSnackbar() {
		this.setState({
			snackbarMessage: undefined,
			snackbarOpen: false
		});
	}

	render() {

		var _this = this;

		const {
			api, 
			account, 
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

		var hidden = false;
		var open = true;
		var direction = "up";

		var actions = [
			
		];

		// var graph = {}
		// var treestruc = this.getTreeData(api, account, namespace, graph);

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
					}
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
							// color="neutral" 
							// variant="plain" 
							sx={{
								marginRight: '10px !important', 
								color: 'rgb(97, 97, 97)',
								'&:focus': {
									outline: 'none !important',
								}
							}}
						>
							<MenuIcon 
								sx={{
									color: 'rgb(97, 97, 97)'
								}}
							/>
						</IconButton>
						{/* <Button 
							component="a" 
							href="/" 
							size="sm" 
							// color="neutral" 
							// variant="plain" 
							sx={{
								alignSelf: 'center', 
								fontSize: '1.25rem', 
								color: 'rgb(97, 97, 97)'
							}}
						>
							{namespace}
						</Button> */}
						<Button
							size="small" 
							variant="text" 
							color="secondary" 
						>
							{namespace}
						</Button>
					</Header>
				</Layout.Header>
				<Layout.Sidebar>
					<Sidebar 
						api={api} 
						account={account} 
						namespace={namespace} 
						types={types} 
					/>
				</Layout.Sidebar>
				<Layout.List>
					<List
						account={account} 
						namespace={namespace} 
						graph={graph} 
						selected={false}
					/>
				</Layout.List>
				<Layout.Main>
					<Paper 
						ref={this.mainRef} 
						sx={{
							// display: {
							// 	xs: 'inline-block', 
							// 	sm: 'inline-block', 
							// 	md: 'inline-block', 
							// 	lg: 'inline-block'
							// },
							width: "100%", 
							height: "100%", 
							position: "relative", 
							top: "0", 
							left: "0"
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
					</Paper>
					{/* <Snackbar 
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						open={this.state.snackbarOpen}
						autoHideDuration={3000}
						message={this.state.snackbarMessage}
						variant="solid"
						onClose={() => this.onCloseSnackbar()}
					>
						{this.state.snackbarMessage}
					</Snackbar> */}
					<Snackbar 
						open={this.state.snackbarOpen} 
						autoHideDuration={3000} 
						onClose={() => this.onCloseSnackbar()} 
						message={this.state.snackbarMessage} 
					/>
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

		loadNamespaces: (api, account) => dispatch(loadNamespacesIntoState(api, account)),

		// loadTypes: (api, account, namespace) => dispatch(loadEntitiesIntoState(api, account, namespace, 'type')),
		loadTypes: (api, account, namespace) => dispatch(loadEntitiesIntoState(api, account, namespace, 'type')),

		invalidateEntities: (api, resource) => dispatch(invalidateEntitiesInState(api, resource)),

	}
}

function mapStateToProps(state, ownProps) {

	const {
		api, 
		// account, 
		// namespace
	} = state;

	var account = undefined;
	if( ownProps && ownProps.params ) {
		account = ownProps.params.account;
	}

	var namespace = undefined;
	if( ownProps && ownProps.params ) {
		namespace = ownProps.params.namespace;
	}

	const namespaces = getNamespacesFromState(state, api, account);
	const types = getEntitiesFromState(state, api, account, namespace, 'type');

	return {
		api, 
		account: account, 
		namespace: namespace, 
		namespaces: namespaces, 
		types: types, 
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

// export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Root))));
export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(Root)));
