
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

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import MaterialTable from 'material-table';

const styles = theme => ({

	mainPaper: {
		width: '100%'
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

		return (
			<>
			<Paper
				className={classes.mainPaper} 
			>
			<h1>{title}</h1>
			<h2>{description}</h2>
			</Paper>
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
