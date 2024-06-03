
// 
// Copyright (c) 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';

// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

import CustomForceGraphComponent from './ForceGraph';



const styles = theme => ({
});

class ThreeDeeGraph extends Component {

	constructor(props) {
		super(props);
		// this.state = {
		// 	highlighted: undefined, 
		// 	exploded: undefined, 
		// 	selected: undefined, 
		// 	refreshed: undefined, 
		// 	zoomFit: true,
		// 	runLayout: true
		// }
		var id = props.selected;
		if(id) {
			// this.setState({
			this.state = {
				exploded: id,
				highlighted: id,
				selected: id,
				refreshed: undefined,
				runLayout: true,
				zoomFit: true
			};
		} else {
			// this.setState({
			this.state = {
				exploded: undefined,
				highlighted: undefined,
				selected: undefined,
				refreshed: undefined,
				runLayout: true,
				zoomFit: true
			};
		}

		var _this = this;

		this.graphRef = React.createRef();

		this.selectItem = this.selectItem.bind(this);

	}

	state = {
		highlighted: undefined, 
		exploded: undefined, 
		selected: undefined, 
		refreshed: undefined, 
		zoomFit: true,
		runLayout: true
	};

	componentWillUpdate(nextProps, nextState) {

		const {
			api, 
			namespace, 
			graph, 
			width, 
			height, 
			selected
		} = this.props;

		if( this.props.selected != nextProps.selected ) {
			var id = nextProps.selected; // selected;
			if(id) {
				this.setState({
					exploded: id,
					highlighted: id,
					selected: id,
					refreshed: undefined,
					runLayout: true,
					zoomFit: true
				});
			} else {
				this.setState({
					exploded: undefined,
					highlighted: undefined,
					selected: undefined,
					refreshed: undefined,
					runLayout: true,
					zoomFit: true
				});
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace, 
			graph, 
			width, 
			height, 
			selected
		} = this.props;

		// if(
		// 	selected && 
		// 	this.state.selected != selected
		// ) {
		// 	var id = selected;
		// 	if(id) {
		// 		this.setState({
		// 			exploded: id,
		// 			highlighted: id,
		// 			selected: id,
		// 			refreshed: undefined,
		// 			runLayout: true,
		// 			zoomFit: true
		// 		});
		// 	} else {
		// 		this.setState({
		// 			exploded: undefined,
		// 			highlighted: undefined,
		// 			selected: undefined,
		// 			refreshed: undefined,
		// 			runLayout: true,
		// 			zoomFit: true
		// 		});
		// 	}
		// }

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			graph, 
			width, 
			height, 
			selected
		} = this.props;

		// if(
		// 	selected && 
		// 	this.state.selected != selected
		// ) {
		// 	var id = selected;
		// 	if(id) {
		// 		this.setState({
		// 			exploded: id,
		// 			highlighted: id,
		// 			selected: id,
		// 			refreshed: undefined,
		// 			runLayout: true,
		// 			zoomFit: true
		// 		});
		// 	} else {
		// 		this.setState({
		// 			exploded: undefined,
		// 			highlighted: undefined,
		// 			selected: undefined,
		// 			refreshed: undefined,
		// 			runLayout: true,
		// 			zoomFit: true
		// 		});
		// 	}
		// }

	}

