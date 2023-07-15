
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
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

import MaterialTable from 'material-table';

const styles = theme => ({

	mainPaper: {
		width: '100%', 
		marginTop: '20px', 
		marginBottom: '0px', 
	},

});

// class List extends Component {
// 
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			
// 		}
// 	}
// 
// 	state = {
// 		
// 	};
// 
// 	// componentWillUpdate(nextProps, nextState) {
// 	// }
// 
// 	componentDidUpdate(prevProps, prevState) {
// 
// 		const {
//             title, 
//             description, 
// 			cols, 
//             rows
// 		} = this.props;
// 
// 	}
// 
// 	componentDidMount() {
// 
// 		const {
//             title, 
//             description, 
// 			cols, 
//             rows
// 		} = this.props;
// 
// 	}
// 
// 	/*
// 	 *
// 	 */
// 
// 	render() {
// 
// 		const {
//             title, 
//             description, 
// 			cols, 
//            rows, 
// 		   actions, 
// 		   editable, 
// 		   onRowClick
// 		} = this.props;
// 
// 		const { classes } = this.props;
// 
// 		// cols.push({
// 		// 	field: 'link',
// 		// 	title: 'Link',
// 		// 	render: rowData => <img src={rowData.url} style={{width: 50, borderRadius: '50%'}}/>
// 		// })
// 
// 		return (
// 			<>
// 			{/* <Container
// 				className={classes.mainContainer} 
// 			> */}
// 			<Paper
// 				className={classes.mainPaper} 
// 			>
// 
// 				{/* <h1>{title}</h1> */}
// 				{/* <h2>{description}</h2> */}
// 
// 				<MaterialTable
// 					title={description}
// 					columns={cols}
// 					data={rows}
// 					// actions={[{
// 					// 	icon: 'save',
// 					// 	tooltip: 'Save User',
// 					// 	onClick: (event, rowData) => window.alert("You saved " + rowData.name)
// 					// }, {
// 					// 	icon: 'delete',
// 					// 	tooltip: 'Delete User',
// 					// 	onClick: (event, rowData) => window.confirm("You want to delete " + rowData.name)
// 					// }, {
// 					// 	icon: 'add',
// 					// 	tooltip: 'Add User',
// 					// 	isFreeAction: true,
// 					// 	onClick: (event) => window.alert("You want to add a new row")
// 					// }]}
// 					actions={actions}
// 					options={{
// 						// pageSize: ...
// 						pageSizeOptions: [],
// 						toolbar: true,
// 						paging: false, // true,
// 						actionsColumnIndex: -1
// 					}}
// 					// editable={{
// 					// }}
// 					// editable={{
// 					// 	onRowAdd: newData => window.alert(""),
// 					// 	onRowUpdate: (newData, oldData) => window.alert(""),
// 					// }}
// 					editable={editable}
// 					onRowClick={onRowClick}
// 					style={{
// 						width: "100%"
// 					}}/>
// 
// 			</Paper>
// 			{/* </Container> */}
// 			</>
// 		);
// 	}
// 
// }
// 
// // List.propTypes = {
// // 	dispatch: PropTypes.func.isRequired
// // }
// 
// function mapDispatchToProps(dispatch) {
// 	return {
// 	}
// }
// 
// function mapStateToProps(state, ownProps) {
// 
//     const title = ownProps["title"];
//     const description = ownProps["description"];
// 	const cols = ownProps["cols"];
//     const rows = ownProps["rows"];
// 	const actions = ownProps["actions"];
// 	const editable = ownProps["editable"];
// 	const onRowClick = ownProps["onRowClick"];
// 
// 	return {
//         title: title, 
//         description: description, 
// 		cols: cols, 
//         rows: rows, 
// 		actions: actions, 
// 		editable: editable, 
// 		onRowClick: onRowClick
// 	}
// 
// }
// 
// // export default connect(mapStateToProps, mapDispatchToProps)(List);
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(List));



// import React from 'react';
// import { Table, Image } from 'semantic-ui-react';
// import { useHistory } from 'react-router-dom';

const List = (props) => {

	// const namespace = "infra";

	const ownProps = props;

    const title = ownProps["title"];
    const description = ownProps["description"];
	const cols = ownProps["cols"];
    // const rows = ownProps["rows"];
	const data = ownProps["data"];
	const actions = ownProps["actions"];
	const editable = ownProps["editable"];
	const detailLink = ownProps["detailLink"];
	// const onRowClick = ownProps["onRowClick"];

	const history = useHistory();
	const onRowClick = (event, rowData, togglePanel) => {
		// history.push("/namespaces/" + namespace + "/" + rowData["_label"] + "/" + rowData["_id"]);
		history.push(detailLink(rowData));
	}

	return (
		<>
		{/* <Container
			className={classes.mainContainer} 
		> */}
		<Paper
			// className={classes.mainPaper} 
			style={{
				width: '100%', 
				marginTop: '20px', 
				marginBottom: '0px', 
			}}
		>

			{/* <h1>{title}</h1> */}
			{/* <h2>{description}</h2> */}

			<MaterialTable
				title={description}
				columns={cols}
				// data={rows}
				// data={data}
				data={query => 
					new Promise((resolve, reject) => {
						let offset = (query.page + 0) * query.pageSize;
						let limit = query.pageSize; // (query.page + 1) * query.pageSize;
						let url = 'http://192.168.1.112:5000/api/v2.0/archives/Files?'
						url += 'offset=' + offset // query.pageSize
						url += '&limit=' + limit // (query.page + 1)
						fetch(url)
							.then(response => response.json())
							.then(result => {
								resolve({
									data: result.data,
									page: query.page, // result.page - 1,
									totalCount: result.count,
								})
							})
					})
				}
				// actions={[{
				// 	icon: 'save',
				// 	tooltip: 'Save User',
				// 	onClick: (event, rowData) => window.alert("You saved " + rowData.name)
				// }, {
				// 	icon: 'delete',
				// 	tooltip: 'Delete User',
				// 	onClick: (event, rowData) => window.confirm("You want to delete " + rowData.name)
				// }, {
				// 	icon: 'add',
				// 	tooltip: 'Add User',
				// 	isFreeAction: true,
				// 	onClick: (event) => window.alert("You want to add a new row")
				// }]}
				actions={actions}
				options={{
					// pageSize: ...
					pageSizeOptions: [],
					toolbar: true,
					paging: false, // true,
					actionsColumnIndex: -1
				}}
				// editable={{
				// }}
				// editable={{
				// 	onRowAdd: newData => window.alert(""),
				// 	onRowUpdate: (newData, oldData) => window.alert(""),
				// }}
				editable={editable}
				// onRowClick={onRowClick}
				// onRowClick={(event, rowData, togglePanel) => redirect() }
				onRowClick={(event, rowData, togglePanel) => onRowClick(event, rowData, togglePanel)}
				style={{
					width: "100%"
				}}/>

		</Paper>
		{/* </Container> */}
		</>
	);

}

export default List;
