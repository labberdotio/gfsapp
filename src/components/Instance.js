
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';

import {
	Link,
} from "react-router-dom";

import InstanceView from './Instance'
import InstancesView from './Instances'
import DetailView from './Detail'

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
		} = this.props;

	}

	componentDidMount() {

		const {
		} = this.props;

	}

	getDataURL(api, namespace, typename, type, schema, instance, instancefield) {
		var dataurl = "http://" + api.api.host + ":" + api.api.port + "/api/v2.0/" + namespace + "/" + typename + "/" + instance["_id"] + "/" + instancefield;
		return dataurl;
	}

	getProperties(namespace, typename, type, schema, instance) {

		var properties = [];

		var propertyname = "_id";
		if( instance && instance[propertyname] ) {
			properties.push({
				"name": propertyname, 
				"value": <Link to={this.makeInstanceLink(namespace, instance["_label"], instance["_id"])} style={{width: 50, borderRadius: '50%'}}>{instance["_id"]}</Link>
			});
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

	makeInstancesView(
		title, 
		description, 
		namespace, 
		typename, 
		type, 
		schema, 
		dataurl, 
		columns, 
		actions,  
		editable, 
		showdeps
	) {

		const {
			api, 
		} = this.props;

		if( !columns ) {
			columns = []
		}

		return <InstancesView 
			title={title} 
			description={description} 
			api={api} 
			namespace={namespace} 
			typename={typename} 
			type={type} 
			schema={schema} 
			dataurl={dataurl} 
			columns={columns} 
			actions={actions} 
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

		const {
			api, 
		} = this.props;

		return <InstanceView 
			title={title} 
			description={description} 
			api={api} 
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
			title, 
            description, 
			typename, 
			type, 
			instance, 
			schema, 
			showdeps
		} = this.props;

		const { classes } = this.props;

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
				{ showdeps && instance && dependencies && dependencies.map(function(item) {
					if(item && item.cardinality == "multiple") {
						var deptypename = schema["properties"][item.name]["items"]["$ref"].replace("#/definitions/", "");
						var deptype = schema["definitions"][deptypename];
						var depschema = schema["definitions"][deptypename];
						depschema["definitions"] = schema["definitions"];
						return _this.makeInstancesView(
							item && item["name"], 
							item && item.type + " " + "(" + item.cardinality + ")",  
							namespace, 
							deptypename, 
							deptype, 
							depschema, 
							_this.getDataURL(
								api, 
								namespace, 
								typename, // deptypename, 
								type, // deptype, 
								schema, // depschema, 
								instance, // item && item.value, 
								item && item["name"]
							), 
							false
						);
					} else if(item && item.value) {
						var deptypename = schema["properties"][item.name]["$ref"].replace("#/definitions/", "");
						var deptype = schema["definitions"][deptypename];
						var depschema = schema["definitions"][deptypename];
						depschema["definitions"] = schema["definitions"];
						return _this.makeInstanceView(
							item && item["name"], 
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
			</>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {
	}
}

function mapStateToProps(state, ownProps) {

	const {
		title, 
		description, 
		typename, 
		type, 
		schema, 
		instanceid, 
		instance, 
	} = ownProps;	

	const {
	} = state;

	return {
		title: title, 
        description: description, 
		typename: typename, 
		type: type, 
		instanceid: instanceid, 
		instance: instance, 
		schema: schema
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Instance));