	// var data = {
	// 	"nodes":[
	// 		{"id":"4062045","user":"mbostock","description":"Force-Directed Graph"}, 
	// 		{"id":"1341021","user":"mbostock","description":"Parallel Coordinates"}, 
	// 		{"id":"1341281","user":"jasondavies","description":"Parallel Coordinates"}
	// 	],
	// 	"links":[
	// 		{"source":"4062045","target":"1341021"},
	// 		{"source":"4062045","target":"1341281"},
	// 		{"source":"1341021","target":"1341281"}
	// 	]
	// }
	getGraphData(graph) {

		var elements = [];

		var vs = {}

		/*
		 * I am converting the redux store to a dict, 
		 * but this expects an array.
		 */
		// if( graph ) {
		// 	graph = Object.values(graph);
		// }

		// Neo4j uses integer vertex/edge ids, this seems to cause issues with cytoscape
		// OrientDB starts IDs with a "#" character, so lets try that.
		// Actually cytoscape supports integer/numerical ids as long as they are converted
		// to strings.
		// Neo4j ids between Vs and Es can clash
		var vidpfx = "v"; // "#";
		var eidpfx = "e"; // "";

		/*
		 * TODO: Dagre does not always re-render if we give it say vertices before edges.
		 * Fix this by loading vertices and edges at once via the graph API call, instead
		 * of loading vertices and edges separate.
		 */
		if( !graph ) {
			return {
				"nodes":[
					
				],
				"links":[
					
				]
			};
		}

		if( !graph["@value"] ) {
			return {
				"nodes":[
					
				],
				"links":[
					
				]
			};
		}

		var vertexes = graph["@value"]["vertices"];
		var edges = graph["@value"]["edges"];

		if( !vertexes ) {
			vertexes = [];
		}

		if( !edges ) {
			edges = [];
		}

		/*
		 * TODO: Dagre does not always re-render if we give it say vertices before edges.
		 * Fix this by loading vertices and edges at once via the graph API call, instead
		 * of loading vertices and edges separate.
		 */
		if( vertexes.length <= 0 ) {
			return {
				"nodes":[
					
				],
				"links":[
					
				]
			};
		}

		/*
		 * TODO: Dagre does not always re-render if we give it say vertices before edges.
		 * Fix this by loading vertices and edges at once via the graph API call, instead
		 * of loading vertices and edges separate.
		 */
		// if( edges.length <= 0 ) {
		// 	return {
		// 		"nodes":[
		// 			
		// 		],
		// 		"links":[
		// 			
		// 		]
		// 	};
		// }

		var nodes = [];
		var links = [];

		if( vertexes ) {
			for( var i=0; i<vertexes.length; i++ ) {
				var vertex = vertexes[i]["@value"];
				if( (vertex) && (vertex["_id"]) ) {
				// if( (vertex) && (vertex["_id"]) && 
				// 	( (vertex["_label"] != "Compose") && (vertex["_label"] != "type") && (vertex["_label"] != "interface") && (vertex["_label"] != "enum") ) ) {
					var sval = vertex["_label"] + " " + vertex["properties"]["_name"];
					var included = false;
					var excluded = false;
					// if( (sval) && (this.state.search) ) {
					// 	if( sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
					// 		included = true;
					// 	} else if( !sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
					// 		excluded = true;
					// 	}
					// }
					/*
					 * We can exclude/filter vertices with something like this
					 */

					var createdflag = false;
					// var createddelta = (Date.now()) - (vertex["properties"]["_created"] * 1000);
					// if( createddelta <= ( 1 * 60 * 60 * 1000 ) ) {
					// 	createdflag = true;
					// }

					var modifiedflag = false;
					// var modifieddelta = (Date.now()) - (vertex["properties"]["_modified"] * 1000);
					// if( modifieddelta <= ( 1 * 60 * 60 * 1000 ) ) {
					// 	modifiedflag = true;
					// }

					vs[String(vertex["_id"])] = true;
					// var element = {
					// 	data: {
					// 		id: vidpfx + String(vertex["_id"]), 
					// 		name: vertex["properties"]["_name"], // + "\n" + "[" + vertex["_label"] + "]",
					// 		label: vertex["properties"]["_name"] + "\n" + "[" + vertex["_label"] + "]" + (createdflag ? ' [NEW]' : '') + (modifiedflag ? ' [FRESH]' : ''),
					// 		selected: false,
					// 		cytoscape_alias_list: [
					// 			vertex["properties"]["_name"]
					// 		],
					// 		canonicalName: vertex["properties"]["_name"],
					// 		NodeType: vertex["_label"],
					// 		shared_name: vertex["properties"]["_name"],
					// 	}, 
					// 	selected: false, 
					// 	classes: vertex["_label"] + ' ' + (included ? 'included' : '') + ' ' + (excluded ? 'excluded' : '') + ' ' + (createdflag ? 'created' : '') + ' ' + (modifiedflag ? 'modified' : '')
					// };
					var element = {
						id: vidpfx + String(vertex["_id"]), 
						label: vertex["_label"], 
						name: vertex["properties"]["_name"], // + "\n" + "[" + vertex["_label"] + "]",
						description: vertex["properties"]["_name"] + "\n" + "[" + vertex["_label"] + "]" + (createdflag ? ' [NEW]' : '') + (modifiedflag ? ' [FRESH]' : ''),
					};
					// elements.push(element);
					nodes.push(element);
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
					// if( (sval) && (this.state.search) ) {
					// 	if( sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
					// 		included = true;
					// 	} else if( !sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
					// 		excluded = true;
					// 	}
					// }
					/*
					 * We can exclude/filter edges with something like this
					 */
					// if( edge["_label"] == ... ) {
					// 	continue;
					// }
					var _outV = String(edge["_outV"]);
					var _inV = String(edge["_inV"]);
					if( (_outV) && (_inV) ) {
						if( (vs[_outV]) && (vs[_inV]) ) {
							var source = vidpfx + String(edge["_outV"]);
							var target = vidpfx + String(edge["_inV"]);
							var label = edge["_label"]; // + " (" + edge["_outV"] + " to " + edge["_inV"] + ")";
							// if( edge["_label"] === 'in' ) {
							// 	source = vidpfx + String(edge["_inV"]);
							// 	target = vidpfx + String(edge["_outV"]);
							// 	label = "";
							// }
							// elements.push({
							// links.push({
							// 	data: {
							// 		id: eidpfx + String(edge["_id"]), 
							// 		source: source,
							// 		target: target,
							// 		label: label
							// 	},
							// 	classes: 'autorotate' + ' ' + edge["_label"] + ' ' + (included ? 'included' : '') + ' ' + (excluded ? 'excluded' : '')
							// });
							links.push({
								id: eidpfx + String(edge["_id"]), 
								source: source,
								target: target,
								label: label
							});
						} else {
							
						}
					}
				}
			}
		}

		return {
			"nodes": nodes,
			"links": links
		};
	}

