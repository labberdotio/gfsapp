
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

// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';

// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';

// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// import MaterialTable from 'material-table';

// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MuiLink from '@material-ui/core/Link';
// import { Link } from '@material-ui/core';
import {
	Link,
} from "react-router-dom";

import InstanceView from './Instance'
import InstancesView from './Instances'
// import ListView from './List'
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
		width: '100%', 
		marginTop: '20px', 
		marginBottom: '0px', 
	},

});

class Instance extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}

		var _this = this;

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
			// ainstances, 
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
		// 	if( api && namespace ) {
		// 		this.props.loadInstances(api, namespace, typename);
		// 	}
		// }

		// if( (!this.props.ssloading) && (!this.props.ssloaded) && (!this.props.ssfailed) ) {
		// 	if( api && namespace && typename ) {
		// 		this.props.loadSchema(api, namespace, typename);
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
			// ainstances, 
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
		// 	if( api && namespace ) {
		// 		this.props.loadInstances(api, namespace, typename);
		// 	}
		// }

		// if( (!this.props.ssloading) && (!this.props.ssloaded) && (!this.props.ssfailed) ) {
		// 	if( api && namespace && typename ) {
		// 		this.props.loadSchema(api, namespace, typename);
		// 	}
		// }

	}

	/*
	 *
	 */

	getProperties(namespace, typename, type, schema, instance) {

		var properties = [];
		// var dependencies = [];

		var propertyname = "_id";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				// "value": instance[propertyname],
				// "value": <a href={this.makeInstanceLink(namespace, instance["_label"], instance["_id"])} style={{width: 50, borderRadius: '50%'}}>{instance["_id"]}</a>
				"value": <Link to={this.makeInstanceLink(namespace, instance["_label"], instance["_id"])} style={{width: 50, borderRadius: '50%'}}>{instance["_id"]}</Link>
			});
			// var propertyname = "link";
			// // if( instance && instance[propertyname] ) {
			// 	properties.push({
			// 		"name": propertyname, 
			// 		"value": <a href={this.makeInstanceLink(namespace, instance["_label"], instance["_id"])} style={{width: 50, borderRadius: '50%'}}>{instance["_name"]}</a>
			// 	});
			// // }
		}

		propertyname = "_uuid";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				"value": instance[propertyname]
			});
		}

		propertyname = "_name";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				// "value": instance[propertyname],
				// "value": <a href={this.makeInstanceLink(namespace, instance["_label"], instance["_id"])} style={{width: 50, borderRadius: '50%'}}>{instance["_name"]}</a>
				"value": <Link to={this.makeInstanceLink(namespace, instance["_label"], instance["_id"])} style={{width: 50, borderRadius: '50%'}}>{instance["_name"]}</Link>
			});
		}

		propertyname = "_created";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				"value": instance[propertyname]
			});
		}

		propertyname = "_modified";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				"value": instance[propertyname]
			});
		}

		if( schema && schema["properties"] ) {
			for( var propertyname in schema["properties"] ) {
				var property = schema["properties"][propertyname];
				if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(propertyname) ) {
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

	getDependencies(namespace, typename, type, schema, instance) {

		// var properties = [];
		var dependencies = [];

		if( schema && schema["properties"] ) {
			for( var propertyname in schema["properties"] ) {
				var property = schema["properties"][propertyname];
				if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(propertyname) ) {
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

	// getSingleDependencyEntities(namespace, name, type, value, ainstances) {
	// 
	// 	var cinstance = undefined;
	// 
	// 	if( name && type ) {
	// 		if( value && ainstances ) {
	// 			if( ainstances[type] ) {
	// 				// for( var idx in value ) {
	// 				var instance = value; // [idx];
	// 				if( instance && instance["_id"] ) {
	// 					// var 
	// 					cinstance = ainstances[type]["entities"][instance["_id"]];
	// 					// cinstances.push(cinstance);
	// 				}
	// 				// }
	// 			}
	// 		}
	// 	}
	// 
	// 	return cinstance;
	// }

	// getMultipleDependencyEntities(namespace, name, type, value, ainstances) {
	// 
	// 	var cinstances = [];
	// 
	// 	if( name && type ) {
	// 		if( value && ainstances ) {
	// 			if( ainstances[type] ) {
	// 				for( var idx in value ) {
	// 					var instance = value[idx];
	// 					if( instance && instance["_id"] ) {
	// 						var cinstance = ainstances[type]["entities"][instance["_id"]];
	// 						cinstances.push(cinstance);
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 
	// 	return cinstances;
	// }

	/*
	 *
	 */

	makeInstanceLink(namespace, type, id) {
		return "/namespaces/" + namespace + "/" + type + "/" + id;
	}

	makeRelInstanceLink(namespace, type, id, relname) {
		return "/namespaces/" + namespace + "/" + type + "/" + id + "/" + relname;
	}

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			title, 
            description, 
			typename, 
			type, 
			instanceid, 
			instance, 
			// ainstances, 
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
			namespace, 
			typename, 
			type, 
			schema, 
			instance
		);

		var dependencies = this.getDependencies(
			namespace, 
			typename, 
			type, 
			schema, 
			instance
		);

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
				className={} 
				// className="" 
				container 
				xs={12} 
				spacing={0} 
			> */}
				<DetailView 
					title={title} 
					description={description} 
					properties={this.getProperties(
						namespace, 
						typename, 
						type, 
						schema, 
						instance
					)} />
				{/* { dependencies && dependencies.filter(function(item){if(item.cardinality == "multiple"){return true;}else{return false;}}).map((item, i) => (
					<InstancesView 
						title={ item && item["_name"] } 
						description={ item && item.type + " " + "(" + item.cardinality + ")" } 
						instances={ instance && item && this.getMultipleDependencyEntities( namespace, item["_name"], item.type, instance[item["_name"]], ainstances ) }
						typename={ item && item.type } 
						type={ item && item.type } />
				))} */}
				{/* { dependencies && dependencies.filter(function(item){ if(item.cardinality == "single"){return true;}else{return false;}}).map((item, i) => (
					<InstanceView 
						title={ item && item["_name"] } 
						description={ item && item.type + " " + "(" + item.cardinality + ")" } 
						instance={ instance && item && this.getSingleDependencyEntities( namespace, item["_name"], item.type, instance[item["_name"]], ainstances ) }
						typename={ item && item.type } 
						type={ item && item.type } />
				))} */}
				{ instance && dependencies && dependencies.map(function(item) {
					if(item.cardinality == "multiple") {
						return <>
							{/* <MuiLink color="inherit" href={_this.makeRelInstanceLink(namespace, instance["_label"], instance["_id"], item["_name"])}>
								<h1>{item["_name"]}</h1> 
							</MuiLink> */}
							{/* <Link color="inherit" to={_this.makeRelInstanceLink(namespace, instance["_label"], instance["_id"], item["_name"])}>
								<h1>{item["_name"]}</h1> 
							</Link>							 */}
							<InstancesView 
							title={ item && item["_name"] } 
							description={ item && item.type + " " + "(" + item.cardinality + ")" } 
							namespace={namespace} 
							// instances={ instance && item && _this.getMultipleDependencyEntities( namespace, item.name, item.type, instance[item.name], ainstances ) }
							typename={ item && item.type } 
							type={ item && item.type } />
							</>
					} else {
						return <> 
							{/* <MuiLink color="inherit" href={_this.makeRelInstanceLink(namespace, instance["_label"], instance["_id"], item["_name"])}>
								<h1>{item["_name"]}</h1> 
							</MuiLink> */}
							{/* <Link color="inherit" to={_this.makeRelInstanceLink(namespace, instance["_label"], instance["_id"], item["_name"])}>
								<h1>{item["_name"]}</h1> 
							</Link> */}
							<InstanceView 
							title={ item && item["_name"] } 
							description={ item && item.type + " " + "(" + item.cardinality + ")" } 
							namespace={namespace} 
							// instance={ instance && item && _this.getSingleDependencyEntities( namespace, item.name, item.type, instance[item.name], ainstances ) }
							typename={ item && item.type } 
							type={ item && item.type } />
							</>
					}
				})}
			{/* </Grid> */}
			{/* </Container> */}
			</>
		);
	}

}

