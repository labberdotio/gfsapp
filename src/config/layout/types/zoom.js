
// 
// Copyright (c) 2021, 2022, John Grundback
// All rights reserved.
// 



const layoutPadding = 10;
const animationDuration = 500;
const easing = 'ease';

export default {
	name: 'concentric',
	fit: false, // true,
	animate: true,
	animationDuration: animationDuration,
	animationEasing: easing,
	avoidOverlap: true,
	levelWidth: () => { return 1; },
	padding: layoutPadding
};
