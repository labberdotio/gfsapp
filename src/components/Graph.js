
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';

// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

import CustomCytoscapeComponent from './Cytoscape';

import { main, highlight, zoom } from '../config/layout/graph';



const styles = theme => ({
});



const graphstyles = [ 
	{
		"selector": "node[label]",
		"style": {
			"label": "data(label)",
			"font-weight": "bold",
			"color" : "#000",
		}
	}, {
		"selector": "edge[label]",
		"style": {
			"label": "data(label)",
			"font-weight": "bold",
			"color" : "#fff",
		}
	}, {
		selector : 'node',
		style : {
			'shape': 'roundrectangle',
			'height': 80,
			'width': 300,
			'font-size': 24,
			"text-valign": "center",
			"text-halign": "center",
			"text-wrap": "wrap",
			"text-max-width": 200,
			'background-color': 'rgb(97, 97, 97)',
			'color': 'white',
			'opacity' : 1.0,
		}
	}, {
		selector: 'node.type',
		style: {
			'background-color' : 'rgb(214, 79, 138)'
		}
	}, {
		selector: 'node.interface',
		style: {
			'background-color' : 'rgb(242, 176, 90)'
		}
	}, {
		selector: 'node.Compose',
		style: {
			'background-color' : 'rgb(126, 68, 168)'
		}
	}, {
		selector : 'node:selected',
		style : {
			'height' : 80,
			'width' : 300,
			"text-valign": "center",
			"text-halign": "center",
			"text-wrap": "wrap",
			"text-max-width": 200,
			'border-color': 'rgb(126, 68, 168)',
			'border-width': '8px',
			'opacity' : 1.0,
			'z-index': 9999
		}
	}, {
		selector : 'edge',
		style : {
			"text-background-opacity": 1,
			"color": "#fff",
			"text-background-color": "rgb(97, 97, 97)",
			"text-background-shape": "roundrectangle",
			'target-arrow-shape': 'triangle',
			'font-size': 20,
			'color': 'white',
			'border-color': '#000',
			'border-width': '2px',
			'width' : 5,
			'opacity' : 1.0,
			'line-color' : 'rgb(97, 97, 97)'
		}
	}, {
		selector : 'edge:selected',
		style : {
			"text-background-color": "rgb(97, 97, 97)",	
			"text-background-color": "rgb(97, 97, 97)",
		}
	}, {
		selector : 'edge.references',
		style : {
			'line-color' : 'rgb(126, 68, 168)',
			"text-background-color": 'rgb(126, 68, 168)',
		}
	}, {
		selector : 'edge.manages',
		style : {
			'line-color' : 'rgb(126, 68, 168)',
			"text-background-color": 'rgb(126, 68, 168)',
		}
	}, {
		selector : 'edge.extends',
		style : {
			'line-color' : 'rgb(214, 79, 138)',
			"text-background-color": 'rgb(214, 79, 138)',
		}
	}, {
		selector : 'edge.implements',
		style : {
			'line-color' : 'rgb(242, 176, 90)',
			"text-background-color": 'rgb(242, 176, 90)',
		}
	}, {
		selector : 'edge.instanceOf',
		style : {
			'line-color' : 'rgb(214, 79, 138)',
			"text-background-color": 'rgb(214, 79, 138)',
		}
	}, 

	// 

	{
		selector : 'node.created',
		style : {
			
		}
	}, {
		selector : 'node.modified',
		style : {
			
		}
	}, 

	// some style for the extension

	{
		selector: '.eh-handle',
		style: {
		'background-color': 'red',
		'width': 12,
		'height': 12,
		'shape': 'ellipse',
		'overlay-opacity': 0,
		'border-width': 12, // makes the handle easier to hit
		'border-opacity': 0
		}
	},

	{
		selector: '.eh-hover',
		style: {
		'background-color': 'red'
		}
	},

	{
		selector: '.eh-source',
		style: {
		'border-width': 2,
		'border-color': 'red'
		}
	},

	{
		selector: '.eh-target',
		style: {
		'border-width': 2,
		'border-color': 'red'
		}
	},

	{
		selector: '.eh-preview, .eh-ghost-edge',
		style: {
		'background-color': 'red',
		'line-color': 'red',
		'target-arrow-color': 'red',
		'source-arrow-color': 'red'
		}
	},

	{
		selector: '.eh-ghost-edge.eh-preview-active',
		style: {
		'opacity': 0
		}
	},

	// 

	{
		selector: 'node.included',
		style: {
			'height' : 80,
			'width' : 300,
			'opacity': 1,
		}
	},

	{
		selector: 'node.excluded',
		style: {
			'opacity': 0.1,
		}
	},

	{
		selector: 'edge.included',
		style: {
			'opacity': 1.0,
		}
	},

	{
		selector: 'edge.excluded',
		style: {
			'opacity': 0.1,
		}
	},

	// 

	{
		selector: 'node.highlighted',
		style: {
			'min-zoomed-font-size': 0,
			'z-index': 9999,
			'opacity': 1
		}
	},

	{
		selector: 'node.highlighted.excluded',
		style: {
			'opacity': 0.8,
		}
	},

	{
		selector: 'edge.highlighted',
		style: {
			'opacity': 0.8,
			'width': 4,
			'z-index': 9999,
			'opacity': 1,
		}
	},

	{
		selector: 'node.exploded',
		style: {
			'min-zoomed-font-size': 0,
			'z-index': 9999,
			'opacity': 1
		}
	},

	{
		selector: 'edge.exploded',
		style: {
			'opacity': 0.8,
			'width': 4,
			'z-index': 9999,
			'opacity': 1,
			'curve-style': 'bezier',
		}
	},

	{
		selector: '.faded',
		style: {
			'events': 'no'
		}
	},

	{
		selector: 'node.faded',
		style: {
			'opacity': 0.08
		}
	},

	{
		selector: 'edge.faded',
		style: {
			'opacity': 0.06
		}
	},

	{
		selector: '.hidden',
		style: {
			'display': 'none'
		}
	},

];
const style = graphstyles;



