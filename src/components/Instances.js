
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';

import ListView from './List'
import {
	Link,
} from "react-router-dom";

const styles = theme => ({

	mainPaper: {
		width: '100%', 
		marginTop: '20px', 
		marginBottom: '0px', 
	},

});

class Instances extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}

		var _this = this;

		this.tableRef = React.createRef();

	}

	state = {
		
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
		} = this.props;

		this.tableRef.current && !this.tableRef.current.isLoading && this.tableRef.current.onQueryChange();

	}

	componentDidMount() {

		const {
		} = this.props;

		// this.tableRef.current && this.tableRef.current.onQueryChange();

	}

	/*
	 * 
	 */

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

	getDataURL(namespace, typename, type, schema) {
		// return "http://192.168.1.112:5000/api/v2.0/archives/Files";
		var dataurl = "http://192.168.1.112:5000/api/v2.0/" + namespace + "/" + typename;
		return dataurl;
	}

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

	makeInstanceLink(namespace, type, id) {
		return "/namespaces/" + namespace + "/" + type + "/" + id;
	}

	makeRelInstanceLink(namespace, type, id, relname) {
		return "/namespaces/" + namespace + "/" + type + "/" + id + "/" + relname;
	}

	onRowClick(event, rowData, togglePanel) {
	}

	render() {

		const {
			namespace, 
			title, 
            description, 
			typename, 
			type, 
			schema, 
		} = this.props;

		const { classes } = this.props;

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

		return (
			<>
				<ListView 
					title={title} 
					description={description} 
					tableRef={this.tableRef}
					cols={this.getListCols(
						namespace, 
						typename, 
						type, 
						schema
					)}
					dataurl={this.getDataURL(
						namespace, 
						typename, 
						type, 
						schema
					)}
					actions={this.getActions(
						namespace, 
						typename, 
						type, 
						schema
					)}
					editable={this.getEditable(
						namespace, 
						typename, 
						type, 
						schema
					)}
					detailLink={(rowData) => this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} />
			</>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {
	}
}

function mapStateToProps(state, ownProps) {

	const {
		title, 
		description, 
		typename, 
		type, 
		schema, 
		editable
	} = ownProps;	

	const {
	} = state;

	return {
		title: title, 
        description: description, 
		typename: typename, 
		type: type, 
		schema: schema, 
		editable: editable
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Instances));
