
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';

import { useNavigate} from "react-router-dom";

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
// import { createBrowserHistory } from 'history';
import { useHistory } from "react-router-dom";

// import { Router, Switch, Route, Link } from "react-router-dom";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MuiLink from '@material-ui/core/Link';
// import { Link } from '@material-ui/core';
// import {
// 	Link,
// } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import AddIcon from '@material-ui/icons/Add';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import InstancesView from './Instances'
// import ListView from './List'

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

	mainContainer: {
		padding: 0, 
		margin: 0, 
	},

	mainPaper: {
		width: '100%', 
		marginTop: '20px', 
		marginBottom: '0px', 
	},

	speedDial: {
		position: 'fixed',
		right: 10,
		bottom: 10
	},

});

// function TreeViewItems(props) {
// 	const history = useHistory();
// 	var items = props.items;
// 	var onSelectFn = props.onSelect;
// 	return (
// 		<>
// 		{Object.keys(items).map((key, index) => ( 
// 			<TreeItem 
// 				key={ key }
// 				nodeId={ "" + items[key]["_id"] }
// 				label={ "" + items[key]["_label"] }
// 				onClick={event => {
// 					event.stopPropagation();
// 					event.preventDefault();
// 					if( items[key]["instance"] ) {
// 						onSelectFn(items[key]["instance"]);
// 					}
// 					if( items[key]["link"] ) {
// 						history.push(items[key]["link"]);
// 					}
// 				}}>
// 				{items[key]["tree"] && 
// 				Object.keys(items[key]["tree"]).length > 0 &&
// 					<TreeViewItems 
// 						onSelect={onSelectFn} 
// 						items={items[key]["tree"]}
// 					/>
// 				}
// 			</TreeItem>
// 		))}
// 		</>
// 	)
// }

function handleClick(event) {
	// event.preventDefault();
}

export const BackNavButton = () => {
    let history = useHistory();
    return (
        <>
			{/* <button onClick={() => history.goBack()}>Back</button> */}
			<Button
				startIcon={<ArrowBackIcon />} 
				onClick={() => history.goBack()}>
				Back
			</Button>
        </>
    );
};

export const ForwardNavButton = () => {
    let history = useHistory();
    return (
		<>
			{/* <button onClick={() => history.goForward()}>Forward</button> */}
			<Button
				endIcon={<ArrowForwardIcon />} 
				onClick={() => history.goForward()}>
					Forward
			</Button>
        </>
    );
};

class RootInstances extends Component {

	constructor(props) {
		super(props);
		this.state = {
			createInstanceDialogOpen: false
		}

		var _this = this;

		this.createInstanceDialogElement = React.createRef();

		this.onCloseCreateInstanceDialog = this.onCloseCreateInstanceDialog.bind(this);

		this.createInstance = this.createInstance.bind(this);
		this.deleteInstance = this.deleteInstance.bind(this);

	}