class Graph extends Component {

	constructor(props) {
		super(props);
		this.state = {
			highlighted: undefined, 
			exploded: undefined, 
			selected: undefined, 
			refreshed: undefined, 
			zoomFit: true,
			runLayout: true
		}

		this.graphRef = React.createRef();

		this.onSelectItem = this.onSelectItem.bind(this);
		this.onContextCommand = this.onContextCommand.bind(this);

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

	}

	componentDidMount() {

		const {
			api, 
			namespace
		} = this.props;

	}

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
			return [];
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
			return [];
		}

		/*
		 * TODO: Dagre does not always re-render if we give it say vertices before edges.
		 * Fix this by loading vertices and edges at once via the graph API call, instead
		 * of loading vertices and edges separate.
		 */
		if( edges.length <= 0 ) {
			return [];
		}

		if( vertexes ) {
			for( var i=0; i<vertexes.length; i++ ) {
				var vertex = vertexes[i]["@value"];
				if( (vertex) && (vertex["_id"]) ) {
					var sval = vertex["_label"] + " " + vertex["_name"];
					var included = false;
					var excluded = false;
					if( (sval) && (this.state.search) ) {
						if( sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							included = true;
						} else if( !sval.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()) ) {
							excluded = true;
						}
					}
					/*
					 * We can exclude/filter vertices with something like this
					 */

					var createdflag = false;
					var createddelta = (Date.now()) - (vertex["_created"] * 1000);
					if( createddelta <= ( 1 * 60 * 60 * 1000 ) ) {
						createdflag = true;
					}

					var modifiedflag = false;
					var modifieddelta = (Date.now()) - (vertex["_modified"] * 1000);
					if( modifieddelta <= ( 1 * 60 * 60 * 1000 ) ) {
						modifiedflag = true;
					}

					vs[String(vertex["_id"])] = true;
					var element = {
						data: {
							id: vidpfx + String(vertex["_id"]), 
							name: vertex["_name"], // + "\n" + "[" + vertex["_label"] + "]",
							label: vertex["_name"] + "\n" + "[" + vertex["_label"] + "]" + (createdflag ? ' [NEW]' : '') + (modifiedflag ? ' [FRESH]' : ''),
							selected: false,
							cytoscape_alias_list: [
								vertex["_name"]
							],
							canonicalName: vertex["_name"],
							NodeType: vertex["_label"],
							shared_name: vertex["_name"],
						}, 
						selected: false, 
						classes: vertex["_label"] + ' ' + (included ? 'included' : '') + ' ' + (excluded ? 'excluded' : '') + ' ' + (createdflag ? 'created' : '') + ' ' + (modifiedflag ? 'modified' : '')
					};
					elements.push(element);
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
							elements.push({
								data: {
									id: eidpfx + String(edge["_id"]), 
									source: source,
									target: target,
									label: label
								},
								classes: 'autorotate' + ' ' + edge["_label"] + ' ' + (included ? 'included' : '') + ' ' + (excluded ? 'excluded' : '')
							});
						}
					}
				}
			}
		}

		return elements;
	}

	/*
	 * 
	 */

	onContextCommand(type, command, selected, allselected) {

	};

	onSelectItem(id) {
		this.selectItem(id);
	}

	selectItem(id) {
		// if( (id) && (this.state.highlighted == id) ) {
		// 	this.setState({
		// 		exploded: id,
		// 		highlighted: undefined,
		// 		selected: undefined
		// 	});
		// } else 
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

		// var graph = {}
		var elements = this.getGraphData(graph);

		var layouts = {
			"main": main,
			"highlight": highlight,
			"zoom": zoom
		}

		var stylesheets = {
			"style": style,
		};

		// var backdropOpen = false;
		// if( ... ) {
		// 	backdropOpen = true;
		// }

		var highlighted = this.state.highlighted;
		var exploded = this.state.exploded;
		var selected = this.state.selected;
		var pulsed = this.state.refreshed;
		var runLayout = this.state.runLayout;
		var zoomFit = this.state.zoomFit;

		return (
			<>
			{/* <Container 
				className={classes.graphContainer} 
				className="graphContainer" 
				maxWidth="false"> */}
			{/* <Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>						 */}
			<CustomCytoscapeComponent
				ref={this.graphRef}
				className="graph"
				highlighted={highlighted}
				exploded={exploded}
				selected={selected}
				pulsed={pulsed}
				zoomFit={zoomFit}
				runLayout={runLayout}
				onSelectItem={this.onSelectItem}
				onContextCommand={this.onContextCommand}
				elements={elements}
				layout={layouts.main}
				layouts={layouts}
				mainLayout={layouts.main}
				highlightLayout={layouts.highlight}
				zoomLayout={layouts.zoom}
				stylesheet={stylesheets.style}
				stylesheets={stylesheets}
				style={{
					width: setwidth, 
					// minWidth: minwidth, 
					height: setheight, 
					// minHeight: minheight, 
					backgroundColor: "white"
				}}
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
		graph
	} = ownProps;

	const {
		api, 
		// namespace, 
	} = state;

	return {
		api, 
		namespace: namespace, 
		graph: graph
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Graph));
