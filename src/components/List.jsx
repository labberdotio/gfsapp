
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';

import Paper from '@mui/material/Paper';

// import MaterialTable from 'material-table';

const List = (props) => {

	const ownProps = props;

    const title = ownProps["title"];
    const description = ownProps["description"];
	const tableRef = ownProps["tableRef"];
	const cols = ownProps["cols"];
    // const rows = ownProps["rows"];
	// const data = ownProps["data"];
	const dataurl = ownProps["dataurl"];
	const actions = ownProps["actions"];
	const editable = ownProps["editable"];
	const detailLink = ownProps["detailLink"];
	// const onRowClick = ownProps["onRowClick"];

	// const history = useHistory();
	const onRowClick = (event, rowData, togglePanel) => {
		// // history.push("/namespaces/" + namespace + "/" + rowData["_label"] + "/" + rowData["_id"]);
		// history.push(detailLink(rowData));
	}

	return (
		<>
		<Paper
			style={{
				width: '100%', 
				marginTop: '20px', 
				marginBottom: '0px', 
			}}
		>

			<h1>{title}</h1>
			<h5>{description}</h5>

			{/* <MaterialTable
				title={title + ', ' +  description}
				tableRef={tableRef}
				columns={cols}
				// data={rows}
				// data={data}
				data={query => 
					new Promise((resolve, reject) => {
						let offset = (query.page + 0) * query.pageSize;
						let limit = query.pageSize;
						let url = dataurl + '?'
						url += 'offset=' + offset
						url += '&limit=' + limit
						fetch(url)
							.then(response => response.json())
							.then(result => {
								resolve({
									data: result.data,
									page: query.page,
									totalCount: result.count
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
				// actions={actions}
				actions={[
					{
					  icon: 'refresh',
					  tooltip: 'Refresh Data',
					  isFreeAction: true,
					  onClick: () => tableRef.current && tableRef.current.onQueryChange(),
					}
				  ]}
				options={{
					// pageSize: ...
					// pageSizeOptions: [],
					initialPage: 0,
					toolbar: true,
					paging: true,
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
				}}/> */}

		</Paper>
		</>
	);

}

export default List;
