
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

	// getListCols(namespace, typename, type, schema) {
	// 	var cols = [];
	// 	return cols;
	// }

	// getActions(namespace, typename, type, schema) {
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
	// 			// 	onClick: (event, rowData) => window.alert("You saved " + rowData["_name"])
	// 			// }, 
	// 			{
	// 				icon: 'delete',
	// 				tooltip: 'Delete', // + ' ' + typename,
	// 				onClick: (event, rowData) => window.confirm("Are you sure you want to delete" + " " + typename + " " + rowData["_name"] + "?")
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

	// getEditable(namespace, typename, type, schema) {
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
			dataurl, 
			columns, 
			actions, 
			editable
		} = this.props;

		const { classes } = this.props;

		return (
			<>
				<ListView 
					title={title} 
					description={description} 
					tableRef={this.tableRef}
					dataurl={dataurl}
					// cols={this.getListCols(
					// 	namespace, 
					// 	typename, 
					// 	type, 
					// 	schema
					// )}
					cols={columns}
					// actions={this.getActions(
					// 	namespace, 
					// 	typename, 
					// 	type, 
					// 	schema
					// )}
					actions={actions}
					// editable={this.getEditable(
					// 	namespace, 
					// 	typename, 
					// 	type, 
					// 	schema
					// )}
					editable={editable}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Instances));