	// selectItem(id) {
	// 	// 
	// }

	selectItem(id) {
		// // if( (id) && (this.state.highlighted == id) ) {
		// // 	this.setState({
		// // 		exploded: id,
		// // 		highlighted: undefined,
		// // 		selected: undefined
		// // 	});
		// // } else 
		if(id) {
			/*
			 * Cannot do this
			 */
			// this.props.selected = id;
			this.setState({
				exploded: id,
				highlighted: id,
				selected: id,
				refreshed: undefined,
				runLayout: true,
				zoomFit: true
			});
		} else {
			/*
			 * Cannot do this
			 */
			// this.props.selected = undefined;
			this.setState({
				exploded: undefined,
				highlighted: undefined,
				selected: undefined,
				refreshed: undefined,
				runLayout: true,
				zoomFit: true
			});
		}
		if( this.props.selectItem ) {
			this.props.selectItem(id);
		}
	}

	render() {

		const {
			api, 
			namespace, 
			graph, 
			width, 
			height
		} = this.props;

		const { classes } = this.props;

		var setwidth = width;
		// var minwidth = width;

		var setheight = height;
		// var minheight = height;

		if( !setwidth ) {
			setwidth = 640;
		}

		// if( !minwidth ) {
		// 	minwidth = 640;
		// }

		if( !setheight ) {
			setheight = 640;
		}

		// if( !minheight ) {
		// 	minheight = 640;
		// }

		var graphData = this.getGraphData(graph);

		// var layouts = {
		// 	"main": main,
		// 	"highlight": highlight,
		// 	"zoom": zoom
		// }

		// var stylesheets = {
		// 	"style": style,
		// };

		// var backdropOpen = false;
		// if( ... ) {
		// 	backdropOpen = true;
		// }

		var highlighted = this.state.highlighted;
		var exploded = this.state.exploded;
		var selected = this.state.selected;
		// var refreshed = this.state.refreshed;
		var pulsed = this.state.refreshed;
		var runLayout = this.state.runLayout;
		var zoomFit = this.state.zoomFit;

		// return (
		// 	<>
		// 	<CustomForceGraphComponent 
		// 		graphData={graphData}
		// 	/>
		// 	</>
		// );

		return (
			<>
			{/* <Container 
				className={classes.graphContainer} 
				className="graphContainer" 
				maxWidth="false"> */}
			{/* <Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>			 */}
			<CustomForceGraphComponent 
				ref={this.graphRef} 
				graphData={graphData} 
				width={setwidth} 
				height={setheight} 
				selected={selected} 
				onSelectItem={this.selectItem} 
			/>
			{/* </Container> */}
			</>
		);

	}

}

function mapDispatchToProps(dispatch) {
	return {
	}
}

function mapStateToProps(state, ownProps) {

	const {
		namespace, 
		// graph, 
		// selected
	} = ownProps;

	const {
		api, 
		// namespace
	} = state;

	return {
		api, 
		namespace: namespace, 
		// graph: graph, 
		// selected: selected
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ThreeDeeGraph));
