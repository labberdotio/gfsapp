
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

import InstanceView from './Instance'
import InstancesView from './Instances'
import ListView from './List'
import DetailView from './Detail'

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
			// api, 
			// namespace, 
			title, 
            description, 
			typename, 
			type, 
			instanceid, 
			instance, 
			ainstances, 
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
			// api, 
			// namespace, 
			title, 
            description, 
			typename, 
			type, 
			instanceid, 
			instance, 
			ainstances, 
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

	getProperties(typename, type, schema, instance) {

		var properties = [];
		// var dependencies = [];

		var propertyname = "id";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				"value": instance[propertyname]
			});
		}

		propertyname = "uuid";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				"value": instance[propertyname]
			});
		}

		propertyname = "name";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				"value": instance[propertyname]
			});
		}

		propertyname = "created";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				"value": instance[propertyname]
			});
		}

		propertyname = "modified";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				"value": instance[propertyname]
			});
		}

		if( schema && schema["properties"] ) {
			for( var propertyname in schema["properties"] ) {
				var property = schema["properties"][propertyname];
				if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
					// if( property && property["type"] ) {
					if( property ) {
						// if( property["type"] == "string" ) {
						// 	properties.push(propertyname);
						// } else 
						if( property["$ref"] ) {
						// 	...
						} else if( (property["type"]) && 
								   (property["type"] == "array") && 
								   (property["items"]) ) {
						// 	...
						} else if( property["type"] ) {
							var prop = {
								"name": propertyname, 
								"type": property["type"], 
								"value": undefined
							};
							if( instance && instance[propertyname] ) {
								prop["value"] = instance[propertyname];
							} else {
								prop["value"] = undefined;
							}
							properties.push(prop);
						}
					}
				}
			}
		}

		return properties;
	}

	getDependencies(typename, type, schema, instance) {

		// var properties = [];
		var dependencies = [];

		if( schema && schema["properties"] ) {
			for( var propertyname in schema["properties"] ) {
				var property = schema["properties"][propertyname];
				if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
					// if( property && property["type"] ) {
					if( property ) {
						// if( property["type"] == "string" ) {
						// 	properties.push(propertyname);
						// } else 
						if( property["$ref"] ) {
							var dep = {
								"name": propertyname, 
								"type": property["$ref"].replace("#/definitions/", ""), 
								"cardinality": "single", 
								"value": undefined
							};
							if( instance && instance[propertyname] ) {
								dep["value"] = instance[propertyname];
							} else {
								dep["value"] = undefined;
							}
							dependencies.push(dep);
						} else if( (property["type"]) && 
								   (property["type"] == "array") && 
								   (property["items"]) ) {
							var dep = {
								"name": propertyname, 
								"type": property["items"]["$ref"].replace("#/definitions/", ""), 
								"cardinality": "multiple", 
								"value": undefined
							};
							if( instance && instance[propertyname] ) {
								dep["value"] = instance[propertyname];
							} else {
								dep["value"] = undefined;
							}
							dependencies.push(dep);
						} 
						// else if( property["type"] ) {
						// 	properties.push(propertyname);
						// }
					}
				}
			}
		}

		return dependencies;
	}

	getSingleDependencyEntities(name, type, value, ainstances) {

		var cinstance = undefined;

		if( name && type ) {
			if( value && ainstances ) {
				if( ainstances[type] ) {
					// for( var idx in value ) {
					var instance = value; // [idx];
					if( instance && instance["id"] ) {
						// var 
						cinstance = ainstances[type]["entities"][instance["id"]];
						// cinstances.push(cinstance);
					}
					// }
				}
			}
		}

		return cinstance;
	}

	getMultipleDependencyEntities(name, type, value, ainstances) {

		var cinstances = [];

		if( name && type ) {
			if( value && ainstances ) {
				if( ainstances[type] ) {
					for( var idx in value ) {
						var instance = value[idx];
						if( instance && instance["id"] ) {
							var cinstance = ainstances[type]["entities"][instance["id"]];
							cinstances.push(cinstance);
						}
					}
				}
			}
		}

		return cinstances;
	}

	/*
	 *
	 */

	render() {

		var _this = this;

		const {
			// api, 
			// namespace, 
			title, 
            description, 
			typename, 
			type, 
			instanceid, 
			instance, 
			ainstances, 
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

		var properties = this.getProperties( 
			typename, 
			type, 
			schema, 
			instance
		);

		var dependencies = this.getDependencies( 
			typename, 
			type, 
			schema, 
			instance
		);

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
				<DetailView 
					title={title} 
					description={description} 
					properties={this.getProperties( 
						typename, 
						type, 
						schema, 
						instance
					)} />
				{/* { dependencies && dependencies.filter(function(item){if(item.cardinality == "multiple"){return true;}else{return false;}}).map((item, i) => (
					<InstancesView 
						title={ item && item.name } 
						description={ item && item.type + " " + "(" + item.cardinality + ")" } 
						instances={ instance && item && this.getMultipleDependencyEntities( item.name, item.type, instance[item.name], ainstances ) }
						typename={ item && item.type } 
						type={ item && item.type } 
						wsClient={this.wsClient} />
				))} */}
				{/* { dependencies && dependencies.filter(function(item){ if(item.cardinality == "single"){return true;}else{return false;}}).map((item, i) => (
					<InstanceView 
						title={ item && item.name } 
						description={ item && item.type + " " + "(" + item.cardinality + ")" } 
						instance={ instance && item && this.getSingleDependencyEntities( item.name, item.type, instance[item.name], ainstances ) }
						typename={ item && item.type } 
						type={ item && item.type } 
						wsClient={this.wsClient} />
				))} */}
				{ dependencies && dependencies.map(function(item) {
					if(item.cardinality == "multiple") {
						return <InstancesView 
							title={ item && item.name } 
							description={ item && item.type + " " + "(" + item.cardinality + ")" } 
							instances={ instance && item && _this.getMultipleDependencyEntities( item.name, item.type, instance[item.name], ainstances ) }
							typename={ item && item.type } 
							type={ item && item.type } 
							wsClient={_this.wsClient} />
					} else {
						return <InstanceView 
							title={ item && item.name } 
							description={ item && item.type + " " + "(" + item.cardinality + ")" } 
							instance={ instance && item && _this.getSingleDependencyEntities( item.name, item.type, instance[item.name], ainstances ) }
							typename={ item && item.type } 
							type={ item && item.type } 
							wsClient={_this.wsClient} />
					}
				})}
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

	const title = ownProps["title"];
    const description = ownProps["description"];

	// const typename = match["params"]["typename"];
	// const instanceid = match["params"]["instanceid"];
	const typename = ownProps["typename"];
	const type = ownProps["type"];
	const schema = ownProps["schema"];
	const instanceid = ownProps["instanceid"];
	const instance = ownProps["instance"];
	const ainstances = ownProps["ainstances"];

	const {
		// api, 
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
		// api, 
		// namespace: api.namespace, 
		title: title, 
        description: description, 
		typename: typename, 
		type: type, 
		instanceid: instanceid, 
		instance: instance, 
		ainstances: ainstances, 
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
