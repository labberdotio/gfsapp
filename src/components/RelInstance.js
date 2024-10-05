
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux'

import {
	Routes, 
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch, 
	useParams, 
	useNavigate
} from "react-router-dom";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

export const BackNavButton = () => {
    let navigate = useNavigate();
    return (
        <>
			<Button
				startIcon={<ArrowBackIcon />} 
				onClick={() => navigate(-1)}
			>
				Back
			</Button>
        </>
    );
};

export const ForwardNavButton = () => {
    let navigate = useNavigate();
    return (
		<>
			<Button
				endIcon={<ArrowForwardIcon />} 
				onClick={() => navigate(+1)}
			>
				Forward
			</Button>
        </>
    );
};

class RelInstance extends Component {

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
			api, 
			namespace, 
			typename, 
			instanceid, 
			relname, 
			type, 
			schema, 
			reltype, 
			relschema, 
			instance, 
			relinstance
		} = this.props;

		if( (!this.props.instance["loading"]) && 
			(!this.props.instance["loaded"]) && 
			(!this.props.instance["failed"]) ) {
			if( api && namespace && typename ) {
				this.props.loadInstance(api, namespace, typename, instanceid);
			}
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

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			relname, 
			type, 
			schema, 
			reltype, 
			relschema, 
			instance, 
			relinstance
		} = this.props;

		if( (!this.props.instance["loading"]) && 
			(!this.props.instance["loaded"]) && 
			(!this.props.instance["failed"]) ) {
			if( api && namespace && typename ) {
				this.props.loadInstance(api, namespace, typename, instanceid);
			}
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

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			typename, 
			instanceid, 
			relname, 
			type, 
			schema, 
			reltype, 
			relschema, 
			instance, 
			relinstance
		} = this.props;

		var backdropOpen = false;

		return (
			<>
			<Container 
				// className={classes.mainContainer} 
				className="mainContainer" 
			>
			{/* <Breadcrumbs aria-label="breadcrumb">
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
				<Link color="inherit" to={"/namespaces/" + namespace + "/" + typename + "/" + instanceid}>
					{ instance && instance["entity"] && instance["entity"]["_name"] }
				</Link>
				<Typography color="textPrimary">{ relname }</Typography>
				<ForwardNavButton></ForwardNavButton>
			</Breadcrumbs> */}
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
					xs={12} 
					spacing={0} 
				>
					{ relname && reltype && relschema && relinstance && 
						<InstanceView 
						title={ relname } 
						description={reltype} 
						namespace={namespace} 
						typename={reltype} 
						type={relschema} 
						schema={relschema} 
						instanceid={instance.id} 
						instance={instance} 
						/>
					}
					{ relname && reltype && relschema && 
					<InstancesView 
						title={relname} 
						description={reltype} 
						namespace={namespace} 
						typename={reltype} 
						type={relschema} 
						schema={relschema} 
						/>
					}
				</Grid>
			</Grid>
			</Container>
			</>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {

		loadInstance: (api, namespace, typename, instanceid) => dispatch(loadEntityIntoState(api, namespace, typename, instanceid)), 

		loadSchema: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "schema", typename))

	}
}

function mapStateToProps(state, ownProps) {

	const {
		api, 
		// namespace
	} = state;

	var namespace = undefined;
	if( ownProps && ownProps.params ) {
		namespace = ownProps.params.namespace;
	}

	var typename = undefined;
	if( ownProps && ownProps.params ) {
		typename = ownProps.params.typename;
	}

	var instanceid = undefined;
	if( ownProps && ownProps.params ) {
		instanceid = ownProps.params.instanceid;
	}

	var relname = undefined;
	if( ownProps && ownProps.params ) {
		relname = ownProps.params.relname;
	}

	const instance = getEntityFromState(state, api, namespace, typename, instanceid);

	const schema = getEntityFromState(state, api, namespace, "schema", typename);

	var reltype = undefined;
	var relschema = undefined;

	var relinstance = undefined;

	return {
		api, 
		namespace: namespace, 
		typename: typename, 
		instanceid: instanceid, 
		relname: relname, 
		schema: schema, 
		reltype: reltype, 
		relschema: relschema, 
		instance: instance, 
		relinstance: relinstance
	}

}

/*
 * https://github.com/remix-run/react-router/issues/8146
 */

function withNavigation(Component) {
	return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

// export default withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RelInstance)));
export default withParams(connect(mapStateToProps, mapDispatchToProps)(RelInstance));
