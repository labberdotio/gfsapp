
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
import { useHistory } from "react-router-dom";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import InstancesView from './Instances'
import InstanceView from './Instance'

import { 
	loadEntityIntoState, 
	loadEntitiesIntoState
} from '../actions/Entity'

import { 
	getEntityFromState, 
	getEntitiesFromState 
} from '../stores/Entity'

import APIClient from '../clients/APIClient';

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

function handleClick(event) {
	// event.preventDefault();
}

export const BackNavButton = () => {
    let history = useHistory();
    return (
        <>
			<Button
				startIcon={<ArrowBackIcon />} 
				onClick={() => history.goBack()}>
				Back
			</Button>
        </>
    );
};

export const ForwardNavButton = () => {
    let history = useHistory();
    return (
		<>
			<Button
				endIcon={<ArrowForwardIcon />} 
				onClick={() => history.goForward()}>
					Forward
			</Button>
        </>
    );
};

class RootInstance extends Component {

	constructor(props) {
		super(props);
		this.state = this.calcState({
			insloading: false, 
			insloaded: false, 
			insfailed: false, 
			instanceid: false, 
			instance: false
		});
		// this.apiClient = new APIClient();
	}

	state = {
		insloading: false, 
		insloaded: false, 
		insfailed: false, 
		instanceid: false, 
		instance: false
	};

