
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 



const layoutPadding = 10;
const animationDuration = 500;
const easing = 'ease';

const getOrgPos = n => Object.assign({}, n.position());

export default {
	// name: 'grid',
	// name: 'circle',
	name: 'concentric',
	// name: 'dagre',
	// name: 'breadthfirst',
	// name: 'elk',
	// name: 'cise',
	// rankDir: 'BT', // 'TB', 'BT', 'LR', 'RL'
	// ranker: 'longest-path', // 'network-simplex', 'tight-tree', 'longest-path'
	padding: 1,
	spacingFactor: 1.5,
	fit: false, // true,
	animate: true,
	animationDuration: animationDuration,
	animationEasing: easing,
	padding: layoutPadding,
	concentric: function( node ) {
		if( (node) && (node.data("label")) ) {
			if( (node.data("label").includes("[Compose]")) || 
				(node.data("label").includes("[compose]")) ) {
				return 100000;
			} else if( (node.data("label").includes("[Enum]")) || 
				(node.data("label").includes("[enum]")) ) {
				return 30000;
			} else if( (node.data("label").includes("[Interface]")) || 
				(node.data("label").includes("[interface]")) ) {
				return 20000;
			} else if( (node.data("label").includes("[Type]")) || 
				(node.data("label").includes("[type]")) ) {
				return 10000;
			}
		}
		return 1000;
	},
	levelWidth: function( nodes ) {
		return 2;
	}
};