	state = {
		createInstanceDialogOpen: false
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace, 
			typename, 
			type, 
			// , 
			// , 
			// , 
			// , 
			// instances, 
			// ainstances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		// if( (!this.props.instances["loading"]) && 
		// 	(!this.props.instances["loaded"]) && 
		// 	(!this.props.instances["failed"]) ) {
		// 	if( api && namespace && typename ) {
		// 		this.props.loadInstances(api, namespace, typename);
		// 	}
		// }

		if( (!this.props.type["loading"]) && 
			(!this.props.type["loaded"]) && 
			(!this.props.type["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadType(api, namespace, typename);
			}
			// }
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadSchema(api, namespace, typename);
			}
			// }
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			type, 
			// , 
			// , 
			// , 
			// , 
			// instances, 
			// ainstances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		// if( (!this.props.instances["loading"]) && 
		// 	(!this.props.instances["loaded"]) && 
		// 	(!this.props.instances["failed"]) ) {
		// 	this.props.loadInstances(api, namespace, typename);
		// }

		if( (!this.props.type["loading"]) && 
			(!this.props.type["loaded"]) && 
			(!this.props.type["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadType(api, namespace, typename);
			}
			// }
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			this.props.loadSchema(api, namespace, typename);
			// }
		}

	}

	/*
	 * 
	 */

	createInstance(type, data) {
		const {api} = this.props;
		this.props.createInstance(api, type, data);
		this.createInstanceDialogElement.current.closeDialog();
	}

	deleteInstance() {
	}

	onCloseCreateInstanceDialog() {
		this.setState({
			createInstanceDialogOpen: false
		});
	}

	// getListCols(namespace, typename, type, schema, instances, ainstances) {
	getListCols(namespace, typename, type, schema) {

		var cols = [];
		cols.push({
			title: "_name",
			field: "_name",
			// render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</a>
			render: rowData => <Link to={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</Link>
		});
		cols.push({
			title: "_id",
			field: "_id",
			editable: 'never',
			// render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_id"]}</a>
			render: rowData => <Link to={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_id"]}</Link>
		});
		// cols.push({
		// 	title: "link",
		// 	field: "link",
		// 	render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</a>
		// });
		cols.push({
			title: "_uuid",
			field: "_uuid"
		});
		cols.push({
			title: "_created",
			field: "_created",
			type: 'numeric'
		});
		cols.push({
			title: "_modified",
			field: "_modified",
			type: 'numeric'
		});

		if( type ) {
			if( type["properties"] ) {
				for( var property in type["properties"] ) {
					if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(property) ) {
						cols.push({
							title: property,
							field: property
						});
					}
				}
			}
		}

		return cols;
	}

	// getListRows(namespace, typename, type, schema, instances, ainstances) {
	// 
	// 	var cols = [];
	// 	cols.push({
	// 		title: "_name",
	// 		field: "_name",
	// 		render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</a>
	// 	});
	// 	cols.push({
	// 		title: "_id",
	// 		field: "_id",
	// 		render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_id"]}</a>
	// 	});
	// 	// cols.push({
	// 	// 	title: "link",
	// 	// 	field: "link",
	// 	// 	render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</a>
	// 	// });
	// 	// cols.push({
	// 	// 	title: "_uuid",
	// 	// 	field: "_uuid"
	// 	// });
	// 	// cols.push({
	// 	// 	title: "_created",
	// 	// 	field: "_created"
	// 	// });
	// 	// cols.push({
	// 	// 	title: "_modified",
	// 	// 	field: "_modified"
	// 	// });
	// 
	// 	if( type ) {
	// 		if( type["properties"] ) {
	// 			for( var property in type["properties"] ) {
	// 				if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(property) ) {
	// 					cols.push({
	// 						title: property,
	// 						field: property
	// 					});
	// 				}
	// 			}
	// 		}
	// 	}
	// 
	// 	var rows = [];
	// 	if( instances ) {
	// 		for( var instanceid in instances ) {
	// 			var instance = instances[instanceid];
	// 			if( instance ) {
	// 				rows.push(instance);
	// 			}
	// 		}
	// 	}
	// 
	// 	return rows;
	// }

	/*
	 * 
	 */

	// getTreeData() {
	// 
	// 	const {
	// 		api, 
	// 		namespace, 
	// 		typename, 
	// 		type, 
	// 		// , 
	// 		// , 
	// 		// , 
	// 		// , 
	// 		instances, 
	// 		ainstances, 
	// 		// , 
	// 		// , 
	// 		// , 
	// 		// , 
	// 		schema
	// 	} = this.props;
	// 
	// 	var treestruc = {
	// 	};
	// 
	// 	treestruc[typename] = {
	// 		id: typename, 
	// 		name: typename, 
	// 		label: typename, 
	// 		tree: {
	// 		}
	// 	}
	// 
	// 	if( instances && instances["entities"] ) {
	// 		for( var cinstanceid in instances["entities"] ) {
	// 			var instance = instances["entities"][cinstanceid];
	// 			if( instance ) {
	// 
	// 				// if( !(instance["_label"] in treestruc) ) {
	// 				// 	treestruc[instance["_label"]] = {
	// 				// 		id: instance["_label"], 
	// 				// 		name: instance["_label"], 
	// 				// 		label: instance["_label"], 
	// 				// 		tree: {
	// 				// 		}
	// 				// 	};
	// 				// }
	// 
	// 				// treestruc[instance["_label"]]["tree"][instance["_name"]] = {
	// 				treestruc[instance["_label"]]["tree"][instance["_id"]] = {
	// 					id: instance["_id"], 
	// 					name: instance["_name"], 
	// 					label: instance["_name"], // + "." + instance["_label"], 
	// 					link: this.makeInstanceLink(namespace, instance), 
	// 					instance: this.makeInstance(instance), 
	// 					tree: {
	// 					}
	// 				};
	// 
	// 			}
	// 		}
	// 	}
	// 
	// 	return treestruc;
	// }

	makeCreateInstanceLink(namespace, type) {
		return "/namespaces/" + namespace + "/create/" + type;
	}

	makeInstanceLink(namespace, type, id) {
		return "/namespaces/" + namespace + "/" + type + "/" + id;
	}

	makeRelInstanceLink(namespace, type, id, relname) {
		return "/namespaces/" + namespace + "/" + type + "/" + id + "/" + relname;
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
			type, 
			// , 
			// , 
			// , 
			// , 
			// instances, 
			// ainstances, 
			// , 
			// , 
			// , 
			// , 
			schema
		} = this.props;

		const { classes } = this.props;

		// var treestruc = this.getTreeData(instances["entities"]);

		var backdropOpen = false;

		// var cols = [];
		// cols.push({
		// 	title: "_id",
		// 	field: "_id"
		// });
		// cols.push({
		// 	title: "_uuid",
		// 	field: "_uuid"
		// });
		// cols.push({
		// 	title: "_name",
		// 	field: "_name"
		// });
		// // cols.push({
		// // 	title: "_created",
		// // 	field: "_created"
		// // });
		// // cols.push({
		// // 	title: "_modified",
		// // 	field: "_modified"
		// // });

		// if( type ) {
		// 	if( type["properties"] ) {
		// 		for( var property in type["properties"] ) {
		// 			if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(property) ) {
		// 				cols.push({
		// 					title: property,
		// 					field: property
		// 				});
		// 			}
		// 		}
		// 	}
		// }

		// var rows = [];
		// if( instances ) {
		// 	for( var instanceid in instances ) {
		// 		var instance = instances[instanceid];
		// 		if( instance ) {
		// 			rows.push(instance);
		// 		}
		// 	}
		// }

		var hidden = false;
		var open = true;
		var direction = "up";

		var actions = [
			{
				name: "Create new " + typename, 
				link: this.makeCreateInstanceLink(namespace, typename), 
				icon: <AddIcon />, 
			},
		];

		return (
			<>
			<Container 
				className={classes.mainContainer} 
				// className="mainContainer" 
				// maxWidth="false"
				>	
			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>
			<Breadcrumbs aria-label="breadcrumb">
				<BackNavButton></BackNavButton>
				<Link color="inherit" to="/namespaces">
					Namespaces
				</Link>
				<Link color="inherit" to={"/namespaces/" + namespace}>
					{namespace}
				</Link>
				<Typography color="textPrimary">{typename}</Typography>
				<ForwardNavButton></ForwardNavButton>
			</Breadcrumbs>
			<Grid 
				// className={} 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>
				{/* <Grid 
					className={classes.treeGrid} 
					// className="treeGrid" 
					item 
					xs={3} 
					spacing={0} 
				> */}
					{/* <TreeView
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
					</TreeView> */}
					{/* <List component="nav" className={classes.root} aria-label="Entities">
						{ instances && instances["entities"] && Object.entries(instances["entities"]).map(([entityid, entity]) => (
						<ListItem 
							button 
							selected={false} 
							component={Link} 
							to={this.makeInstanceLink(namespace, entity)} 
							// onClick={onItemClick(title)}
							>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText>{entity["_name"]}</ListItemText>
						</ListItem>
						))}
					</List> */}
				{/* </Grid> */}
				<Grid 
					// className={classes.leftGrid} 
					className="leftGrid" 
					container 
					item 
					xs={12} 
					spacing={0} 
				>
					<InstancesView 
						title={typename} 
						description={typename} 
						namespace={namespace} 
						typename={typename} 
						type={type["entity"]} 
						schema={schema["entity"]} 
						// instances={instances["entities"]} 
						// ainstances={ainstances} 
						editable={true}/>
				</Grid>
			</Grid>

			<SpeedDial
				ariaLabel="GraphActions"
				className={classes.speedDial}
				hidden={hidden}
				icon={<SpeedDialIcon/>}
				onClose={this.onCloseDial}
				onOpen={this.onOpenDial}
				open={open}
				direction={direction}>
				{actions.map(action => (
					<SpeedDialAction
						key={action.name}
						icon=<Link to={action.link}>{action.icon}</Link>
						tooltipTitle={action.name}
						onClick={this.onCloseDial}/>
				))}
			</SpeedDial>

			</Container>
			</>
		);
	}

}

// RootInstances.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		// loadInstances: (api, namespace, typename) => dispatch(loadEntitiesIntoState(api, namespace, typename)),

		loadType: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "type", typename)),

		loadSchema: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "schema", typename))

	}
}

