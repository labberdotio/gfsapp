
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'

import Paper from '@mui/material/Paper';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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

		return (
			<>
			<Paper
				// className={classes.mainPaper} 
				className="mainPaper" 
			>

				<h1>{title}</h1>
				<h5>{description}</h5>

				<List component="nav" 
					// className={classes.root} 
					className="root" 
					aria-label="Properties"
				>
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

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Detail));
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
