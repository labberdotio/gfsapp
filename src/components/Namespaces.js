
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


import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
import Sidebar from './Sidebar';
import Header from './Header';
// import List from './List';

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
			drawerOpen: false
		}

		var _this = this;

	}

	state = {
		drawerOpen: false
	};

	// componentWillUpdate(nextProps, nextState) {
	// }

	componentDidUpdate(prevProps, prevState) {

		const {
			api, 
			namespace
		} = this.props;

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
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

		if( (!this.props.namespaces["loading"]) && 
			(!this.props.namespaces["loaded"]) && 
			(!this.props.namespaces["failed"]) ) {
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

		var _this = this;

		const {
			api, 
			namespace, 
			namespaces
		} = this.props;

		const drawerOpen = this.state.drawerOpen;

		function setDrawerOpen(setting) {
			_this.setState({
				drawerOpen: setting
			});
		}

		function toggleDrawerOpen() {
			_this.setState({
				drawerOpen: !_this.state.drawerOpen
			});
		}

		var backdropOpen = false;

		var selected = undefined;

		console.log("?????");
		console.log(namespaces);
		if(namespaces && namespaces['namespaces'] ) {
			console.log(namespaces['namespaces']['data']);
		} 

		return (
			<>
			<Layout.Root
				drawerOpen={drawerOpen} 
				sx={[
					drawerOpen && {
						height: '100vh',
						overflow: 'hidden',
					},
				]}
				>
				<Layout.Header
					drawerOpen={drawerOpen} 
					toggleDrawerOpen={toggleDrawerOpen} 
				>
					<Header 
						drawerOpen={drawerOpen} 
						toggleDrawerOpen={toggleDrawerOpen} 
						api={api} 
						namespace={namespace} 
					>
						<IconButton 
							// color="inherit" 
							// aria-label="open drawer" 
							// onClick={toggleDrawerOpen} 
							onClick={() => toggleDrawerOpen()} 
							// edge="start" 
							// variant="highlight" 
							color="neutral" 
							variant="plain" 
							sx={[
								{
									marginRight: 5, 
									color: 'rgb(97, 97, 97)'
								},
								// open && { display: 'none' }
							]}
						>
							<MenuIcon 
								// color="neutral" 
								// variant="plain" 
								sx={{
									color: 'rgb(97, 97, 97)'
								}}
							/>
						</IconButton>
						<Button 
							component="a" 
							href="/" 
							size="sm" 
							color="neutral" 
							variant="plain" 
							sx={{
								alignSelf: 'center', 
								fontSize: '1.25rem', 
								color: 'rgb(97, 97, 97)'
							}}
						>
							{namespace}
						</Button>
					</Header>
				</Layout.Header>
				<Layout.Sidebar>
					<Sidebar 
						namespace={namespace} 
					/>
				</Layout.Sidebar>
				<Layout.List>
					{ namespaces && namespaces['namespaces'] && namespaces['namespaces']['data'] &&
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
							{namespaces['namespaces']['data'].map(function(namespace, idx) {
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
				</Layout.List>
				<Layout.Breadcrumb>
					<Breadcrumbs aria-label="breadcrumb">
						<Typography color="textPrimary">Namespaces</Typography>
					</Breadcrumbs>
				</Layout.Breadcrumb>
				<Layout.Main>
					
				</Layout.Main>
				<Layout.Side>
					
				</Layout.Side>
			</Layout.Root>
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

	const namespaces = getNamespacesFromState(state, api);

	return {
		api, 
		namespace: namespace, 
		namespaces: namespaces
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

// export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Namespaces))));
export default withNavigation(withParams(connect(mapStateToProps, mapDispatchToProps)(Namespaces)));
