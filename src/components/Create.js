
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

// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';

import Form from "@rjsf/core";

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
			// , 
			// , 
			// , 
			// , 
			schema, 
			ainstances
		} = this.props;

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			this.props.loadSchema(api, typename);
			// }
		}

		/*
		 * Load dependencies
		 */
		if( schema && schema["entity"] && schema["entity"]["properties"] ) {
			for( var propertyname in schema["entity"]["properties"] ) {
				var property = schema["entity"]["properties"][propertyname];
				if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
					// if( property && property["type"] ) {
					if( property ) {
						if( property["type"] == "string" ) {
							// 
						} else if( property["$ref"] ) {
							// property["$ref"].replace("#/definitions/", "")
							const dtypename = property["$ref"].replace("#/definitions/", "");
							if( (!this.props.ainstances[dtypename]["loading"]) && 
								(!this.props.ainstances[dtypename]["loaded"]) && 
								(!this.props.ainstances[dtypename]["failed"]) ) {
								// if( dtypename ) {
								this.props.loadInstances(api, dtypename);
								// }
							}
						} else if( (property["type"] == "array") && 
								   (property["items"]) ) {
							// property["items"]["$ref"].replace("#/definitions/", "")
							const dtypename = property["items"]["$ref"].replace("#/definitions/", "");
							if( (!this.props.ainstances[dtypename]["loading"]) && 
								(!this.props.ainstances[dtypename]["loaded"]) && 
								(!this.props.ainstances[dtypename]["failed"]) ) {
								// if( dtypename ) {
								this.props.loadInstances(api, dtypename);
								// }
							}
						}
					}
				}
			}
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace, 
			typename, 
			type, 
			// , 
			// , 
			// , 
			// , 
			schema, 
			ainstances
		} = this.props;

		if( (!this.props.schema["loading"]) && 
			(!this.props.schema["loaded"]) && 
			(!this.props.schema["failed"]) ) {
			// if( typename ) {
			this.props.loadSchema(api, typename);
			// }
		}

		/*
		 * Load dependencies
		 */
		if( schema && schema["entity"] && schema["entity"]["properties"] ) {
			for( var propertyname in schema["entity"]["properties"] ) {
				var property = schema["entity"]["properties"][propertyname];
				if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
					// if( property && property["type"] ) {
					if( property ) {
						if( property["type"] == "string" ) {
							// 
						} else if( property["$ref"] ) {
							// property["$ref"].replace("#/definitions/", "")
							const dtypename = property["$ref"].replace("#/definitions/", "");
							if( (!this.props.ainstances[dtypename]["loading"]) && 
								(!this.props.ainstances[dtypename]["loaded"]) && 
								(!this.props.ainstances[dtypename]["failed"]) ) {
								// if( dtypename ) {
								this.props.loadInstances(api, dtypename);
								// }
							}
						} else if( (property["type"] == "array") && 
								   (property["items"]) ) {
							// property["items"]["$ref"].replace("#/definitions/", "")
							const dtypename = property["items"]["$ref"].replace("#/definitions/", "");
							if( (!this.props.ainstances[dtypename]["loading"]) && 
								(!this.props.ainstances[dtypename]["loaded"]) && 
								(!this.props.ainstances[dtypename]["failed"]) ) {
								// if( dtypename ) {
								this.props.loadInstances(api, dtypename);
								// }
							}
						}
					}
				}
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
			// , 
			// , 
			// , 
			// , 
			schema, 
			ainstances
		} = this.props;

		var open = true; // this.state.open;

		var data = {};
		var form = {};
		var formnames = [];

		const renderForm = function() {
			if( schema && schema["entity"] ) {
				return <Form 
					schema={schema["entity"]} 
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
			<Dialog 
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				open={open} 
				onClose={this.onCloseDialog} 
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">
					Create new.
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Create new.
					</DialogContentText>
					{/* <InputLabel id="label">Type</InputLabel> */}
					{/* <Select 
						labelId="label" 
						id="type" 
						value={form} 
						onChange={(event) => _this.selectForm(event.target.value)} >
						{formnames.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
					</Select> */}
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

		loadSchema: (api, typename) => dispatch(loadEntityIntoState(api, "schema", typename)), 

		loadInstances: (api, typename) => dispatch(loadEntitiesIntoState(api, typename)), 

	}
}


function mapStateToProps(state, ownProps) {

	const { match } = ownProps;

	const typename = match["params"]["typename"];
	const type = ownProps["type"];

	const {
		api
	} = state;

	// const {
	// 	loading: , 
	// 	loaded: , 
	// 	failed: , 
	// 	timestamp: , 
	// 	entity: schema
	// } = getEntityFromState(state, api, "schema", typename);
	const schema = getEntityFromState(state, api, "schema", typename);

	// console.log( " SCHEMA >> " );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log(  );
	// console.log( schema );
	// console.log( " << SCHEMA " );

	/*
	 * Load dependencies
	 */
	var ainstances = {};
	// ainstances[typename] = instances;
	if( schema && schema["entity"] && schema["entity"]["properties"] ) {
		for( var propertyname in schema["entity"]["properties"] ) {
			var property = schema["entity"]["properties"][propertyname];
			if( !["id", "uuid", "name", "created", "modified"].includes(propertyname) ) {
				// if( property && property["type"] ) {
				if( property ) {
					if( property["type"] == "string" ) {
						// 
					} else if( property["$ref"] ) {
						// property["$ref"].replace("#/definitions/", "")
						const dtypename = property["$ref"].replace("#/definitions/", "");
						const dinstances = getEntitiesFromState(state, api, dtypename);
						ainstances[dtypename] = dinstances;
					} else if( (property["type"] == "array") && 
							   (property["items"]) ) {
						// property["items"]["$ref"].replace("#/definitions/", "")
						const dtypename = property["items"]["$ref"].replace("#/definitions/", "");
						const dinstances = getEntitiesFromState(state, api, dtypename);
						ainstances[dtypename] = dinstances;
					}
				}
			}
		}
	}

	return {
		api, 
		namespace: api.namespace, 
		typename: typename, 
		type: type, 
		// : , 
		// : , 
		// : , 
		// : , 
		schema: schema, 
		ainstances: ainstances
	}

};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withStyles(styles)(CreateInstanceDialog));
