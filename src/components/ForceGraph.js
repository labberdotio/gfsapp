
// 
// Copyright (c) 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';

import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';
// import ForceGraphVR from 'react-force-graph-vr';
// import ForceGraphAR from 'react-force-graph-ar';

class CustomForceGraphComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
            // 
		}

		var _this = this;

		this.onNodeClick = this.onNodeClick.bind(this);
		this.onBackgroundClick = this.onBackgroundClick.bind(this);	

		this.fgRef = React.createRef();

	}

	state = {
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	// componentDidUpdate(prevProps, prevState) {
	// }

	componentDidUpdate(prevProps) {
        this.updateForceGraph(prevProps, this.props);
	}

	componentDidMount() {
        // 
	}

	updateForceGraph(prevProps, newProps) {
		// if( newProps && newProps.layout ) {
		if( newProps ) {

			// if( newProps.selected && this.props.graphData && this.props.graphData.nodes ) {
			if( newProps.selected && prevProps.graphData && prevProps.graphData.nodes ) {
				var selected = newProps.selected;
				// for( var nodeidx in this.props.graphData.nodes ) {
				for( var nodeidx in prevProps.graphData.nodes ) {
					// if( this.props.graphData.nodes[nodeidx]["id"] == selected ) {
					if( prevProps.graphData.nodes[nodeidx]["id"] == selected ) {
						// var node = this.props.graphData.nodes[nodeidx];
						var node = prevProps.graphData.nodes[nodeidx];
						if( node && node.x && node.y && node.z ) {

							// Aim at node from outside it
							const distance = 40;
							const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
						
							this.fgRef.current.cameraPosition(
								{ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
								node, // lookAt ({ x, y, z })
								300  // ms transition duration
							);

						}
					}
				}
			} else {

				// this.fgRef.current.cameraPosition(
				// 	{ x: 0, y: 0, z: 0 }, 
				// 	undefined, 
				// 	300  // ms transition duration
				// );

			}

		}
	}

	onSelectItem(id, tab) {
		if( this.props.onSelectItem ) {
			this.props.onSelectItem(id, tab);
		}
	}

	// handleClick(node) {
	// 	// Aim at node from outside it
	// 	const distance = 40;
	// 	const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
	// 
	// 	this.fgRef.current.cameraPosition(
	// 		{ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
	// 		node, // lookAt ({ x, y, z })
	// 		300  // ms transition duration
	// 	);
	// }

	onNodeClick(node) {
		this.onSelectItem(node.id, 0);
	}

	onBackgroundClick() {
		this.onSelectItem(undefined, 0);
	}

	render() {

		// var _this = this;

		// const {
			
		// } = this.props;

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

		var graphData = this.props.graphData;

		// const handleClick = useCallback(node => {
		// 	// Aim at node from outside it
		// 	const distance = 40;
		// 	const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
		// 
		// 	fgRef.current.cameraPosition(
		// 		{ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
		// 		node, // lookAt ({ x, y, z })
		// 		3000  // ms transition duration
		// 		);
		// }, [this.fgRef]);

		var width = this.props.width;
		var height = this.props.height;

		var selected = this.props.selected;

		return (
			<>
			{/* <ForceGraph2D 
				ref={this.fgRef}
				graphData={graphData}
				dagMode={'radialout'}
				dagLevelDistance={300}
				nodeLabel={node => `${node.name}: ${node.description}`} 
				nodeAutoColorBy="label" 
				linkAutoColorBy="label" 
				linkOpacity={0.5} 
				linkCurvature="curvature" 
				linkCurveRotation="rotation" 
				linkDirectionalParticles={2} 
				linkDirectionalParticleColor={() => 'red'}
				linkDirectionalParticleWidth={6}
				linkHoverPrecision={10}
				onNodeClick={this.handleClick} 
				onLinkClick={link => this.fgRef.current.emitParticle(link)}
				width={width} // {1000} 
				height={height} // {600} 
			/> */}
			<ForceGraph3D 
				ref={this.fgRef}
				graphData={graphData} 
				nodeLabel={node => `${node.name}: ${node.description}`} 
				nodeAutoColorBy="label" 
				linkAutoColorBy="label" 
				linkOpacity={0.5} 
				linkCurvature="curvature" 
				linkCurveRotation="rotation" 
				linkDirectionalParticles={2} 
				onNodeClick={this.onNodeClick} 
				onBackgroundClick={this.onBackgroundClick} 
				width={width} // {1000} 
				height={height} // {600} 
				backgroundColor="white"
			/>
			</>
		);
	}

}

export default CustomForceGraphComponent;
