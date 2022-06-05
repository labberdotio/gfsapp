
// 
// Copyright (c) 2020, 2021, 2022, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import { connect } from 'react-redux';
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Form from "@rjsf/core";

import { 
	loadEntityIntoState
} from '../actions/Entity'

import { 
	getEntityFromState 
} from '../stores/Entity'

const styles = createStyles({
});

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
			ssloading, 
			ssloaded, 
			ssfailed, 
			stimestamp, 
			schema
		} = this.props;

		if( (!this.props.ssloading) && (!this.props.ssloaded) && (!this.props.ssfailed) ) {
			if( typename ) {
				this.props.loadSchema(api, typename);
			}
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			type, 
			ssloading, 
			ssloaded, 
			ssfailed, 
			stimestamp, 
			schema
		} = this.props;

		if( (!this.props.ssloading) && (!this.props.ssloaded) && (!this.props.ssfailed) ) {
			if( typename ) {
				this.props.loadSchema(api, typename);
			}
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
			ssloading, 
			ssloaded, 
			ssfailed, 
			stimestamp, 
			schema
		} = this.props;

		var open = true; // this.state.open;

		var data = {};
		var form = {};
		var formnames = [];

		const renderForm = function() {
			if(schema) {
				return <Form 
					schema={schema} 
					formData={data} 
					onChange={e => {}} 
					onSubmit={e => {}} 
					onError={e => {}} 
					children={<br/>} />
			}
		}

		return (
			<>
			<Dialog open={open} onClose={this.onCloseDialog} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">
					Create new.
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Create new.
					</DialogContentText>
					<InputLabel id="label">Type</InputLabel>
					<Select 
						labelId="label" 
						id="type" 
						value={form} 
						onChange={(event) => _this.selectForm(event.target.value)} >
						{formnames.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
					</Select>
					{renderForm()}
				</DialogContent>
				<DialogActions>
					<Button onClick={this.onCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={this.onCreate} color="primary">
						Create
					</Button>
				</DialogActions>
			</Dialog>
			</>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {

		loadSchema: (api, typename) => dispatch(loadEntityIntoState(api, "schema", typename))

	}
}


function mapStateToProps(state, ownProps) {

	const { match } = ownProps;

	const typename = match["params"]["typename"];
	const type = ownProps["type"];

	const {
		api
	} = state;

	const {
		loading: ssloading, 
		loaded: ssloaded, 
		failed: ssfailed, 
		timestamp: sstimestamp, 
		entity: schema
	} = getEntityFromState(state, api, "schema", typename);

	console.log( " SCHEMA >> " );
	console.log( ssloading );
	console.log( ssloaded );
	console.log( ssfailed );
	console.log( sstimestamp );
	console.log( schema );
	console.log( " << SCHEMA " );

	// var typeschema = undefined;
	// if( typename && schema ) {
	// 	if( schema["definitions"] && schema["definitions"][typename] ) {
	// 		typeschema = schema["definitions"][typename];
	// 	}
	// }

	return {
		api, 
		namespace: api.namespace, 
		typename: typename, 
		type: type, 
		ssloading: ssloading, 
		ssloaded: ssloaded, 
		ssfailed: ssfailed, 
		sstimestamp: sstimestamp, 
		schema: schema
	}

};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withStyles(styles)(CreateInstanceDialog));
