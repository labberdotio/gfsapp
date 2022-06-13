
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

});

class Detail extends Component {

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
			properties
		} = this.props;

	}

	componentDidMount() {

		const {
			title, 
            description, 
			properties
		} = this.props;

	}

	/*
	 *
	 */

	render() {

		const {
			title, 
            description, 
			properties
		} = this.props;

		const { classes } = this.props;

		// const instance = properties;

		return (
			<>
			<Container
				className={classes.mainContainer} 
			>
			{/* <Paper
				className={classes.mainPaper} 
			> */}

				<h1>{title}</h1>
				<h2>{description}</h2>

				{/* {instanceid && instance &&
					<p><h1>{instanceid}</h1></p>
				} */}

				{/* {instance && instance["name"] &&
					<h1>{instance["name"]}</h1>
				}

				{instance && instance["label"] &&
					<h2>{instance["label"]}</h2>
				}

				{instance && instance["id"] &&
					<p><label>ID: </label>{instance["id"]}</p>
				}

				{instance && instance["uuid"] &&
					<p><label>UUID: </label>{instance["uuid"]}</p>
				}

				{instance && instance["created"] &&
					<p><label>Created: </label>{instance["created"]}</p>
				}

				{instance && instance["modified"] &&
					<p><label>Modified: </label>{instance["modified"]}</p>
				} */}

				{/* { instance && Object.keys(instance).map((item, i) => (
					<h3>{item}: {instance[item]}</h3>
				))} */}

				{/* { schema && schema["properties"] && Object.keys(schema["properties"]).map((item, i) => (
					<h3>{item}</h3>
				))} */}

				{ properties && properties.map((item, i) => (
					<p><label>{item.name}: </label>{ item.value }</p>
				))}

			{/* </Paper> */}
			</Container>
			</>
		);
	}

}

// Detail.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {
	}
}

function mapStateToProps(state, ownProps) {

	const title = ownProps["title"];
    const description = ownProps["description"];
	const properties = ownProps["properties"];

	return {
        title: title, 
        description: description, 
		properties: properties
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(Detail);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Detail));
