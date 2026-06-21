
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'

import ListView from './List'
import {
	Link,
} from "react-router-dom";

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

	// getListCols(account, namespace, typename, type, schema) {
	// 	var cols = [];
	// 	return cols;
	// }

	// getActions(account, namespace, typename, type, schema) {
	// 
	// 	const {
	// 		editable
	// 	} = this.props;
    // 
	// 	if( editable ) {
	// 		return [
	// 			// {
	// 			// 	icon: 'save',
	// 			// 	tooltip: 'Save', // + ' ' + typename,
	// 			// 	onClick: (event, rowData) => window.alert("You saved " + rowData["name"])
	// 			// }, 
	// 			{
	// 				icon: 'delete',
	// 				tooltip: 'Delete', // + ' ' + typename,
	// 				onClick: (event, rowData) => window.confirm("Are you sure you want to delete" + " " + typename + " " + rowData["name"] + "?")
	// 			}, 
	// 			// {
	// 			// 	icon: 'add',
	// 			// 	tooltip: 'Add User',
	// 			// 	isFreeAction: true,
	// 			// 	onClick: (event) => window.alert("Please fill out row")
	// 			// }
	// 			]
	// 	} else {
	// 		return []
	// 	}
	// 
	// }

	// getEditable(account, namespace, typename, type, schema) {
	// 
	// 	const {
	// 		editable
	// 	} = this.props;
	// 
	// 	if( editable ) {
	// 		return {
	// 			onRowAdd: newData => window.alert(""),
	// 			onRowUpdate: (newData, oldData) => window.alert(""),
	// 		}
	// 	} else {
	// 		return {}
	// 	}
	// 
	// }

	makeInstanceLink(account, namespace, type, id) {
		return "/namespaces/" + namespace + "/" + type + "/" + id;
	}

	makeRelInstanceLink(account, namespace, type, id, relname) {
		return "/namespaces/" + namespace + "/" + type + "/" + id + "/" + relname;
	}

	onRowClick(event, rowData, togglePanel) {
	}

	render() {

		const {
			account, 
			namespace, 
			title, 
            description, 
			typename, 
			type, 
			schema, 
			dataurl, 
			columns, 
			actions, 
			editable
		} = this.props;

		return (
			<>
				<ListView 
					title={title} 
					description={description} 
					tableRef={this.tableRef}
					dataurl={dataurl}
					// cols={this.getListCols(
					//  account, 
					// 	namespace, 
					// 	typename, 
					// 	type, 
					// 	schema
					// )}
					cols={columns}
					// actions={this.getActions(
					//  account, 
					// 	namespace, 
					// 	typename, 
					// 	type, 
					// 	schema
					// )}
					actions={actions}
					// editable={this.getEditable(
					//  account, 
					// 	namespace, 
					// 	typename, 
					// 	type, 
					// 	schema
					// )}
					editable={editable}
					detailLink={(rowData) => this.makeInstanceLink(account, namespace, rowData["label"], rowData["id"])} />
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
		dataurl, 
		columns, 
		actions, 
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
		dataurl: dataurl, 
		columns: columns, 
		actions: actions, 
		editable: editable
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Instances));
export default connect(mapStateToProps, mapDispatchToProps)(Instances);
