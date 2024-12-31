
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import ReactDOM from 'react-dom';
import Cytoscape from 'cytoscape';

import CytoscapeComponent from 'react-cytoscapejs';

import Cxtmenu from 'cytoscape-cxtmenu';
import edgehandles from 'cytoscape-edgehandles';
import dagre from 'cytoscape-dagre';

Cytoscape.use( Cxtmenu );
Cytoscape.use( edgehandles );
Cytoscape.use( dagre );
// Cytoscape.use( nodeHtmlLabel );

const animationDuration = 500;
const easing = 'ease';

const delayPromise = duration => new Promise(resolve => setTimeout(resolve, duration));

const getOrgPos = n => Object.assign({}, n.position());

class CustomCytoscapeComponent extends CytoscapeComponent {

	constructor(props) {
		super(props);
		this.state = this.calcState({
		});
		this.onSelectItem = this.onSelectItem.bind(this);
		this.onContextCommand = this.onContextCommand.bind(this);
		this.pulsing = {}
	}

	state = {
	};

	calcState(state) {
		state = Object.assign({}, this.state, state)
		return state;
	}

	onSelectItem(id, tab) {
		if( this.props.onSelectItem ) {
			this.props.onSelectItem(id, tab);
		}
	}

	onContextCommand(type, command, selected, allselected) {
		if( this.props.onContextCommand ) {
			this.props.onContextCommand(type, command, selected, allselected);
		}
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	// componentDidUpdate(prevProps, prevState) {
	// }

	componentDidUpdate(prevProps) {
		this.updateCytoscape(prevProps, this.props);
	}

	componentDidMount() {

		var _this = this;

		const container = ReactDOM.findDOMNode(this);

		const {
			highlighted,
			exploded,
			selected,
			global,
			headless,
			styleEnabled,
			hideEdgesOnViewport,
			textureOnViewport,
			motionBlur,
			motionBlurOpacity,
			wheelSensitivity,
			pixelRatio
		} = this.props;

		// 
		// This causes "Can not register ... since ... already exists" page (re)load issues
		// 
		// Cytoscape.use( Cxtmenu );
		// Cytoscape.use( edgehandles );
		// Cytoscape.use( dagre );

		const cy = (this._cy = new Cytoscape({
			container,
			headless,
			styleEnabled,
			hideEdgesOnViewport,
			textureOnViewport,
			motionBlur,
			motionBlurOpacity,
			wheelSensitivity,
			pixelRatio
		}));

		// nodeHtmlLabel( cy ); // register extension

		cy.nodes().panify().ungrabify();
		cy.mount(container);
		cy.fit(10);

		cy.on('tap', this.onTap = e => {
			if( e.target === cy ) {
				this.onSelectItem(undefined, 0);
			} else if( e.target && e.target.id() ) {
				this.onSelectItem(e.target.id(), 0);
			}
		});

		/*
		 * This one has issues on ios
		 */
		// cy.on('click', 'node', this.onTap = e => {
		// 	var selected = e.target.id();
		// 	const node = e.target;
		// 	this.onSelectItem(e.target.id(), 0);
		// 
		// 	// var node = e.target;
		// 	// var a = node.animation({
		// 	// 	css: {
		// 	// 		height: 100,
		// 	// 		width: 320
		// 	// 	},
		// 	// 	duration: 400,
		// 	// 	queue: true
		// 	// });
		// 	// // increase node size
		// 	// a.play().promise("complete").then(function() {
		// 	// 	// revert size increase
		// 	// 	a.reverse().play();
		// 	// });
		// 
		// });

		cy.on('layoutstart', function (e) {
			// 
		});

		cy.on('layoutstop', function (e) {
			_this._cy.nodes().forEach((n) => {
				n.data.orgPos = n.position();
			});
		});

		cy.cxtmenu({
			selector: 'node',
			commands: [{
				content: 'Select',
				select: function(ele) {
					if( ele && ele.id() ) {
						_this.onSelectItem(ele.id(), 0);
					}
				},
				enabled: true
			}, {
				content: 'Clone',
				select: function(ele) {
					// 
				},
				enabled: true
			}, {
				content: 'Delete',
				select: function(ele) {
					// 
				},
				enabled: true
			}, {
				content: 'Link',
				select: function(ele) {
					// 
				},
				enabled: true
			}, {
				content: 'View',
				select: function(ele) {
					// 
				},
				enabled: true
			}, {
				content: 'Properties',
				select: function(ele) {
					// 
				},
				enabled: true
			}]
		});

		cy.cxtmenu({
			selector: 'edge',
			commands: [{
				content: 'Delete',
				select: function(ele) {
					// 
				},
				enabled: true
			}]
		});

		cy.cxtmenu({
			selector: 'core',
			commands: [{
				content: 'Unslect all',
				select: function() {
					_this.onSelectItem(undefined, 0);
				},
				enabled: true
			}, {
				content: 'Create new',
				select: function() {
					// 
				},
				enabled: true
			}, {
				content: 'Create new type',
				select: function() {
					// 
				},
				enabled: true
			}, {
				content: 'Create new instance',
				select: function() {
					// 
				},
				enabled: true
			}]
		});

		/*
		 * 
		 */

		// var eh = 
		cy.edgehandles({
			snap: true,
			complete: function(
				sourceNode, 
				targetNode, 
				addedEles) {
				_this.onContextCommand('node', 'link', targetNode.id(), [sourceNode.id()]);
			}
		});

		/*
		 * 
		 */

		if (global) {
			window[global] = cy;
		}

		this.updateCytoscape(null, this.props);
	}

	updateCytoscape(prevProps, newProps) {
		super.updateCytoscape(prevProps, newProps);
		if( newProps && newProps.layout ) {

			var exploded = newProps.exploded;
			var highlighted = newProps.highlighted;
			var selected = newProps.selected;
			var pulsed = newProps.pulsed;
			var zoomFit = newProps.zoomFit;
			var runLayout = newProps.runLayout;

			if( !runLayout ) {
				zoomFit = false;
			}

			if( exploded ) {
				var id = exploded;
				exploded = this._cy.$("#" + String(id));
			}

			if( highlighted ) {
				var id = highlighted;
				highlighted = this._cy.$("#" + String(id));
			}

			if( selected ) {
				var id = selected;
				selected = this._cy.$("#" + String(id));
			}

			if( exploded ) {
				if( !this.layoutInProgress ) {
					// if( runLayout ) {
					this.explode(exploded, runLayout, zoomFit);
					// }
				}

			} else if( highlighted ) {
				if( !this.layoutInProgress ) {
					// if( runLayout ) {
					this.unexplode(runLayout, zoomFit);
					// }
				}
				if( !this.layoutInProgress ) {
					// if( runLayout ) {
					this.highlight(highlighted, runLayout, zoomFit);
					// }
				}

			} else {
				if( (this.exploded) && (!this.layoutInProgress) ) {
					// if( runLayout ) {
					this.unexplode(runLayout, zoomFit);
					// }
				}
				if( (this.highlighted) && (!this.layoutInProgress) ) {
					// if( runLayout ) {
					this.unhighlight(runLayout, zoomFit);
					// }
				}

				// var mainlayout = newProps.layout;
				var mainlayout = newProps.mainLayout;
				if( mainlayout ) {
					// if( !runLayout ) {
					// 	mainlayout.fit = false;
					// } else 
					if( zoomFit ) {
						mainlayout.fit = true;
					} else {
						mainlayout.fit = false;
					}
					// if( runLayout ) {
					var layout = this._cy.makeLayout(mainlayout);
					if( layout ) {
						/*
						 * I believe I have to run this once in a while to unblock
						 * blocked animation. I cannot think of a better place than here,
						 * it will be faily often and we are redrawing here anyway so noone
						 * will notice or care if their precious pulsing node gets stopped.
						 */
						this._cy.stop();
						this._cy.clearQueue();
						this.pulsing = {}
						layout.run();
					}
					// }
				}

				const cy = this._cy;

				if( selected ) {
					const node = selected;
					const allEles = cy.elements();
					const nhood = node.closedNeighborhood();
					const others = allEles.not( nhood );
					cy.batch(() => {
						nhood.removeClass('hidden').removeClass('faded');
						others.removeClass('hidden').addClass('faded');
					});
				} else {
					const allEles = cy.elements();
					cy.batch(function() {
						allEles.removeClass('hidden').removeClass('faded').removeClass('highlighted');
					});
				}

			}

			// // if( (!runLayout) && (pulsed) ) {
			// if( pulsed ) {
			// 
			// 	try {
			// 
			// 		var id = pulsed;
			// 		pulsed = this._cy.$("#" + String(id));
			// 
			// 		var node = pulsed; // e.target;
			// 		var a = node.animation({
			// 			css: {
			// 				height: 100,
			// 				width: 320
			// 			},
			// 			duration: 400,
			// 			queue: true
			// 		});
			// 		// increase node size
			// 		a.play().promise("complete").then(function() {
			// 			// revert size increase
			// 			a.reverse().play();
			// 		});
			// 
			// 	} catch(e) {
			// 		console.log(e);
			// 	}
			// 
			// }

		}

	}

	/*
	 *
	 */

	isHighlighted() {
		return this.props.highlighted != null;
	}

	highlight(node, run, fit) {

		const cy = this._cy;

		if( (this.highlighted) && (node) && 
			(this.highlighted.id() == node.id() ) ) {
			return Promise.resolve();
		}

		if( this.layoutInProgress ) {
			return Promise.resolve();
		}

		this.layoutInProgress = true;
		this.highlighted = node;

		const allEles = cy.elements();
		// const nhood = this.lastHighlighted = node.closedNeighborhood();
		// const others = this.lastUnhighlighted = allEles.not( nhood );
		const nhood = node.closedNeighborhood();
		const others = allEles.not( nhood );

		const showOverview = () => {

			cy.batch(() => {
				if( allEles ) {
					allEles.removeClass('faded highlighted hidden');
				}
				if( nhood ) {
					nhood.addClass('highlighted');
				}
				if( others ) {
					others.addClass('hidden');
					others.positions(getOrgPos);
				}
			});

			var highlightlayout = this.props.highlightLayout;
			// if( !run ) {
			// 	highlightlayout.fit = false;
			// } else 
			if( fit ) {
				highlightlayout.fit = true;
			} else {
				highlightlayout.fit = false;
			}
			const layout = nhood.layout(highlightlayout);
			layout.run();

			return layout.promiseOn('layoutstop');
		};

		const showOthersFaded = () => {
			cy.batch(() => {
				others.removeClass('hidden').addClass('faded');
			});
		};

		return (
			Promise.resolve()
			.then( showOverview )
			.then( () => delayPromise(animationDuration) )
			// .then( runLayout )
			.then( showOthersFaded )
			.then( () => {
				this.layoutInProgress = false;
			})
		);
	}

	unhighlight(run, fit) {

		var _this = this;

		const cy = this._cy;

		// if( !this.isHighlighted() ) { return Promise.resolve(); }

		const allEles = cy.elements();
		const allNodes = cy.nodes();

		cy.stop();
		allNodes.stop();

		this.layoutInProgress = false;
		this.highlighted = null;

		// const nhood = this.lastHighlighted;
		// const others = this.lastUnhighlighted;

		// this.lastHighlighted = this.lastUnhighlighted = null;

		// const hideOthers = function() {
		// 	if( others ) {
		// 		others.addClass('hidden');
		// 	}
		// 
		// 	return Promise.resolve();
		// };

		const resetClasses = function() {
			cy.batch(function() {
				allEles.removeClass('hidden').removeClass('faded').removeClass('highlighted');
			});
			return Promise.resolve();
		};

		return (
			Promise.resolve()
			// .then( hideOthers )
			// .then( restorePositions )
			.then( resetClasses )
			.then( () => delayPromise(animationDuration) )
		);
	}

	/*
	 *
	 */

	isExploded() {
		return this.props.exploded != null;
	}

	explode(node, run, fit) {

		const cy = this._cy;

		if( (this.exploded) && (node) && 
			(this.exploded.id() == node.id() ) ) {
			return Promise.resolve();
		}

		if( this.layoutInProgress ) {
			return Promise.resolve();
		}

		this.layoutInProgress = true;
		this.exploded = node;

		const allEles = cy.elements();
		const nhood = this.lastExploded = node.closedNeighborhood();
		const others = this.lastUnexploded = allEles.not( nhood );
		// const nhood = node.closedNeighborhood();
		// const others = allEles.not( nhood );

		const runLayout = () => {
			const p = getOrgPos(node);

			cy.batch(() => {
				if( allEles ) {
					allEles.removeClass('faded exploded hidden');
				}
				if( nhood ) {
					nhood.addClass('exploded');
				}
				if( others ) {
					others.addClass('hidden');
					others.positions(getOrgPos);
				}
			});

			var zoomlayout = this.props.zoomLayout;
			// if( !run ) {
			// 	zoomlayout.fit = false;
			// } else 
			if( fit ) {
				zoomlayout.fit = true;
			} else {
				zoomlayout.fit = false;
			}
			zoomlayout.concentric = function( ele ) {
				if( ele.same( node ) ) {
					return 2;
				} else {
					return 1;
				}
			};

			const layout = nhood.layout(zoomlayout);

			const promise = layout.promiseOn('layoutstop');

			layout.run();

			return promise;
		};

		const showOthersFaded = () => {
			cy.batch(() => {
				if( others ) {
					others.removeClass('hidden').addClass('faded');
				}
			});
		};

		return (
			Promise.resolve()
			// .then( showOverview )
			// .then( () => delayPromise(animationDuration) )
			.then( runLayout )
			// .then( showOthersFaded )
			.then( () => {
				this.layoutInProgress = false;
			})
		);
	}

	unexplode(run, fit) {

		const cy = this._cy;

		// if( !this.isExploded() ) { return Promise.resolve(); }

		const allEles = cy.elements();
		const allNodes = cy.nodes();

		cy.stop();
		allNodes.stop();

		this.layoutInProgress = false;
		this.exploded = null;

		const nhood = this.lastExploded;
		const others = this.lastUnexploded;

		this.lastExploded = this.lastUnexploded = null;

		// const others = allNodes;

		const resetClasses = function() {
			cy.batch(function() {
				if( allEles ) {
					allEles.removeClass('exploded');
				}
			});

			return Promise.resolve();
		};
		
		const animateToOrgPos = function( nhood ) {
			return Promise.all( nhood.nodes().map(n => {
				return n.animation({
					position: getOrgPos(n),
					duration: animationDuration,
					easing: easing
				}).play().promise();
			}) );
		};

		const restorePositions = () => {
			cy.batch(() => {
				if( others ) {
					others.nodes().positions(getOrgPos);
				}
			});

			if( others ) {
				// return animateToOrgPos( nhood.nodes() );
				return animateToOrgPos( others );
			} else {
				return Promise.resolve();
			}
		};

		return (
			Promise.resolve()
			.then( resetClasses )
			.then( restorePositions )
		);
	}

	pulse(pulsed, run, fit) {

		var _this = this;

		// if( (!runLayout) && (pulsed) ) {
		if( pulsed ) {

			if( this.pulsing[pulsed] == true ) {
				return;
			}
			this.pulsing[pulsed] = true;

			try {

				// this._cy.stop();
				// this._cy.clearQueue();

				var id = pulsed;
				pulsed = this._cy.$("#" + String(id));

				var node = pulsed; // e.target;
				var a = node.animation({
					css: {
						height: 100,
						width: 320
					},
					duration: 200,
					queue: true
				});
				// increase node size
				a.play().promise("complete").then(function() {
					// revert size increase
					a.reverse().play().promise("complete").then(function() {
						_this.pulsing[id] = false;
					});
				});

			} catch(e) {
				console.log(e);
			}

		}

	}

}

export default CustomCytoscapeComponent;
