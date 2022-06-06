
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
// import { createBrowserHistory } from 'history';
import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MaterialTable from 'material-table';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// import InstancesView from './Instances'
import InstanceView from './Instance'
// import DependentsView from './Dependents'

import { 
	loadEntityIntoState, 
	loadEntitiesIntoState
} from '../actions/Entity'

import { 
	getEntityFromState, 
	getEntitiesFromState 
} from '../stores/Entity'

// const history = createBrowserHistory();
// const history = useHistory();
// 
// const queryString = require('query-string');

const styles = theme => ({

	mainPaper: {
		width: '100%'
	},

});

function TreeViewItems(props) {
	const history = useHistory();
	var items = props.items;
	var onSelectFn = props.onSelect;
	return (
		<>
		{Object.keys(items).map((key, index) => ( 
			<TreeItem 
				key={ key }
				nodeId={ "" + items[key]["id"] }
				label={ "" + items[key]["label"] }
				onClick={event => {
					event.stopPropagation();
					event.preventDefault();
					if( items[key]["instance"] ) {
						onSelectFn(items[key]["instance"]);
					}
					if( items[key]["link"] ) {
						history.push(items[key]["link"]);
					}
				}}>
				{items[key]["tree"] && 
				Object.keys(items[key]["tree"]).length > 0 &&
					<TreeViewItems 
						onSelect={onSelectFn} 
						items={items[key]["tree"]}
					/>
				}
			</TreeItem>
		))}
		</>
	)
}

class RootInstance extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}

		var _this = this;

		this.wsClient = props.wsClient;
		this.wsClient.onMessage(
			function(data) {
				
			}
		);
	}

	state = {
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			type, 
			// , 
			// , 
			// , 
			// , 
			instances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		if( (!this.props.instances["loading"]) && 
			(!this.props.instances["loaded"]) && 
			(!this.props.instances["failed"]) ) {
			this.props.loadInstances(api, typename);
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			this.props.loadSchema(api, typename);
			// }
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			type, 
			// , 
			// , 
			// , 
			// , 
			instances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		if( (!this.props.instances["loading"]) && 
			(!this.props.instances["loaded"]) && 
			(!this.props.instances["failed"]) ) {
			this.props.loadInstances(api, typename);
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			this.props.loadSchema(api, typename);
			// }
		}

	}

	/*
	 * 
	 */

	getTreeData() {

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			type, 
			// , 
			// , 
			// , 
			// , 
			instances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		var treestruc = {
		};

		treestruc[typename] = {
			id: typename, 
			name: typename, 
			label: typename, 
			tree: {
			}
		}

		if( instances && instances["entities"] ) {
			for( var cinstanceid in instances["entities"] ) {
				var instance = instances["entities"][cinstanceid];
				if( instance ) {

					// if( !(instance["label"] in treestruc) ) {
					// 	treestruc[instance["label"]] = {
					// 		id: instance["label"], 
					// 		name: instance["label"], 
					// 		label: instance["label"], 
					// 		tree: {
					// 		}
					// 	};
					// }

					// treestruc[instance["label"]]["tree"][instance["name"]] = {
					treestruc[instance["label"]]["tree"][instance["id"]] = {
						id: instance["id"], 
						name: instance["name"], 
						label: instance["name"], // + "." + instance["label"], 
						link: this.makeInstanceLink(instance), 
						instance: this.makeInstance(instance), 
						tree: {
						}
					};

				}
			}
		}

		return treestruc;
	}

	makeInstanceLink(instance) {
		return "/detail/" + instance["label"] + "/" + instance["id"];
	}

	makeInstance(instance) {
		return instance;
	}

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			type, 
			// , 
			// , 
			// , 
			// , 
			instances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		const { classes } = this.props;

		var treestruc = this.getTreeData(instances["entities"]);

		var backdropOpen = false;

		var instance = undefined;
		if( instanceid ) {
			var cinstance = instances["entities"][instanceid];
			if( cinstance ) {
				instance = cinstance;
			}
		}

		return (
			<>
			<Container 
				className={classes.listContainer} 
				// className="listContainer" 
				// maxWidth="false"
				>
			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>
			<Grid 
				className={classes.fullGrid} 
				// className="fullGrid" 
				container 
				xs={12} 
				spacing={0} 
			>
				<Grid 
					className={classes.treeGrid} 
					// className="treeGrid" 
					item 
					xs={3} 
					spacing={0} 
				>
					<TreeView
						className={classes.tree} 
						// className="tree" 
						defaultCollapseIcon={<ExpandMoreIcon />}
						defaultExpandIcon={<ChevronRightIcon />}
						defaultExpanded={[typename]}
					>
						<TreeViewItems 
							onSelect={item => {
								// 
							}}
							items={treestruc}
						/>
					</TreeView>
				</Grid>
				<Grid 
					className={classes.mainGrid} 
					// className="mainGrid" 
					container 
					item 
					xs={9} 
					spacing={0} 
				>
					<InstanceView 
						typename={typename} 
						type={type} 
						schema={schema["entity"]} 
						instanceid={instanceid} 
						instance={instance} 
						wsClient={this.wsClient} />
				</Grid>
			</Grid>
			</Container>
			</>
		);
	}

}

// RootInstance.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		loadInstances: (api, typename) => dispatch(loadEntitiesIntoState(api, typename)), 

		loadSchema: (api, typename) => dispatch(loadEntityIntoState(api, "schema", typename))

	}
}

function mapStateToProps(state, ownProps) {

	const { match } = ownProps;

	const typename = match["params"]["typename"];
	const instanceid = match["params"]["instanceid"];
	const type = ownProps["type"];

	const {
		api, 
	} = state;

	// const {
	// 	loading: , 
	// 	loaded: , 
	// 	failed: , 
	// 	timestamp: , 
	// 	entities: instances
	// } = getEntitiesFromState(state, api, typename);
	const instances = getEntitiesFromState(state, api, typename);

	// const {
	// 	loading: , 
	// 	loaded: , 
	// 	failed: , 
	// 	timestamp: , 
	// 	entity: schema
	// } = getEntityFromState(state, api, "schema", typename);
	const schema = getEntityFromState(state, api, "schema", typename);

	// console.log( " SCHEMA >> " );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log( schema );
	// console.log( " << SCHEMA " );

	return {
		api, 
		namespace: api.namespace, 
		typename: typename, 
		instanceid: instanceid, 
		type: type, 
		// : , 
		// : , 
		// : , 
		// : , 
		instances: instances,
		// : , 
		// : , 
		// : , 
		// : , 
		schema: schema
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(RootInstance);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootInstance));
