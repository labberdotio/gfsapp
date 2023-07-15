
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
// import { useHistory } from "react-router-dom";

// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';

// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import AddIcon from '@material-ui/icons/Add';

// import MaterialTable from 'material-table';

// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

// import SpeedDial from '@material-ui/lab/SpeedDial';
// import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
// import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

// import InstancesView from './Instances'
import ListView from './List'
// import { Link } from '@material-ui/core';
import {
	Link,
} from "react-router-dom";

import history from '../history'

// import { 
// 	loadEntitiesIntoState, 
// 	invalidateEntitiesInState, 
// 	refreshEntityInState 
// } from '../actions/Entity'

// import { 
// 	getEntitiesFromState 
// } from '../stores/Entity'

// const history = createBrowserHistory();
// const history = useHistory();
// 
// const queryString = require('query-string');

const styles = theme => ({

	mainPaper: {
		width: '100%', 
		marginTop: '20px', 
		marginBottom: '0px', 
	},

});

// const history = useHistory();
// const history = createBrowserHistory();
// const history = createBrowserHistory({forceRefresh:true});


// export const test = () => {
//     let history = useHistory();
//     navigate('/dashboard');
// };

class Instances extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}

		var _this = this;

	}

	state = {
		
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			// api, 
			// namespace, 
			title, 
            description, 
			typename, 
			type, 
			schema, 
			// isloading, 
			// isloaded, 
			// isfailed, 
			// istimestamp, 
			// instances, 
			// ainstances
		} = this.props;

		// if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
		// 	if( api && namespace && typename ) {
		// 		this.props.loadInstances(api, namespace, typename);
		// 	}
		// }

	}

	componentDidMount() {

		const {
			// api, 
			// namespace, 
			title, 
            description, 
			typename, 
			type, 
			schema, 
			// isloading, 
			// isloaded, 
			// isfailed, 
			// istimestamp, 
			// instances, 
			// ainstances
		} = this.props;

		// if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
		// 	if( api && namespace && typename ) {
		// 		this.props.loadInstances(api, namespace, typename);
		// 	}
		// }

	}

	/*
	 * 
	 */

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

		// if( type ) {
		// 	if( type["properties"] ) {
		if( schema ) {
			if( schema["properties"] ) {
				for( var propertyname in schema["properties"] ) {
					var property = schema["properties"][propertyname];
					if( property["$ref"] ) {
						// 
					} else if( (property["type"] == "array") && 
							   (property["items"]) ) {
						// 
					} else {
						if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(propertyname) ) {

							if( property["type"] == "integer" ) {
								cols.push({
									title: propertyname,
									field: propertyname,
									type: 'numeric'
								});
							} else {
								cols.push({
									title: propertyname,
									field: propertyname
								});
							}

						}
					}
				}
			}
		}

		return cols;
	}

	// getListRows(namespace, typename, type, schema, instances, ainstances) {
	// 
	// 	// var cols = [];
	// 	// cols.push({
	// 	// 	title: "_id",
	// 	// 	field: "_id",
	// 	// 	render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_id"]}</a>
	// 	// });
	// 	// // cols.push({
	// 	// // 	title: "link",
	// 	// // 	field: "link",
	// 	// // 	render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</a>
	// 	// // });
	// 	// cols.push({
	// 	// 	title: "_uuid",
	// 	// 	field: "_uuid"
	// 	// });
	// 	// cols.push({
	// 	// 	title: "_name",
	// 	// 	field: "_name",
	// 	// 	render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</a>
	// 	// });
	// 	// // cols.push({
	// 	// // 	title: "_created",
	// 	// // 	field: "_created"
	// 	// // });
	// 	// // cols.push({
	// 	// // 	title: "_modified",
	// 	// // 	field: "_modified"
	// 	// // });
	// 	// 
	// 	// if( type ) {
	// 	// 	if( type["properties"] ) {
	// 	// 		for( var property in type["properties"] ) {
	// 	// 			if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(property) ) {
	// 	// 				cols.push({
	// 	// 					title: property,
	// 	// 					field: property
	// 	// 				});
	// 	// 			}
	// 	// 		}
	// 	// 	}
	// 	// }
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

	getData(namespace, typename, type, schema) {
		
	}

	// getActions(namespace, typename, type, schema, instances, ainstances) {
	getActions(namespace, typename, type, schema) {

		const {
			editable
		} = this.props;

		if( editable ) {
			return [
				// {
				// 	icon: 'save',
				// 	tooltip: 'Save', // + ' ' + typename,
				// 	onClick: (event, rowData) => window.alert("You saved " + rowData["_name"])
				// }, 
				{
					icon: 'delete',
					tooltip: 'Delete', // + ' ' + typename,
					onClick: (event, rowData) => window.confirm("Are you sure you want to delete" + " " + typename + " " + rowData["_name"] + "?")
				}, 
				// {
				// 	icon: 'add',
				// 	tooltip: 'Add User',
				// 	isFreeAction: true,
				// 	onClick: (event) => window.alert("Please fill out row")
				// }
				]
		} else {
			return []
		}

	}

	// getEditable(namespace, typename, type, schema, instances, ainstances) {
	getEditable(namespace, typename, type, schema) {

		const {
			editable
		} = this.props;

		if( editable ) {
			return {
				onRowAdd: newData => window.alert(""),
				onRowUpdate: (newData, oldData) => window.alert(""),
			}
		} else {
			return {}
		}

	}

	/*
	 *
	 */

	makeInstanceLink(namespace, type, id) {
		return "/namespaces/" + namespace + "/" + type + "/" + id;
	}

	makeRelInstanceLink(namespace, type, id, relname) {
		return "/namespaces/" + namespace + "/" + type + "/" + id + "/" + relname;
	}

	onRowClick(event, rowData, togglePanel) {
		// 	
	}

	render() {

		const {
			api, 
			namespace, 
			title, 
            description, 
			typename, 
			type, 
			schema, 
			// isloading, 
			// isloaded, 
			// isfailed, 
			// istimestamp, 
			// instances, 
			// ainstances
		} = this.props;

		const { classes } = this.props;

		// var backdropOpen = false;

		var cols = [];
		cols.push({
			title: "_id",
			field: "_id"
		});
		cols.push({
			title: "_uuid",
			field: "_uuid"
		});
		cols.push({
			title: "_name",
			field: "_name"
		});
		// cols.push({
		// 	title: "_created",
		// 	field: "_created"
		// });
		// cols.push({
		// 	title: "_modified",
		// 	field: "_modified"
		// });

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

		// var rows = [];
		// if( instances ) {
		// 	for( var instanceid in instances ) {
		// 		var instance = instances[instanceid];
		// 		if( instance ) {
		// 			rows.push(instance);
		// 		}
		// 	}
		// }

		// const onRowClick = function(event, rowData, togglePanel) {
		// 	// window.location.href = "/namespaces/" + namespace + "/" + rowData["_label"] + "/" + rowData["_id"];
		// 	history.push("/namespaces/" + namespace + "/" + rowData["_label"] + "/" + rowData["_id"]);
		// 	// document.location.reload();
		// 	// history.go("/namespaces/" + namespace + "/" + rowData["_label"] + "/" + rowData["_id"]);
		// }

		return (
			<>
			{/* <Container 
				className={classes.listContainer} 
				// className="listContainer" 
				// maxWidth="false"
				> */}
			{/* <Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop> */}
			{/* <Grid 
				className={} 
				// className="" 
				container 
				xs={12} 
				spacing={0} 
			> */}
				<ListView 
					title={title} 
					description={description} 
					cols={this.getListCols(
						namespace, 
						typename, 
						type, 
						schema, 
						// instances, 
						// ainstances
					)}
					// rows={this.getListRows(
					// 	namespace, 
					// 	typename, 
					// 	type, 
					// 	schema, 
					// 	instances, 
					// 	ainstances
					// )}
					data={this.getData(
						namespace, 
						typename, 
						type, 
						schema
					)}
					actions={this.getActions(
						namespace, 
						typename, 
						type, 
						schema, 
						// instances, 
						// ainstances
					)}
					editable={this.getEditable(
						namespace, 
						typename, 
						type, 
						schema, 
						// instances, 
						// ainstances
					)}
					detailLink={(rowData) => this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} />
			{/* </Grid> */}
			{/* </Container> */}
			</>
		);
	}

}

