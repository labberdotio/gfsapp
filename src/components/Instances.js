
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

// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';

// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import AddIcon from '@material-ui/icons/Add';

// import MaterialTable from 'material-table';

// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

// import SpeedDial from '@material-ui/lab/SpeedDial';
// import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
// import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

// import InstancesView from './Instances'
import ListView from './List'

// import { 
// 	loadEntitiesIntoState, 
// 	invalidateEntitiesInState, 
// 	refreshEntityInState 
// } from '../actions/Entity'

// import { 
// 	getEntitiesFromState 
// } from '../stores/Entity'

// const history = createBrowserHistory();
// const history = useHistory();
// 
// const queryString = require('query-string');

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

		this.wsClient = props.wsClient;
		this.wsClient.onMessage(
			function(data) {
				
			}
		);
	}

	state = {
		
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			// api, 
			// namespace, 
			title, 
            description, 
			typename, 
			type, 
			schema, 
			// isloading, 
			// isloaded, 
			// isfailed, 
			// istimestamp, 
			instances, 
			ainstances
		} = this.props;

		// if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
		// 	this.props.loadInstances(api, typename);
		// }

	}

	componentDidMount() {

		const {
			// api, 
			// namespace, 
			title, 
            description, 
			typename, 
			type, 
			schema, 
			// isloading, 
			// isloaded, 
			// isfailed, 
			// istimestamp, 
			instances, 
			ainstances
		} = this.props;

		// if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
		// 	this.props.loadInstances(api, typename);
		// }

	}

	/*
	 * 
	 */

	getListCols(typename, type, schema, instances, ainstances) {

		var cols = [];
		cols.push({
			title: "id",
			field: "id"
		});
		cols.push({
			title: "link",
			field: "link",
			render: rowData => <a href={this.makeInstanceLink(rowData.label, rowData.id)} style={{width: 50, borderRadius: '50%'}}>{rowData.name}</a>
		});
		cols.push({
			title: "uuid",
			field: "uuid"
		});
		cols.push({
			title: "name",
			field: "name"
		});
		// cols.push({
		// 	title: "created",
		// 	field: "created"
		// });
		// cols.push({
		// 	title: "modified",
		// 	field: "modified"
		// });

		if( type ) {
			if( type["properties"] ) {
				for( var property in type["properties"] ) {
					if( !["id", "uuid", "name", "created", "modified"].includes(property) ) {
						cols.push({
							title: property,
							field: property
						});
					}
				}
			}
		}

		return cols;
	}

	getListRows(typename, type, schema, instances, ainstances) {

		var cols = [];
		cols.push({
			title: "id",
			field: "id"
		});
		cols.push({
			title: "link",
			field: "link",
			render: rowData => <a href={this.makeInstanceLink(rowData.label, rowData.id)} style={{width: 50, borderRadius: '50%'}}>{rowData.name}</a>
		});
		cols.push({
			title: "uuid",
			field: "uuid"
		});
		cols.push({
			title: "name",
			field: "name"
		});
		// cols.push({
		// 	title: "created",
		// 	field: "created"
		// });
		// cols.push({
		// 	title: "modified",
		// 	field: "modified"
		// });

		if( type ) {
			if( type["properties"] ) {
				for( var property in type["properties"] ) {
					if( !["id", "uuid", "name", "created", "modified"].includes(property) ) {
						cols.push({
							title: property,
							field: property
						});
					}
				}
			}
		}

		var rows = [];
		if( instances ) {
			for( var instanceid in instances ) {
				var instance = instances[instanceid];
				if( instance ) {
					rows.push(instance);
				}
			}
		}

		return rows;
	}

	/*
	 *
	 */

	makeInstanceLink(label, id) {
		return "/detail/" + label + "/" + id;
	}

	render() {

		const {
			// api, 
			// namespace, 
			title, 
            description, 
			typename, 
			type, 
			schema, 
			// isloading, 
			// isloaded, 
			// isfailed, 
			// istimestamp, 
			instances, 
			ainstances
		} = this.props;

		const { classes } = this.props;

		// var backdropOpen = false;

		var cols = [];
		cols.push({
			title: "id",
			field: "id"
		});
		cols.push({
			title: "uuid",
			field: "uuid"
		});
		cols.push({
			title: "name",
			field: "name"
		});
		// cols.push({
		// 	title: "created",
		// 	field: "created"
		// });
		// cols.push({
		// 	title: "modified",
		// 	field: "modified"
		// });

		if( type ) {
			if( type["properties"] ) {
				for( var property in type["properties"] ) {
					if( !["id", "uuid", "name", "created", "modified"].includes(property) ) {
						cols.push({
							title: property,
							field: property
						});
					}
				}
			}
		}

		var rows = [];
		if( instances ) {
			for( var instanceid in instances ) {
				var instance = instances[instanceid];
				if( instance ) {
					rows.push(instance);
				}
			}
		}

		return (
			<>
			{/* <Container 
				className={classes.listContainer} 
				// className="listContainer" 
				// maxWidth="false"
				> */}
			{/* <Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop> */}
			{/* <Grid 
				className={classes.fullGrid} 
				// className="fullGrid" 
				container 
				xs={12} 
				spacing={0} 
			> */}
				<ListView 
					title={title} 
					description={description} 
					cols={this.getListCols( 
						typename, 
						type, 
						schema, 
						instances, 
						ainstances
					)}
					rows={this.getListRows( 
						typename, 
						type, 
						schema, 
						instances, 
						ainstances
					)} />
			{/* </Grid> */}
			{/* </Container> */}
			</>
		);
	}

}

// Instances.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		// loadInstances: (api, typename) => dispatch(loadEntitiesIntoState(api, typename))

	}
}

function mapStateToProps(state, ownProps) {

	const { match } = ownProps;

	const title = ownProps["title"];
    const description = ownProps["description"];

	// const typename = match["params"]["typename"];
	const typename = ownProps["typename"];
	const type = ownProps["type"];
	const schema = ownProps["schema"];
	const instances = ownProps["instances"];
	const ainstances = ownProps["ainstances"];

	const {
		// api, 
	} = state;

	// const {
	// 	loading: isloading, 
	// 	loaded: isloaded, 
	// 	failed: isfailed, 
	// 	timestamp: istimestamp, 
	// 	entities: instances
	// } = getEntitiesFromState(state, api, typename);

	return {
		// api, 
		// namespace: api.namespace, 
		title: title, 
        description: description, 
		typename: typename, 
		type: type, 
		schema: schema, 
		// isloading: isloading, 
		// isloaded: isloaded, 
		// isfailed: isfailed, 
		// istimestamp: istimestamp, 
		instances: instances, 
		ainstances: ainstances
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(Instances);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Instances));