// Instance.propTypes = {
// 	dispatch: PropTypes.func.isRequired
// }

function mapDispatchToProps(dispatch) {
	return {

		// loadInstances: (api, namespace, typename) => dispatch(loadEntitiesIntoState(api, namespace, typename)), 

		// loadSchema: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "schema", typename))

	}
}

function mapStateToProps(state, ownProps) {

	// const { match } = ownProps;

	// const title = ownProps["title"];
    // const description = ownProps["description"];

	// // const typename = match["params"]["typename"];
	// // const instanceid = match["params"]["instanceid"];
	// const typename = ownProps["typename"];
	// const type = ownProps["type"];
	// const schema = ownProps["schema"];
	// const instanceid = ownProps["instanceid"];
	// const instance = ownProps["instance"];
	// const ainstances = ownProps["ainstances"];

	const {
		title, 
		description, 
		typename, 
		type, 
		schema, 
		instanceid, 
		instance, 
		// ainstances
	} = ownProps;	

	const {
		// api, 
	} = state;

	/* const {
		loading: isloading, 
		loaded: isloaded, 
		failed: isfailed, 
		timestamp: istimestamp, 
		entities: instances
	} = getEntitiesFromState(state, api, namespace, typename); */

	/* const {
		loading: ssloading, 
		loaded: ssloaded, 
		failed: ssfailed, 
		timestamp: sstimestamp, 
		entity: schema
	} = getEntityFromState(state, api, namespace, "schema", typename); */

	// console.log( " SCHEMA >> " );
	// console.log( ssloading );
	// console.log( ssloaded );
	// console.log( ssfailed );
	// console.log( sstimestamp );
	// console.log( schema );
	// console.log( " << SCHEMA " );

	return {
		// api, 
		// namespace: namespace, 
		title: title, 
        description: description, 
		typename: typename, 
		type: type, 
		instanceid: instanceid, 
		instance: instance, 
		// ainstances: ainstances, 
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