function mapStateToProps(state, ownProps) {

	const {
		namespace, 
		typename, 
		// instanceid
	} = ownProps;

	const {
		api, 
		// namespace
	} = state;

	// const {
	// 	loading: , 
	// 	loaded: , 
	// 	failed: , 
	// 	timestamp: , 
	// 	entities: instances
	// } = getEntitiesFromState(state, api, namespace, typename);
	// const instances = getEntitiesFromState(state, api, namespace, typename);
	// console.log(instances);

	// const {
	// 	loading: , 
	// 	loaded: , 
	// 	failed: , 
	// 	timestamp: , 
	// 	entity: schema
	// } = getEntityFromState(state, api, namespace, "schema", typename);
	const type = getEntityFromState(state, api, namespace, "type", typename);
	console.log(type);

	// const {
	// 	loading: , 
	// 	loaded: , 
	// 	failed: , 
	// 	timestamp: , 
	// 	entity: schema
	// } = getEntityFromState(state, api, namespace, "schema", typename);
	const schema = getEntityFromState(state, api, namespace, "schema", typename);
	console.log(schema);

	// console.log( " SCHEMA >> " );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log( schema );
	// console.log( " << SCHEMA " );

	/*
	 * 
	 */
	// var ainstances = {};
	// ainstances[typename] = instances;

	return {
		api, 
		namespace: namespace, 
		typename: typename, 
		type: type, 
		// : , 
		// : , 
		// : , 
		// : , 
		// instances: instances, 
		// ainstances: ainstances, 
		// : , 
		// : , 
		// : , 
		// : , 
		schema: schema
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(RootInstances);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootInstances));
