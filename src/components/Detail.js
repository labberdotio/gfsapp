
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({

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
		} = this.props;

	}

	componentDidMount() {

		const {
		} = this.props;

	}

	render() {

		const {
			title, 
            description, 
			properties
		} = this.props;

		const { classes } = this.props;

		return (
			<>
			<Paper
				className={classes.mainPaper} 
			>

				<h1>{title}</h1>
				<h5>{description}</h5>

				<List component="nav" className={classes.root} aria-label="Properties">
					{ properties && properties.map((item, i) => (
					<ListItem>
						<ListItemText  
							primary={item.name} 
							secondary={item.value} />
					</ListItem>
					))}
				</List>

			</Paper>
			</>
		);
	}

}

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Detail));
