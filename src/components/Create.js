
// 
// Copyright (c) 2020, 2021, 2022, 2023, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';

import { connect } from 'react-redux';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
// import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Form from '@rjsf/material-ui';

import validator from '@rjsf/validator-ajv6';
// import validator from '@rjsf/validator-ajv8';

import { 
	loadEntityIntoState, 
	loadEntitiesIntoState
} from '../actions/Entity'

import { 
	getEntityFromState, 
	getEntitiesFromState 
} from '../stores/Entity'

const styles = createStyles({
});

function handleClick(event) {
	// event.preventDefault();
}

export const BackNavButton = () => {
    // let history = useHistory();
    return (
        <>
			<Button
				startIcon={<ArrowBackIcon />} 
				// onClick={() => history.goBack()}
			>
				Back
			</Button>
        </>
    );
};

export const ForwardNavButton = () => {
    // let history = useHistory();
    return (
		<>
			<Button
				endIcon={<ArrowForwardIcon />} 
				// onClick={() => history.goForward()}
			>
					Forward
			</Button>
        </>
    );
};

export const CancelButton = () => {
    // let history = useHistory();
    return (
        <>
			<Button
				// onClick={() => history.goBack()}
			>
				Cancel
			</Button>
        </>
    );
};

class CreateInstanceDialog extends Component {

	constructor(props) {
		super(props);
		this.state = this.calcState({
			open: props.open,
			
		});
		this.openDialog = this.openDialog.bind(this);
		this.onCloseDialog = this.onCloseDialog.bind(this);
		this.onCreate = this.onCreate.bind(this);
	}

	state = {
		open: false
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
			type, 
			schema
		} = this.props;

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

	onCreate() {
	}

	openDialog() {
		this.setState(this.calcState({
			open: true
		}));
	}

	closeDialog() {
		this.onCloseDialog();
	}

	onCloseDialog() {
		this.setState(this.calcState({
			open: false
		}));
		if( this.props.onCloseDialog ) {
			this.props.onCloseDialog();
		}
	}

	render() {

		var _this = this;

		const {
			api, 
			namespace, 
			typename, 
			type, 
			schema
		} = this.props;

		var open = true; // this.state.open;

		var data = {};
		var form = {};
		var formnames = [];

		var nschema = schema["entity"]; // schema;

		var uiSchema = {
			id: {"ui:widget": "hidden"}, 
			uuid: {"ui:widget": "hidden"}, 
			created: {"ui:widget": "hidden"}, 
			modified: {"ui:widget": "hidden"}
		};

		nschema = {};
		uiSchema = {};

		const renderForm = function() {
			if( nschema ) {
				return <Form 
					schema={nschema} 
					validator={validator}
					uiSchema={uiSchema}
					formData={data} 
					onChange={e => {}} 
					onSubmit={e => {}} 
					onError={e => {}} 
					children={<br/>} />
			}
		}

		/*
		 * You can set a dialog maximum width by using the maxWidth enumerable in combination with the fullWidth 
		 * boolean. When the fullWidth property is true, the dialog will adapt based on the maxWidth value.
		 */
		var fullWidth = 'md';
		var maxWidth = 'md';

		return (
			<>
			<Container>
			<Dialog 
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				open={open} 
				onClose={this.onCloseDialog} 
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">
					<BackNavButton>
					</BackNavButton>
					Create new {typename}.
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Create new {typename}.
					</DialogContentText>
					{renderForm()}
				</DialogContent>
				<DialogActions>
					<CancelButton>
					</CancelButton>
					<Button onClick={this.onCreate} color="primary">
						Create
					</Button>
				</DialogActions>
			</Dialog>
			</Container>
			</>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {

		loadSchema: (api, namespace, typename) => dispatch(loadEntityIntoState(api, namespace, "schema", typename)), 

		loadInstances: (api, namespace, typename) => dispatch(loadEntitiesIntoState(api, namespace, typename)), 

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

	const schema = getEntityFromState(state, api, namespace, "schema", typename);

	return {
		api, 
		namespace: namespace, 
		typename: typename, 
		schema: schema
	}

};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withStyles(styles)(CreateInstanceDialog));
