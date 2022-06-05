
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

class Instance extends Component {

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
			isloading, 
			isloaded, 
			isfailed, 
			istimestamp, 
			instances, 
			ssloading, 
			ssloaded, 
			ssfailed, 
			sstimestamp, 
			schema
		} = this.props;

		if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
			this.props.loadInstances(api, typename);
		}

		if( (!this.props.ssloading) && (!this.props.ssloaded) && (!this.props.ssfailed) ) {
			if( typename ) {
				this.props.loadSchema(api, typename);
			}
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			type, 
			isloading, 
			isloaded, 
			isfailed, 
			istimestamp, 
			instances, 
			ssloading, 
			ssloaded, 
			ssfailed, 
			sstimestamp, 
			schema
		} = this.props;

		if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
			this.props.loadInstances(api, typename);
		}

		if( (!this.props.ssloading) && (!this.props.ssloaded) && (!this.props.ssfailed) ) {
			if( typename ) {
				this.props.loadSchema(api, typename);
			}
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
			isloading, 
			isloaded, 
			isfailed, 
			istimestamp, 
			instances, 
			ssloading, 
			ssloaded, 
			ssfailed, 
			sstimestamp, 
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

		if( instances ) {
			for( var cinstanceid in instances ) {
				var instance = instances[cinstanceid];
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
			isloading, 
			isloaded, 
			isfailed, 
			istimestamp, 
			instances, 
			ssloading, 
			ssloaded, 
			ssfailed, 
			sstimestamp, 
			schema
		} = this.props;

		const { classes } = this.props;

		var treestruc = this.getTreeData(instances);

		var backdropOpen = false;

		var instance = undefined;
		if( instanceid ) {
			var cinstance = instances[instanceid];
			if( cinstance ) {
				instance = cinstance;
			}
		}

		var properties = [];
		var dependencies = [];

		if( schema && schema["properties"] ) {
			for( var propertyname in schema["properties"] ) {
				var property = schema["properties"][propertyname];
				if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
					if( property && property["type"] ) {
						if( property["type"] == "string" ) {
							properties.push(propertyname);
						}
					}
				}
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

					<Paper>

					{/* {instanceid && instance &&
						<p><h1>{instanceid}</h1></p>
					} */}

					{instance && instance["name"] &&
						<h1>{instance["name"]}</h1>
					}

					{instance && instance["label"] &&
						<h2>{instance["label"]}</h2>
					}

					{instance && instance["id"] &&
						<p><label>ID: </label>{instance["id"]}</p>
					}

					{instance && instance["uuid"] &&
						<p><label>UUID: </label>{instance["uuid"]}</p>
					}

					{instance && instance["created"] &&
						<p><label>Created: </label>{instance["created"]}</p>
					}

					{instance && instance["modified"] &&
						<p><label>Modified: </label>{instance["modified"]}</p>
					}

					{/* { instance && Object.keys(instance).map((item, i) => (
						<h3>{item}: {instance[item]}</h3>
					))} */}

					{/* { schema && schema["properties"] && Object.keys(schema["properties"]).map((item, i) => (
						<h3>{item}</h3>
					))} */}

					{ properties && properties.map((item, i) => (
						<p><label>{item}: </label>{instance[item]}</p>
					))}

					</Paper>

				</Grid>
			</Grid>
			</Container>
			</>
		);
	}

}

// Instance.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		loadInstances: (api, typename) => dispatch(loadEntitiesIntoState(api, typename)), 

		loadSchema: (api, typename) => dispatch(loadEntityIntoState(api, "schema")) // , typename))

	}
}

function mapStateToProps(state, ownProps) {

	const { match } = ownProps;

	const typename = match["params"]["typename"];
	const instanceid = match["params"]["instanceid"];
	const type = ownProps["type"];

	console.log( " >> " + typename );
	console.log( " >> " + instanceid );

	const {
		api, 
	} = state;

	const {
		loading: isloading, 
		loaded: isloaded, 
		failed: isfailed, 
		timestamp: istimestamp, 
		entities: instances
	} = getEntitiesFromState(state, api, typename);

	const {
		loading: ssloading, 
		loaded: ssloaded, 
		failed: ssfailed, 
		timestamp: sstimestamp, 
		entity: schema
	} = getEntityFromState(state, api, "schema"); // , typename);

	console.log( " SCHEMA >> " );
	console.log( ssloading );
	console.log( ssloaded );
	console.log( ssfailed );
	console.log( sstimestamp );
	console.log( schema );
	console.log( " << SCHEMA " );

	return {
		api, 
		namespace: api.namespace, 
		typename: typename, 
		instanceid: instanceid, 
		type: type, 
		isloading: isloading, 
		isloaded: isloaded, 
		isfailed: isfailed, 
		istimestamp: istimestamp, 
		instances: instances,
		ssloading: ssloading, 
		ssloaded: ssloaded, 
		ssfailed: ssfailed, 
		sstimestamp: sstimestamp, 
		schema: schema
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(Instance);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Instance));
