
// 
// Copyright (c) 2021, 2022, John Grundback
// All rights reserved.
// 



const layoutPadding = 10;
const animationDuration = 500;
const easing = 'ease';

const getOrgPos = n => Object.assign({}, n.position());

export default {
	name: 'dagre',
	rankDir: 'BT', // 'TB', 'BT', 'LR', 'RL'
	ranker: 'longest-path', // 'network-simplex', 'tight-tree', 'longest-path'
	padding: 1,
	spacingFactor: 1.5,
	fit: false, // true,
	animate: true,
	animationDuration: animationDuration,
	animationEasing: easing,
	padding: layoutPadding
};
