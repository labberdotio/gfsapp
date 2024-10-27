
// 
// Copyright (c) 2022, 2023, 2024, John Grundback
// All rights reserved.
// 

import React, {Component} from 'react';
import PropNamespaces from 'prop-types'
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

import Button from '@mui/joy/Button';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import ListDivider from '@mui/joy/ListDivider';

// 
// 
// import Typography from '@mui/joy/Typography';

import { 
	loadNamespacesIntoState 
} from '../actions/Namespace'

import { 
	invalidateEntitiesInState
} from '../actions/Entity'

import { 
	getNamespacesFromState 
} from '../stores/Namespace'

import Layout from './Layout';

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

class Namespaces extends Component {

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
			namespace
		} = this.props;

		if( (!this.props.nsloading) && (!this.props.nsloaded) && (!this.props.nsfailed) ) {
			if( api ) {
				this.props.loadNamespaces(api);
			}
		}

	}

	componentDidMount() {

		const {
			api, 
			namespace
		} = this.props;

		if( (!this.props.nsloading) && (!this.props.nsloaded) && (!this.props.nsfailed) ) {
			if( api ) {
				this.props.loadNamespaces(api);
			}
		}

	}

	onContextCommand(type, command, selected, allselected) {

	};

	getTreeData(api, namespace, graph) {

		var treestruc = {
			
		};

		return treestruc;
	}

	updateSearch(event) {
	}

	render() {

		const {
			nsloading, 
			namespaces 
		} = this.props;

		if( !this.props.nsloading ) {
			// if( (this.props.nsloaded) && (this.props.nsfailed) ) {
			if( this.props.nsfailed ) {
				// 
			} else if( this.props.nsloaded ) {
				// 
			}
		} else {
			// 
		}

		var backdropOpen = false;
		if( nsloading ) {
			backdropOpen = true;
		}

		var selected = undefined;

		return (
			<>
			<Layout.Breadcrumb>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="textPrimary">Namespaces</Typography>
				</Breadcrumbs>
			</Layout.Breadcrumb>
			{namespaces && namespaces.data &&
			<Sheet
				sx={{
					borderRight: '1px solid',
					borderColor: 'divider',
					height: { sm: 'calc(100dvh - var(--Header-height))', md: '100dvh' },
					overflowY: 'auto',
				}}
			>
				<List
					sx={{
						py: 0,
						'--ListItem-paddingY': '0.75rem',
						'--ListItem-paddingX': '1rem',
					}}
				>
					{namespaces.data.map(function(namespace, idx) {
						return (
							<>
							<ListItem>
							<ListItemButton
								// onClick={() => {
								// }}
								component={Link} 
								to={"/namespaces/" + namespace} 
								selected={selected} 
								color="neutral" 
								sx={{ flexDirection: 'column', alignItems: 'initial', gap: 1 }}
							>
								<Stack direction="row" spacing={1.5}>
								<Box sx={{ flex: 1 }}>
									{/* <Typography level="title-sm">{namespace}</Typography> */}
									{/* <Typography level="body-sm">{namespace}</Typography> */}
								</Box>
								{/* <Box sx={{ lineHeight: 1.5, textAlign: 'right' }}>
									<Typography
										level="body-xs"
										noWrap
										sx={{ display: { xs: 'none', md: 'block' } }}
									>
									</Typography>
								</Box> */}
								</Stack>
								<Typography
									level="body-sm"
									sx={{
										display: '-webkit-box',
										WebkitLineClamp: '2',
										WebkitBoxOrient: 'vertical',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{namespace}
								</Typography>
							</ListItemButton>
							</ListItem>
							<ListDivider sx={{ margin: 0 }} />
							</>
						);
					})}
				</List>
			</Sheet>
			}
			</>
		);
	}

}

Namespaces.propNamespaces = {
	dispatch: PropNamespaces.func.isRequired
}

function mapDispatchToProps(dispatch) {
	return {

		loadNamespaces: (api) => dispatch(loadNamespacesIntoState(api)),

		invalidateEntities: (api, resource) => dispatch(invalidateEntitiesInState(api, resource)),

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

	const {
		loading: nsloading, 
		loaded: nsloaded, 
		failed: nsfailed, 
		timestamp: nstimestamp, 
		namespaces: nsnamespaces
	} = getNamespacesFromState(state, api);

	return {
		api, 
		namespace: namespace, 
		nsloading: nsloading, 
		nsloaded: nsloaded, 
		nsfailed: nsfailed, 
		nstimestamp: nstimestamp, 	
		namespaces: nsnamespaces	
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

// export default withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Namespaces)));
export default withParams(connect(mapStateToProps, mapDispatchToProps)(Namespaces));
