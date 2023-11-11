
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

		this.handleClick = this.handleClick.bind(this);

		this.fgRef = React.createRef();

	}

	state = {
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	// componentDidUpdate(prevProps, prevState) {
	// }

	componentDidUpdate(prevProps) {
        // 
	}

	componentDidMount() {
        // 
	}

	handleClick(node) {
		// Aim at node from outside it
		const distance = 40;
		const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

		this.fgRef.current.cameraPosition(
			{ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
			node, // lookAt ({ x, y, z })
			300  // ms transition duration
		);
	}

	render() {

		// var _this = this;

		// const {
			
		// } = this.props;

		// const { classes } = this.props;

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
				onNodeClick={this.handleClick} 
				width={width} // {1000} 
				height={height} // {600} 
			/>
			</>
		);
	}

}

export default CustomForceGraphComponent;