// Instances.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		// loadInstances: (api, namespace, typename) => dispatch(loadEntitiesIntoState(api, namespace, typename))

	}
}

function mapStateToProps(state, ownProps) {

	// const { match } = ownProps;

	// const title = ownProps["title"];
    // const description = ownProps["description"];

	// // const typename = match["params"]["typename"];
	// const typename = ownProps["typename"];
	// const type = ownProps["type"];
	// const schema = ownProps["schema"];
	// const instances = ownProps["instances"];
	// const ainstances = ownProps["ainstances"];

	const {
		title, 
		description, 
		typename, 
		type, 
		schema, 
		// instances, 
		// ainstances, 
		editable
	} = ownProps;	

	const {
		// api, 
	} = state;

	// const {
	// 	loading: isloading, 
	// 	loaded: isloaded, 
	// 	failed: isfailed, 
	// 	timestamp: istimestamp, 
	// 	entities: instances
	// } = getEntitiesFromState(state, api, namespace, typename);

	return {
		// api, 
		// namespace: namespace, 
		title: title, 
        description: description, 
		typename: typename, 
		type: type, 
		schema: schema, 
		// isloading: isloading, 
		// isloaded: isloaded, 
		// isfailed: isfailed, 
		// istimestamp: istimestamp, 
		// instances: instances, 
		// ainstances: ainstances, 
		editable: editable
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(Instances);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Instances));