	calcState(state) {

		state = Object.assign({}, this.state, state)

		return state;
	}

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			type, 
			schema
		} = this.props;

		if( (!this.props.type["loading"]) && 
			(!this.props.type["loaded"]) && 
			(!this.props.type["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadType(api, namespace, typename);
			}
			// }
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadSchema(api, namespace, typename);
			}
			// }
		}

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		if( instanceid ) {
			this.loadInstance(api, namespace, typename, instanceid)
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			type, 
			schema
		} = this.props;

		if( (!this.props.type["loading"]) && 
			(!this.props.type["loaded"]) && 
			(!this.props.type["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadType(api, namespace, typename);
			}
			// }
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadSchema(api, namespace, typename);
			}
			// }
		}

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		if( instanceid ) {
			this.loadInstance(api, namespace, typename, instanceid)
		}

	}

	getDataURL(namespace, typename, type, schema) {
		// return "http://192.168.1.112:5000/api/v2.0/archives/Files";
		var dataurl = "http://192.168.1.112:5000/api/v2.0/" + namespace + "/" + typename;
		return dataurl;
	}

	getDataURL2(namespace, typename, type, schema, instance, instancefield) {
		// return "http://192.168.1.112:5000/api/v2.0/archives/Files";
		// var dataurl = "http://192.168.1.112:5000/api/v2.0/" + namespace + "/" + typename;
		var dataurl = "http://192.168.1.112:5000/api/v2.0/" + namespace + "/" + typename + "/" + instance["_id"] + "/" + instancefield;
		return dataurl;
	}

	/*
	 * Have to go back to commit cc6304f for this.
	 * Sun Jul 26 20:54:32 2020 -0700
	 * Sun Mar 29 16:20:36 2020 -0500
	 */
	loadInstance(api, namespace, typename, instanceid) {
		if( this.state.instanceid != instanceid ) {
			this.setState({
				insloading: false, 
				insloaded: false, 
				insfailed: false, 
				instanceid: instanceid, 
				instance: false
			});
		}
		if( (!this.state.insloading) && 
			(!this.state.insloaded) && 
			(!this.state.insfailed) ) {
			this.setState({
				insloading: true, 
				insloaded: false, 
				insfailed: false, 
				instanceid: instanceid, 
				instance: false
			});
			this.apiClient = new APIClient(
				api.api.host, 
				api.api.port
			);
			this.apiClient.getInstance(
				namespace, 
				typename, 
				instanceid, 
				(data) => {
					this.setState({
						insloading: false, 
						insloaded: true, 
						insfailed: false, 
						instanceid: instanceid, 
						instance: data
					});
				});
		}
	}

	getProperties(namespace, typename, type, schema, instance) {

		var properties = [];

		// var propertyname = "_id";
		// if( instance && instance[propertyname] ) {
		// 	properties.push({
		// 		"name": propertyname, 
		// 		"value": <Link to={this.makeInstanceLink(namespace, instance["_label"], instance["_id"])} style={{width: 50, borderRadius: '50%'}}>{instance["_id"]}</Link>
		// 	});
		// }

		// propertyname = "_uuid";
		// if( instance && instance[propertyname] ) {
		// 	properties.push({
		// 		"name": propertyname, 
		// 		"value": instance[propertyname]
		// 	});
		// }

		// propertyname = "_name";
		// if( instance && instance[propertyname] ) {
		// 	properties.push({
		// 		"name": propertyname, 
		// 		"value": <Link to={this.makeInstanceLink(namespace, instance["_label"], instance["_id"])} style={{width: 50, borderRadius: '50%'}}>{instance["_name"]}</Link>
		// 	});
		// }

		// propertyname = "_created";
		// if( instance && instance[propertyname] ) {
		// 	properties.push({
		// 		"name": propertyname, 
		// 		"value": instance[propertyname]
		// 	});
		// }

		// propertyname = "_modified";
		// if( instance && instance[propertyname] ) {
		// 	properties.push({
		// 		"name": propertyname, 
		// 		"value": instance[propertyname]
		// 	});
		// }

		if( schema && schema["properties"] ) {
			for( var propertyname in schema["properties"] ) {
				var property = schema["properties"][propertyname];
				if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(propertyname) ) {
					if( property ) {
						if( property["$ref"] ) {
						} else if( (property["type"]) && 
								   (property["type"] == "array") && 
								   (property["items"]) ) {
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

		var dependencies = [];

		if( schema && schema["properties"] ) {
			for( var propertyname in schema["properties"] ) {
				var property = schema["properties"][propertyname];
				if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(propertyname) ) {
					if( property ) {
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
					}
				}
			}
		}

		return dependencies;
	}

	makeInstanceLink(namespace, type, id) {
		return "/namespaces/" + namespace + "/" + type + "/" + id;
	}

	makeRelInstanceLink(namespace, type, id, relname) {
		return "/namespaces/" + namespace + "/" + type + "/" + id + "/" + relname;
	}

	makeInstance(instance) {
		return instance;
	}

	makeInstancesView(
		title, 
		description, 
		namespace, 
		typename, 
		type, 
		schema, 
		dataurl, 
		editable, 
		showdeps
	) {

		var _this = this;

		// const {
		// 	api, 
		// 	namespace, 
		// 	typename, 
		// 	type, 
		// 	schema
		// } = this.props;

		return <InstancesView 
			title={title} 
			description={description} 
			namespace={namespace} 
			typename={typename} 
			type={type} 
			schema={schema} 
			dataurl={dataurl} 
			editable={editable} 
			showdeps={showdeps} />
	}

	makeInstanceView(
		title, 
		description, 
		namespace, 
		typename, 
		type, 
		schema, 
		instanceid, 
		instance, 
		showdeps
	) {

		var _this = this;

		// const {
		// 	api, 
		// 	namespace, 
		// 	typename, 
		// 	type, 
		// 	schema
		// } = this.props;

		return <InstanceView 
			title={title} 
			description={description} 
			namespace={namespace} 
			typename={typename} 
			type={type} 
			schema={schema} 
			instanceid={instanceid} 
			instance={instance} 
			showdeps={showdeps} />

	}

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			type, 
			schema
		} = this.props;

		const { classes } = this.props;

		var backdropOpen = false;

		/*
		 * Have to go back to commit cc6304f for this.
		 * Sun Jul 26 20:54:32 2020 -0700
		 * Sun Mar 29 16:20:36 2020 -0500
		 */
		var instance = undefined;
		if( this.state.instance ) {
			instance = this.state.instance;
		}

		// var dataurl = this.getDataURL(
		// 	namespace, 
		// 	typename, 
		// 	type, 
		// 	schema
		// );

		var showdeps = false;
		var properties = undefined;
		var dependencies = undefined;
		if( schema && schema["entity"] && instance ) {

			showdeps = true;

			properties = this.getProperties(
				namespace, 
				typename, 
				type, 
				schema["entity"], // schema, 
				instance
			);

			dependencies = this.getDependencies(
				namespace, 
				typename, 
				type, 
				schema["entity"], // schema, 
				instance
			);

		}

		console.log(" !!! ");
		console.log(" --- ");
		console.log(schema["entity"]);
		console.log(instance);
		console.log(properties);
		console.log(dependencies);
		console.log(" --- ");

		return (
			<>
			<Container 
				className={classes.mainContainer} 
				>
			<Backdrop open={backdropOpen}>
				<CircularProgress color="inherit"/>
			</Backdrop>
			<Breadcrumbs aria-label="breadcrumb">
				<BackNavButton></BackNavButton>
				<Link color="inherit" to="/namespaces">
					Namespaces
				</Link>
				<Link color="inherit" to={"/namespaces/" + namespace}>
					{namespace}
				</Link>
				<Link color="inherit" to={"/namespaces/" + namespace + "/" + typename}>
					{typename}
				</Link>
				<Typography color="textPrimary">{ instance && ( instance["_name"] + " (" + instance["_id"] + ")") }</Typography>
				<ForwardNavButton></ForwardNavButton>
			</Breadcrumbs>
			<Grid 
				className="" 
				container 
				xs={12} 
				spacing={0} 
			>
				<Grid 
					className="leftGrid" 
					container 
					item 
					xs={3} 
					spacing={0} 
				>
					{/* <InstancesView 
						title={typename} 
						description={typename} 
						namespace={namespace} 
						typename={typename} 
						type={type["entity"]} 
						schema={schema["entity"]} 
						dataurl={_this.getDataURL(
							namespace, 
							typename, 
							type["entity"], 
							schema["entity"]
						)} 
						editable={false} 
						showdeps={true} /> */}
						{_this.makeInstancesView(
							typename, 
							typename, 
							namespace, 
							typename, 
							type["entity"], 
							schema["entity"], 
							_this.getDataURL(
								namespace, 
								typename, 
								type["entity"], 
								schema["entity"]
							), 
							false, 
							true
						)}
				</Grid>

				<Grid 
					className="centerGrid" 
					container 
					item 
					xs={6} 
					spacing={0} 
				>
					{/* <InstanceView 
						title={ instance && ( instance["_name"] + " (" + instance["_id"] + ")") } 
						description={typename} 
						namespace={namespace} 
						typename={typename} 
						type={type["entity"]} 
						schema={schema["entity"]} 
						instanceid={instanceid} 
						instance={instance} 
						showdeps={true} /> */}
						{_this.makeInstanceView(
							instance && ( instance["name"] + " (" + instance["_id"] + ")"), 
							typename, 
							namespace, 
							typename, 
							type["entity"], 
							schema["entity"], 
							instanceid, 
							instance, 
							true
						)}
				</Grid>

				<Grid 
					className="rightGrid" 
					container 
					item 
					xs={3} 
					spacing={0} 
				>
					{ showdeps && instance && dependencies && dependencies.map(function(item) {
						if(item && item.cardinality == "multiple") {
							var deptypename = schema["entity"]["properties"][item.name]["items"]["$ref"].replace("#/definitions/", "");
							var deptype = schema["entity"]["definitions"][deptypename];
							var depschema = schema["entity"]["definitions"][deptypename];
							depschema["definitions"] = schema["entity"]["definitions"];
							// return <>
							// 	<InstancesView 
							// 		title={ item && item["_name"] } 
							// 		description={ item && item.type + " " + "(" + item.cardinality + ")" } 
							// 		namespace={namespace} 
							// 		typename={ deptypename } 
							// 		type={ deptype } 
							// 		schema={ depschema } 
							// 		dataurl={_this.getDataURL2(
							// 			namespace, 
							// 			typename, // deptypename, 
							// 			type, // deptype, 
							// 			schema, // depschema, 
							// 			instance, // item && item.value, 
							// 			item && item["_name"]
							// 		)} 
							// 		showdeps={false} />
							// 	</>
							return _this.makeInstancesView(
								item && item["_name"], 
								item && item.type + " " + "(" + item.cardinality + ")",  
								namespace, 
								deptypename, 
								deptype, 
								depschema, 
								_this.getDataURL2(
									namespace, 
									typename, // deptypename, 
									type, // deptype, 
									schema, // depschema, 
									instance, // item && item.value, 
									item && item["_name"]
								), 
								false
							);
						} else if(item && item.value) {
							var deptypename = schema["entity"]["properties"][item.name]["$ref"].replace("#/definitions/", "");
							var deptype = schema["entity"]["definitions"][deptypename];
							var depschema = schema["entity"]["definitions"][deptypename];
							depschema["definitions"] = schema["entity"]["definitions"];
							// return <> 
							// 	<InstanceView 
							// 		title={ item && item["_name"] } 
							// 		description={ item && item.type + " " + "(" + item.cardinality + ")" } 
							// 		namespace={namespace} 
							// 		typename={ deptypename } 
							// 		type={ deptype } 
							// 		schema={ depschema } 
							// 		instanceid={item && item.value && item.value["_id"]} 
							// 		instance={item && item.value} 
							// 		showdeps={false} />
							// 	</>
							return _this.makeInstanceView(
								item && item["_name"], 
								item && item.type + " " + "(" + item.cardinality + ")", 
								namespace, 
								deptypename, 
								deptype, 
								depschema, 
								item && item.value && item.value["_id"], 
								item && item.value, 
								false
							);
						}
					})}
				</Grid>

			</Grid>
			</Container>
			</>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {

		loadType: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "type", typename)),

		loadSchema: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "schema", typename))

	}
}

function mapStateToProps(state, ownProps) {

	const {
		namespace, 
		typename, 
		instanceid
	} = ownProps;

	const {
		api
	} = state;

	const type = getEntityFromState(state, api, namespace, "type", typename);

	const schema = getEntityFromState(state, api, namespace, "schema", typename);

	return {
		api, 
		namespace: namespace, 
		typename: typename, 
		instanceid: instanceid, 
		type: type, 
		schema: schema
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootInstance));
