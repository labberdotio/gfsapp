
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

import AddIcon from '@material-ui/icons/Add';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import InstancesView from './Instances'

import { 
	loadEntityIntoState, 
	loadEntitiesIntoState
} from '../actions/Entity'

import { 
	getEntityFromState, 
	getEntitiesFromState 
} from '../stores/Entity'

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

	speedDial: {
		position: 'fixed',
		right: 10,
		bottom: 10
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

class RootInstances extends Component {

	constructor(props) {
		super(props);
		this.state = {
			createInstanceDialogOpen: false
		}

		var _this = this;

		this.createInstanceDialogElement = React.createRef();

		this.onCloseCreateInstanceDialog = this.onCloseCreateInstanceDialog.bind(this);

		this.createInstance = this.createInstance.bind(this);
		this.deleteInstance = this.deleteInstance.bind(this);

	}

	state = {
		createInstanceDialogOpen: false
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace, 
			typename, 
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

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
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
			this.props.loadSchema(api, namespace, typename);
			// }
		}

	}

	getDataURL(namespace, typename, type, schema) {
		// return "http://192.168.1.112:5000/api/v2.0/archives/Files";
		var dataurl = "http://192.168.1.112:5000/api/v2.0/" + namespace + "/" + typename;
		return dataurl;
	}

	createInstance(type, data) {
		const {api} = this.props;
		this.props.createInstance(api, type, data);
		this.createInstanceDialogElement.current.closeDialog();
	}

	deleteInstance() {
	}

	onCloseCreateInstanceDialog() {
		this.setState({
			createInstanceDialogOpen: false
		});
	}

	getListCols(namespace, typename, type, schema) {

		var cols = [];
		cols.push({
			title: "_name",
			field: "_name",
			// render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</a>
			render: rowData => <Link to={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</Link>
		});
		cols.push({
			title: "_id",
			field: "_id",
			editable: 'never',
			// render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_id"]}</a>
			render: rowData => <Link to={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_id"]}</Link>
		});
		// cols.push({
		// 	title: "link",
		// 	field: "link",
		// 	render: rowData => <a href={this.makeInstanceLink(namespace, rowData["_label"], rowData["_id"])} style={{width: 50, borderRadius: '50%'}}>{rowData["_name"]}</a>
		// });
		cols.push({
			title: "_uuid",
			field: "_uuid"
		});
		cols.push({
			title: "_created",
			field: "_created",
			type: 'numeric'
		});
		cols.push({
			title: "_modified",
			field: "_modified",
			type: 'numeric'
		});

		if( type ) {
			if( type["properties"] ) {
				for( var property in type["properties"] ) {
					if( !["_id", "_uuid", "_name", "_created", "_modified"].includes(property) ) {
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

	makeCreateInstanceLink(namespace, type) {
		return "/namespaces/" + namespace + "/create/" + type;
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

	// makeInstanceView(
	// 	title, 
	// 	description, 
	// 	namespace, 
	// 	typename, 
	// 	type, 
	// 	schema, 
	// 	instanceid, 
	// 	instance, 
	// 	showdeps
	// ) {
	// }

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			typename, 
			type, 
			schema
		} = this.props;

		const { classes } = this.props;

		var backdropOpen = false;

		var hidden = false;
		var open = true;
		var direction = "up";

		// var dataurl = this.getDataURL(
		// 	namespace, 
		// 	typename, 
		// 	type, 
		// 	schema
		// );

		var actions = [
			{
				name: "Create new " + typename, 
				link: this.makeCreateInstanceLink(namespace, typename), 
				icon: <AddIcon />, 
			},
		];

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
				<Typography color="textPrimary">{typename}</Typography>
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
					xs={12} 
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
						editable={true} 
						showdeps={true} />  */}
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
							true, 
							true
						)}
				</Grid>
			</Grid>
			<SpeedDial
				ariaLabel="GraphActions"
				className={classes.speedDial}
				hidden={hidden}
				icon={<SpeedDialIcon/>}
				onClose={this.onCloseDial}
				onOpen={this.onOpenDial}
				open={open}
				direction={direction}>
				{actions.map(action => (
					<SpeedDialAction
						key={action.name}
						icon=<Link to={action.link}>{action.icon}</Link>
						tooltipTitle={action.name}
						onClick={this.onCloseDial}/>
				))}
			</SpeedDial>
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
		typename
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
		type: type, 
		schema: schema
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootInstances));
