
// 
// Copyright (c) 2020, 2021, 2022, 2023, 2024, John Grundback
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

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { 
	loadEntityIntoState, 
	loadEntitiesIntoState
} from '../actions/Entity'

import { 
	getEntityFromState, 
	getEntitiesFromState 
} from '../stores/Entity'

import Layout from './Layout';
// import List from './List';
import InstancesView from './Instances'
import InstanceView from './Instance'

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
			account, 
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
				this.props.loadInstance(api, account, namespace, typename, instanceid);
			}
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadSchema(api, account, namespace, typename);
			}
			// }
		}

	}

	componentDidMount() {

		const {
			api, 
			account, 
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
				this.props.loadInstance(api, account, namespace, typename, instanceid);
			}
		}

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			if( api && namespace && typename ) {
				this.props.loadSchema(api, account, namespace, typename);
			}
			// }
		}

	}

	makeInstanceLink(account, namespace, type, id) {
		return "/account/" + account + "/namespaces/" + namespace + "/" + type + "/" + id;
	}

	makeRelInstanceLink(account, namespace, type, id, relname) {
		return "/account/" + account + "/namespaces/" + namespace + "/" + type + "/" + id + "/" + relname;
	}

	makeInstance(instance) {
		return instance;
	}

	render() {

		var _this = this;

		const {
			api, 
			account, 
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
			{/* <Layout.List>
				<List
					account={account} 
					namespace={namespace} 
					graph={graph} 
					selected={false}
				/>
			</Layout.List> */}
			<Layout.Breadcrumb>
				<Breadcrumbs aria-label="breadcrumb">
					<BackNavButton></BackNavButton>
					<Link color="inherit" to={"/account/" + account + "/namespaces"}>
						Namespaces
					</Link>
					<Link color="inherit" to={"/account/" + account + "/namespaces/" + namespace}>
						{namespace}
					</Link>
					<Link color="inherit" to={"/account/" + account + "/namespaces/" + namespace + "/" + typename}>
						{typename}
					</Link>
					<Link color="inherit" to={"/account/" + account + "/namespaces/" + namespace + "/" + typename + "/" + instanceid}>
						{ instance && instance["entity"] && instance["entity"]["_name"] }
					</Link>
					<Typography color="textPrimary">{ relname }</Typography>
					<ForwardNavButton></ForwardNavButton>
				</Breadcrumbs>
			</Layout.Breadcrumb>
			<Layout.Main>
			{ relname && reltype && relschema && relinstance && 
				<InstanceView 
					title={ relname } 
					description={reltype} 
					account={account} 
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
					account={account} 
					namespace={namespace} 
					typename={reltype} 
					type={relschema} 
					schema={relschema} 
				/>
			}
			</Layout.Main>
			</>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {

		loadInstance: (api, account, namespace, typename, instanceid) => dispatch(loadEntityIntoState(api, account, namespace, typename, instanceid)), 

		loadSchema: (api, account, namespace, typename) => dispatch(loadEntityIntoState(api, account, namespace, "schema", typename))

	}
}

function mapStateToProps(state, ownProps) {

	const {
		api, 
		// account
		// namespace
	} = state;

	var account = undefined;
	if( ownProps && ownProps.params ) {
		account = ownProps.params.account;
	}

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

	const instance = getEntityFromState(state, api, account, namespace, typename, instanceid);

	const schema = getEntityFromState(state, api, account, namespace, "schema", typename);

	var reltype = undefined;
	var relschema = undefined;

	var relinstance = undefined;

	return {
		api, 
		account: account, 
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
