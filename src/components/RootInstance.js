
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

		var instance = undefined;

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
					xs={4} 
					spacing={0} 
				>
					<InstancesView 
						title={typename} 
						description={typename} 
						namespace={namespace} 
						typename={typename} 
						type={type["entity"]} 
						schema={schema["entity"]} 
						editable={false} 
						showdeps={true} />
				</Grid>

				<Grid 
					className="rightGrid" 
					container 
					item 
					xs={8} 
					spacing={0} 
				>
					<InstanceView 
						title={ instance && ( instance["_name"] + " (" + instance["_id"] + ")") } 
						description={typename} 
						namespace={namespace} 
						typename={typename} 
						type={type["entity"]} 
						schema={schema["entity"]} 
						instanceid={instanceid} 
						instance={instance} 
						showdeps={true} />
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
