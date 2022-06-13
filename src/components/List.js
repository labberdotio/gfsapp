
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

import MaterialTable from 'material-table';

const styles = theme => ({

	mainPaper: {
		width: '100%', 
		marginTop: '20px', 
		marginBottom: '0px', 
	},

});

class List extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	state = {
		
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
            title, 
            description, 
			cols, 
            rows
		} = this.props;

	}

	componentDidMount() {

		const {
            title, 
            description, 
			cols, 
            rows
		} = this.props;

	}

	/*
	 *
	 */

	render() {

		const {
            title, 
            description, 
			cols, 
            rows
		} = this.props;

		const { classes } = this.props;

		// cols.push({
		// 	field: 'link',
		// 	title: 'Link',
		// 	render: rowData => <img src={rowData.url} style={{width: 50, borderRadius: '50%'}}/>
		// })

		return (
			<>
			<Container
				className={classes.mainContainer} 
			>
			<Paper
				className={classes.mainPaper} 
			>
			<h1>{title}</h1>
			{/* <h2>{description}</h2> */}
			<MaterialTable
				title={title}
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
			</Paper>
			</Container>
			</>
		);
	}

}

// List.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {
	}
}

function mapStateToProps(state, ownProps) {

    const title = ownProps["title"];
    const description = ownProps["description"];
	const cols = ownProps["cols"];
    const rows = ownProps["rows"];

	return {
        title: title, 
        description: description, 
		cols: cols, 
        rows: rows
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(List);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(List));
