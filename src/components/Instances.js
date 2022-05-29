
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

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MaterialTable from 'material-table';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { 
	loadEntitiesIntoState, 
	invalidateEntitiesInState, 
	refreshEntityInState 
} from '../actions/Entity'

import { 
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

class Instances extends Component {

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

		console.log(" >>> Instances View componentDidUpdate ");

		const {
			api, 
			namespace, 
			typename, 
			type, 
			isloading, 
			isloaded, 
			isfailed, 
			itimestamp, 
			instances
		} = this.props;

		if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
			this.props.loadInstances(api, typename);
		}

	}

	componentDidMount() {

		console.log(" >>> Instances View componentDidMount ");

		const {
			api, 
			namespace, 
			typename, 
			type, 
			isloading, 
			isloaded, 
			isfailed, 
			itimestamp, 
			instances
		} = this.props;

		if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
			this.props.loadInstances(api, typename);
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
			type, 
			isloading, 
			isloaded, 
			isfailed, 
			itimestamp, 
			instances
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
			for( var instanceid in instances ) {
				var instance = instances[instanceid];
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

		console.log(" >>> Instances View render ");

		const {
			api, 
			namespace, 
			typename, 
			type, 
			isloading, 
			isloaded, 
			isfailed, 
			itimestamp, 
			instances
		} = this.props;

		const { classes } = this.props;

		var treestruc = this.getTreeData(instances);

		var backdropOpen = false;

		var cols = [];
		cols.push({
			title: "id",
			field: "id"
		});
		cols.push({
			title: "uuid",
			field: "uuid"
		});
		cols.push({
			title: "name",
			field: "name"
		});
		// cols.push({
		// 	title: "created",
		// 	field: "created"
		// });
		// cols.push({
		// 	title: "modified",
		// 	field: "modified"
		// });

		if( type ) {
			if( type["properties"] ) {
				for( var property in type["properties"] ) {
					if( !["id", "uuid", "name", "created", "modified"].includes(property) ) {
						cols.push({
							title: property,
							field: property
						});
					}
				}
			}
		}

		var rows = [];
		if( instances ) {
			for( var instanceid in instances ) {
				var instance = instances[instanceid];
				if( instance ) {
					rows.push(instance);
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
					<MaterialTable
						title={typename}
						columns={cols}
						data={rows}
						options={{
							// pageSize: ...
							pageSizeOptions: [],
							toolbar: true,
							paging: false // true
						}}
						editable={{
						}}
						style={{
							width: "100%"
						}}/>
				</Grid>
			</Grid>
			</Container>
			</>
		);
	}

}

// Instances.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		loadInstances: (api, typename) => dispatch(loadEntitiesIntoState(api, typename))

	}
}

function mapStateToProps(state, ownProps) {

	console.log(" >>> Instances View mapStateToProps ");

	const { match } = ownProps;

	const typename = match["params"]["typename"];
	const type = ownProps["type"];

	const {
		api, 
	} = state;

	const {
		loading: isloading, 
		loaded: isloaded, 
		failed: isfailed, 
		timestamp: itimestamp, 
		entities: instances
	} = getEntitiesFromState(state, api, typename);

	return {
		api, 
		namespace: api.namespace, 
		typename: typename, 
		type: type, 
		isloading: isloading, 
		isloaded: isloaded, 
		isfailed: isfailed, 
		itimestamp: itimestamp, 
		instances: instances
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(Instances);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Instances));
