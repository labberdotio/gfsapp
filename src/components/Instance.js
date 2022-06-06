
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

// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';

// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MaterialTable from 'material-table';

// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

import InstancesView from './Instances'
// import InstanceView from './Instance'
// import DependentsView from './Dependents'

// import { 
// 	loadEntityIntoState, 
// 	loadEntitiesIntoState
// } from '../actions/Entity'

// import { 
// 	getEntityFromState, 
// 	getEntitiesFromState 
// } from '../stores/Entity'

// const history = createBrowserHistory();
// const history = useHistory();
// 
// const queryString = require('query-string');

const styles = theme => ({

	mainPaper: {
		width: '100%'
	},

});

class Instance extends Component {

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
			api, 
			namespace, 
			typename, 
			type, 
			instanceid, 
			instance, 
			// isloading, 
			// isloaded, 
			// isfailed, 
			// istimestamp, 
			// instances, 
			// ssloading, 
			// ssloaded, 
			// ssfailed, 
			// sstimestamp, 
			schema
		} = this.props;

		// if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
		// 	this.props.loadInstances(api, typename);
		// }

		// if( (!this.props.ssloading) && (!this.props.ssloaded) && (!this.props.ssfailed) ) {
		// 	if( typename ) {
		// 		this.props.loadSchema(api, typename);
		// 	}
		// }

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			type, 
			instanceid, 
			instance, 
			// isloading, 
			// isloaded, 
			// isfailed, 
			// istimestamp, 
			// instances, 
			// ssloading, 
			// ssloaded, 
			// ssfailed, 
			// sstimestamp, 
			schema
		} = this.props;

		// if( (!this.props.isloading) && (!this.props.isloaded) && (!this.props.isfailed) ) {
		// 	this.props.loadInstances(api, typename);
		// }

		// if( (!this.props.ssloading) && (!this.props.ssloaded) && (!this.props.ssfailed) ) {
		// 	if( typename ) {
		// 		this.props.loadSchema(api, typename);
		// 	}
		// }

	}

	/*
	 *
	 */

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			typename, 
			type, 
			instanceid, 
			instance, 
			// isloading, 
			// isloaded, 
			// isfailed, 
			// istimestamp, 
			// instances, 
			// ssloading, 
			// ssloaded, 
			// ssfailed, 
			// sstimestamp, 
			schema
		} = this.props;

		const { classes } = this.props;

		// var backdropOpen = false;

		// var instance = undefined;
		// if( instanceid ) {
		// 	var cinstance = instances[instanceid];
		// 	if( cinstance ) {
		// 		instance = cinstance;
		// 	}
		// }

		var properties = [];
		var dependencies = [];

		if( schema && schema["properties"] ) {
			for( var propertyname in schema["properties"] ) {
				var property = schema["properties"][propertyname];
				if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
					if( property && property["type"] ) {
						if( property["type"] == "string" ) {
							properties.push(propertyname);
						} else if( (property["type"] == "array") && 
								   (property["items"]) ) {
							dependencies.push({
								"name": propertyname,
								"type": property["items"]["$ref"].replace("#/definitions/", "")
							});
						}
					}
				}
			}
		}

		return (
			<>
			<Container 
				className={classes.listContainer} 
				// className="listContainer" 
				// maxWidth="false"
				>
			{/* <Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop> */}
			<Grid 
				className={classes.fullGrid} 
				// className="fullGrid" 
				container 
				xs={12} 
				spacing={0} 
			>

					<Paper
						className={classes.mainPaper} 
					>

					{/* {instanceid && instance &&
						<p><h1>{instanceid}</h1></p>
					} */}

					{instance && instance["name"] &&
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
					}

					{/* { instance && Object.keys(instance).map((item, i) => (
						<h3>{item}: {instance[item]}</h3>
					))} */}

					{/* { schema && schema["properties"] && Object.keys(schema["properties"]).map((item, i) => (
						<h3>{item}</h3>
					))} */}

					{ properties && properties.map((item, i) => (
						<p><label>{item}: </label>{ instance && instance[item] }</p>
					))}

					{ dependencies && dependencies.map((item, i) => (
						<>
						<p><label>{item.name} [{item.type}]: </label></p>
						<InstancesView 
							typename={item.type} 
							type={item.type} 
							wsClient={this.wsClient} />
						</>
					))}

					</Paper>

			</Grid>
			</Container>
			</>
		);
	}

}

// Instance.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		// loadInstances: (api, typename) => dispatch(loadEntitiesIntoState(api, typename)), 

		// loadSchema: (api, typename) => dispatch(loadEntityIntoState(api, "schema", typename))

	}
}

function mapStateToProps(state, ownProps) {

	const { match } = ownProps;

	// const typename = match["params"]["typename"];
	// const instanceid = match["params"]["instanceid"];
	const typename = ownProps["typename"];
	const type = ownProps["type"];
	const schema = ownProps["schema"];
	const instanceid = ownProps["instanceid"];
	const instance = ownProps["instance"];

	const {
		api, 
	} = state;

	/* const {
		loading: isloading, 
		loaded: isloaded, 
		failed: isfailed, 
		timestamp: istimestamp, 
		entities: instances
	} = getEntitiesFromState(state, api, typename); */

	/* const {
		loading: ssloading, 
		loaded: ssloaded, 
		failed: ssfailed, 
		timestamp: sstimestamp, 
		entity: schema
	} = getEntityFromState(state, api, "schema", typename); */

	// console.log( " SCHEMA >> " );
	// console.log( ssloading );
	// console.log( ssloaded );
	// console.log( ssfailed );
	// console.log( sstimestamp );
	// console.log( schema );
	// console.log( " << SCHEMA " );

	return {
		api, 
		namespace: api.namespace, 
		typename: typename, 
		type: type, 
		instanceid: instanceid, 
		instance: instance, 
		// isloading: isloading, 
		// isloaded: isloaded, 
		// isfailed: isfailed, 
		// istimestamp: istimestamp, 
		// instances: instances,
		// ssloading: ssloading, 
		// ssloaded: ssloaded, 
		// ssfailed: ssfailed, 
		// sstimestamp: sstimestamp, 
		schema: schema
	}

}

// export default connect(mapStateToProps, mapDispatchToProps)(Instance);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Instance));
